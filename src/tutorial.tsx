import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import type { TranslationKeys } from "./i18n";
import { renderEffectText } from "./App.tsx";

// ─── Types ────────────────────────────────────────────────────────────────────

export type TutorialZone =
  | "deck"
  | "discard"
  | "playArea"
  | "permanentZone"
  | "blocked"
  | "actionButtons"
  | "resourcePool"
  | "campaign"
  | null;

export interface TutorialStep {
  zone: TutorialZone;
  title: string;
  text: string;
  /** Where the bubble should appear relative to the highlighted zone */
  position?: "top" | "bottom" | "left" | "right" | "auto";
}

interface SpotlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

// ─── Default tutorial steps (French – swap strings via props if needed) ───────

export const DEFAULT_TUTORIAL_STEPS: TutorialStep[] = [
  {
    zone: null,
    title: 'tutorialWelcomeTitle',
    text: 'tutorialWelcomeText',
    position: "auto",
  },
  {
    zone: null,
    title: 'tutorialGameTitle',
    text: 'tutorialGameText',
    position: "auto",
  },
  {
    zone: "deck",
    title: 'tutorialDeckTitle',
    text: 'tutorialDeckText',
    position: "auto",
  },
  {
    zone: "discard",
    title: 'tutorialDiscardTitle',
    text: 'tutorialDiscardText',
    position: "auto",
  },
  {
    zone: "playArea",
    title: 'tutorialPlayAreaTitle',
    text: 'tutorialPlayAreaText',
    position: "auto",
  },
  {
    zone: "permanentZone",
    title: 'tutorialPermanentTitle',
    text: 'tutorialPermanentText',
    position: "auto",
  },
  {
    zone: "blocked",
    title: 'tutorialBlockedTitle',
    text: 'tutorialBlockedText',
    position: "auto",
  },
  {
    zone: "actionButtons",
    title: 'tutorialActionButtonsTitle',
    text: 'tutorialActionButtonsText',
    position: "top",
  },
  {
    zone: "playArea",
    title: 'tutorialCardTitle',
    text: 'tutorialCardText',
    position: "auto",
  },
  {
    zone: "playArea",
    title: 'tutorialEffectsTitle',
    text: 'tutorialEffectsText',
    position: "auto",
  },
  {
    zone: "resourcePool",
    title: 'tutorialResourcePoolTitle',
    text: 'tutorialResourcePoolText',
    position: "top",
  },
  {
    zone: null,
    title: 'tutorialReadyTitle',
    text: 'tutorialReadyText',
    position: "auto",
  },
];

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function tutorial(
  zoneRefsMap: React.RefObject<Map<string, HTMLElement>>,
  /** Map from TutorialZone key → translation string used as key in zoneRefsMap */
  zoneKeyMap: Record<NonNullable<TutorialZone>, string>,
  steps: TutorialStep[] = DEFAULT_TUTORIAL_STEPS
) {
  const [isActive, setIsActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [spotlightRect, setSpotlightRect] = useState<SpotlightRect | null>(null);
  const animationFrame = useRef<number>(undefined);

  const currentStep = steps[stepIndex];

  /** Compute and store the bounding rect of the current zone */
  const refreshSpotlight = useCallback(() => {
    if (!isActive) return;
    const zone = currentStep?.zone;
    if (!zone) {
      setSpotlightRect(null);
      return;
    }
    const key = zoneKeyMap[zone];
    const el = zoneRefsMap.current.get(key);
    if (!el) {
      setSpotlightRect(null);
      return;
    }
    const rect = el.getBoundingClientRect();
    setSpotlightRect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
  }, [isActive, currentStep, zoneKeyMap, zoneRefsMap]);

  // Re-measure on scroll / resize
  useEffect(() => {
    if (!isActive) return;
    const handleUpdate = () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      animationFrame.current = requestAnimationFrame(refreshSpotlight);
    };
    refreshSpotlight();
    window.addEventListener("scroll", handleUpdate, true);
    window.addEventListener("resize", handleUpdate);
    return () => {
      window.removeEventListener("scroll", handleUpdate, true);
      window.removeEventListener("resize", handleUpdate);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [isActive, refreshSpotlight]);

  const resolveRef = useRef<(() => void) | null>(null);

  const startTutorial = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      setStepIndex(0);
      setIsActive(true);
    });
  }, []);

  const stop = useCallback(() => {
    setIsActive(false);
    resolveRef.current?.();
    resolveRef.current = null;
  }, []);

  const next = useCallback(() => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
    } else {
      setIsActive(false);
      resolveRef.current?.();
      resolveRef.current = null;
    }
  }, [stepIndex, steps.length]);

  const previous = useCallback(() => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }, [stepIndex]);

  return {
    isActive,
    startTutorial,
    stop,
    currentStep,
    stepIndex,
    totalSteps: steps.length,
    next,
    previous,
    spotlightRect,
  };
}

// ─── Overlay Component ────────────────────────────────────────────────────────

const PADDING = 12;
const BUBBLE_WIDTH = 320;
const BUBBLE_MARGIN = 16;

interface TutorialOverlayProps {
  isActive: boolean;
  currentStep: TutorialStep;
  stepIndex: number;
  totalSteps: number;
  spotlightRect: SpotlightRect | null;
  onNext: () => void;
  onPrevious: () => void;
  onStop: () => void;
  t: (key: TranslationKeys) => string;
}

export function TutorialOverlay({
  isActive,
  currentStep,
  stepIndex,
  totalSteps,
  spotlightRect,
  onNext,
  onPrevious,
  onStop,
  t,
}: TutorialOverlayProps) {
  // ── Measure the bubble's actual rendered height ───────────────────────────
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [bubbleHeight, setBubbleHeight] = useState(200);

  // After each render (new step or resize), read the real height
  useEffect(() => {
    if (bubbleRef.current) {
      setBubbleHeight(bubbleRef.current.offsetHeight);
    }
  });

  if (!isActive) return null;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // ── Spotlight geometry ────────────────────────────────────────────────────
  const cut = spotlightRect
    ? {
        top: Math.max(0, spotlightRect.top - PADDING),
        left: Math.max(0, spotlightRect.left - PADDING),
        width: spotlightRect.width + PADDING * 2,
        height: spotlightRect.height + PADDING * 2,
      }
    : null;

  // ── Bubble positioning ────────────────────────────────────────────────────
  /** Returns bubble {top, left} given a preferred side */
  function bubblePos(side: "top" | "bottom" | "left" | "right") {
    if (!cut) {
      // Centered fallback
      return {
        top: vh / 2 - 100,
        left: vw / 2 - BUBBLE_WIDTH / 2,
      };
    }

    const estimatedBubbleHeight = bubbleHeight;

    switch (side) {
      case "bottom":
        return {
          top: cut.top + cut.height + BUBBLE_MARGIN,
          left: Math.min(
            Math.max(cut.left, BUBBLE_MARGIN),
            vw - BUBBLE_WIDTH - BUBBLE_MARGIN
          ),
        };
      case "top":
        return {
          top: cut.top - estimatedBubbleHeight - BUBBLE_MARGIN,
          left: Math.min(
            Math.max(cut.left, BUBBLE_MARGIN),
            vw - BUBBLE_WIDTH - BUBBLE_MARGIN
          ),
        };
      case "right":
        return {
          top: Math.min(
            Math.max(cut.top, BUBBLE_MARGIN),
            vh - estimatedBubbleHeight - BUBBLE_MARGIN
          ),
          left: cut.left + cut.width + BUBBLE_MARGIN,
        };
      case "left":
        return {
          top: Math.min(
            Math.max(cut.top, BUBBLE_MARGIN),
            vh - estimatedBubbleHeight - BUBBLE_MARGIN
          ),
          left: cut.left - BUBBLE_WIDTH - BUBBLE_MARGIN,
        };
    }
  }

  /** Auto-detect best side that keeps the bubble in-viewport */
  function autoSide(): "top" | "bottom" | "left" | "right" {
    if (!cut) return "bottom";
    const spaceBelow = vh - (cut.top + cut.height);
    const spaceAbove = cut.top;
    const spaceRight = vw - (cut.left + cut.width);
    const spaceLeft = cut.left;

    const spaces: [number, "top" | "bottom" | "left" | "right"][] = [
      [spaceBelow, "bottom"],
      [spaceAbove, "top"],
      [spaceRight, "right"],
      [spaceLeft, "left"],
    ];
    spaces.sort((a, b) => b[0] - a[0]);
    return spaces[0][1];
  }

  const side =
    currentStep.position === "auto" || !currentStep.position
      ? autoSide()
      : currentStep.position;

  const pos = bubblePos(side);

  // Clamp to viewport
  const bubbleTop = Math.max(BUBBLE_MARGIN, pos.top);
  const bubbleLeft = Math.max(
    BUBBLE_MARGIN,
    Math.min(pos.left, vw - BUBBLE_WIDTH - BUBBLE_MARGIN)
  );

  // Arrow direction (points FROM bubble TOWARD spotlight)
  const arrowDir: Record<typeof side, string> = {
    bottom: "▲", // bubble is below → arrow points up toward zone
    top: "▼",
    right: "◀",
    left: "▶",
  };

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        pointerEvents: "none",
      }}
    >
      {/* ── Click blocker — intercepte tous les clics sur la page ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "all",
          cursor: "default",
          zIndex: 1
        }}
      />
      {/* ── Dark overlay with spotlight cutout ── */}
      <svg
        width={vw}
        height={vh}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}
      >
        {/* evenodd fill-rule punches a real transparent hole in the overlay */}
        {cut ? (
          <path
            fillRule="evenodd"
            fill="rgba(0,0,0,0.72)"
            d={`
              M 0 0 H ${vw} V ${vh} H 0 Z
              M ${cut.left + 10} ${cut.top}
              H ${cut.left + cut.width - 10}
              Q ${cut.left + cut.width} ${cut.top} ${cut.left + cut.width} ${cut.top + 10}
              V ${cut.top + cut.height - 10}
              Q ${cut.left + cut.width} ${cut.top + cut.height} ${cut.left + cut.width - 10} ${cut.top + cut.height}
              H ${cut.left + 10}
              Q ${cut.left} ${cut.top + cut.height} ${cut.left} ${cut.top + cut.height - 10}
              V ${cut.top + 10}
              Q ${cut.left} ${cut.top} ${cut.left + 10} ${cut.top}
              Z
            `}
          />
        ) : (
          <rect x={0} y={0} width={vw} height={vh} fill="rgba(0,0,0,0.72)" />
        )}
        {/* Spotlight border glow */}
        {cut && (
          <rect
            x={cut.left}
            y={cut.top}
            width={cut.width}
            height={cut.height}
            rx={10}
            ry={10}
            fill="none"
            stroke="rgba(255,220,80,0.85)"
            strokeWidth={2.5}
            style={{
              filter: "drop-shadow(0 0 8px rgba(255,200,50,0.7))",
            }}
          />
        )}
      </svg>

      {/* ── Tooltip bubble ── */}
      <div
        ref={bubbleRef}
        style={{
          position: "fixed",
          top: bubbleTop,
          left: bubbleLeft,
          width: BUBBLE_WIDTH,
          pointerEvents: "all",
          background: "linear-gradient(135deg, #51518d 0%, #3a549c 100%)",
          border: "1.5px solid rgba(255,220,80,0.6)",
          borderRadius: 14,
          padding: "18px 20px 14px",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,220,80,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
          color: "#f0e6c8",
          fontFamily: "'Georgia', serif",
          animation: "tutorialFadeIn 0.25s ease",
          zIndex: 9001
        }}
      >
        {/* Arrow indicator */}
        {cut && (
          <div
            style={{
              position: "absolute",
              ...(side === "bottom" && {
                top: -20,
                left: 24,
                fontSize: 18,
                color: "rgba(255,220,80,0.8)",
              }),
              ...(side === "top" && {
                bottom: -20,
                left: 24,
                fontSize: 18,
                color: "rgba(255,220,80,0.8)",
              }),
              ...(side === "right" && {
                left: -20,
                top: 16,
                fontSize: 18,
                color: "rgba(255,220,80,0.8)",
              }),
              ...(side === "left" && {
                right: -20,
                top: 16,
                fontSize: 18,
                color: "rgba(255,220,80,0.8)",
              }),
            }}
          >
            {arrowDir[side]}
          </div>
        )}

        {/* Progress dots */}
        <div
          style={{
            display: "flex",
            gap: 5,
            marginBottom: 10,
          }}
        >
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              style={{
                width: i === stepIndex ? 18 : 6,
                height: 6,
                borderRadius: 3,
                background:
                  i === stepIndex
                    ? "rgba(255,220,80,0.9)"
                    : i < stepIndex
                    ? "rgba(255,220,80,0.35)"
                    : "rgba(255,255,255,0.15)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Title */}
        <h3
          style={{
            margin: "0 0 8px",
            fontSize: 15,
            fontWeight: 700,
            color: "rgba(255,220,80,0.95)",
            letterSpacing: 0.3,
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
          }}
        >
          {renderEffectText(t(currentStep.title as TranslationKeys), t)}
        </h3>

        {/* Body text */}
        <p
          style={{
            margin: "0 0 14px",
            fontSize: 13.5,
            lineHeight: 1.55,
            color: "rgba(240,230,200,0.88)",
          }}
        >
          {renderEffectText(t(currentStep.text as TranslationKeys), t)}
        </p>

        {/* Buttons row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Skip */}
          <button
            onClick={onStop}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 8,
              color: "rgba(200,190,170,0.7)",
              fontSize: 12,
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            {t('tutorialSkip')}
          </button>

          <div style={{ display: "flex", gap: 8 }}>
            {/* Previous */}
            {stepIndex > 0 && (
              <button
                onClick={onPrevious}
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,220,80,0.3)",
                  borderRadius: 8,
                  color: "rgba(255,220,80,0.8)",
                  fontSize: 13,
                  padding: "6px 14px",
                  cursor: "pointer",
                }}
              >
                ← {t('tutorialPrevious')}
              </button>
            )}

            {/* Next / Finish */}
            <button
              onClick={onNext}
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,200,50,0.9), rgba(220,160,30,0.9))",
                border: "none",
                borderRadius: 8,
                color: "#1a1a2e",
                fontSize: 13,
                fontWeight: 700,
                padding: "6px 18px",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(255,200,50,0.35)",
              }}
            >
              {stepIndex === totalSteps - 1 ? t('tutorialFinish') : t('tutorialNext')}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tutorialFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>,
    document.body
  );
}

// ─── Spotlight-only utility (standalone use) ──────────────────────────────────

/**
 * Use this when you only need the dark overlay + spotlight without the full tutorial flow.
 * Pass `zoneRect` from a getBoundingClientRect() call.
 */
export function SpotlightOverlay({
  zoneRect,
  onDismiss,
}: {
  zoneRect: DOMRect | SpotlightRect | null;
  onDismiss?: () => void;
}) {
  if (!zoneRect) return null;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cut = {
    top: zoneRect.top - PADDING,
    left: zoneRect.left - PADDING,
    width: zoneRect.width + PADDING * 2,
    height: zoneRect.height + PADDING * 2,
  };

  return createPortal(
    <div
      style={{ position: "fixed", inset: 0, zIndex: 8500, cursor: "pointer" }}
      onClick={onDismiss}
    >
      <svg width={vw} height={vh} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <clipPath id="spotlight-only-clip">
            <rect x={0} y={0} width={vw} height={vh} />
            <rect
              x={cut.left}
              y={cut.top}
              width={cut.width}
              height={cut.height}
              rx={10}
              ry={10}
            />
          </clipPath>
        </defs>
        <rect
          x={0}
          y={0}
          width={vw}
          height={vh}
          fill="rgba(0,0,0,0.72)"
          clipPath="url(#spotlight-only-clip)"
        />
        <rect
          x={cut.left}
          y={cut.top}
          width={cut.width}
          height={cut.height}
          rx={10}
          ry={10}
          fill="none"
          stroke="rgba(255,220,80,0.85)"
          strokeWidth={2.5}
          style={{ filter: "drop-shadow(0 0 8px rgba(255,200,50,0.7))" }}
        />
      </svg>
    </div>,
    document.body
  );
}
