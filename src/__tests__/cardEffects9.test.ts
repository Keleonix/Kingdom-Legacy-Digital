import { describe, it, expect, vi } from "vitest";
import { cardEffectsRegistry } from "../cardEffects";
import { createMockContext } from "./mockContext";
import { emptyResource } from "../types";
import type { GameContext } from "../cardEffects";
import type { GameCard, ResourceMap } from "../types";

const enTranslations: Record<string, string> = {
  effect_description_town_hall: "effects/activate Play a Land from your discard.",
  effect_description_castle: "effects/activate Play a card from your discard.",
  effect_description_keep: "effects/activate Play a Land or Building from your discard.",
  none: "",
  playArea: "playArea",
  discard: "discard",
  land: "land",
  building: "building",
};

function makeCtx(initialResources: Partial<ResourceMap> = {}, overrides: Partial<GameContext> = {}): GameContext {
  const resources: ResourceMap = { ...emptyResource, ...initialResources };
  return createMockContext({
    resources,
    t: ((key: string) => enTranslations[key] ?? key) as any,
    handlePayResources: async (_card: GameCard, cost: Partial<ResourceMap>, _zone: string) => {
      for (const [k, v] of Object.entries(cost)) {
        resources[k as keyof ResourceMap] -= v as number;
      }
      return true;
    },
    handleGainResources: async (_card: GameCard, gain: Partial<ResourceMap>, _zone: string) => {
      for (const [k, v] of Object.entries(gain)) {
        resources[k as keyof ResourceMap] += v as number;
      }
    },
    ...overrides,
  }).context;
}

describe("Card 9 - Headquarters / Town Hall / Castle / Keep", () => {
  describe("Side 2 - Town Hall", () => {
    it("plays a land from discard when a land card is selected", async () => {
      const mockCard = { id: 42, currentSide: 1, GetType: () => "land" } as any;
      const dropToPlayArea = vi.fn().mockResolvedValue(undefined);
      const effect = cardEffectsRegistry[9][2][0];
      const ctx = makeCtx({}, {
        card: { id: 9, currentSide: 2 } as any,
        selectCardsFromZone: vi.fn().mockResolvedValue([mockCard]),
        dropToPlayArea,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(true);
      expect(dropToPlayArea).toHaveBeenCalledWith({ id: 42, fromZone: ctx.t("discard") });
    });

    it("returns false when no land card is selected", async () => {
      const dropToPlayArea = vi.fn().mockResolvedValue(undefined);
      const effect = cardEffectsRegistry[9][2][0];
      const ctx = makeCtx({}, {
        card: { id: 9, currentSide: 2 } as any,
        selectCardsFromZone: vi.fn().mockResolvedValue([]),
        dropToPlayArea,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(false);
      expect(dropToPlayArea).not.toHaveBeenCalled();
    });
  });

  describe("Side 3 - Castle", () => {
    it("plays a card from discard when a card is selected", async () => {
      const mockCard = { id: 55, currentSide: 1, GetType: () => "person" } as any;
      const dropToPlayArea = vi.fn().mockResolvedValue(undefined);
      const effect = cardEffectsRegistry[9][3][0];
      const ctx = makeCtx({}, {
        card: { id: 9, currentSide: 3 } as any,
        selectCardsFromZone: vi.fn().mockResolvedValue([mockCard]),
        dropToPlayArea,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(true);
      expect(dropToPlayArea).toHaveBeenCalledWith({ id: 55, fromZone: ctx.t("discard") });
    });

    it("returns false when no card is selected", async () => {
      const dropToPlayArea = vi.fn().mockResolvedValue(undefined);
      const effect = cardEffectsRegistry[9][3][0];
      const ctx = makeCtx({}, {
        card: { id: 9, currentSide: 3 } as any,
        selectCardsFromZone: vi.fn().mockResolvedValue([]),
        dropToPlayArea,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(false);
      expect(dropToPlayArea).not.toHaveBeenCalled();
    });
  });

  describe("Side 4 - Keep", () => {
    it("plays a land or building from discard when a valid card is selected", async () => {
      const mockCard = { id: 60, currentSide: 1, GetType: () => "building" } as any;
      const dropToPlayArea = vi.fn().mockResolvedValue(undefined);
      const effect = cardEffectsRegistry[9][4][0];
      const ctx = makeCtx({}, {
        card: { id: 9, currentSide: 4 } as any,
        selectCardsFromZone: vi.fn().mockResolvedValue([mockCard]),
        dropToPlayArea,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(true);
      expect(dropToPlayArea).toHaveBeenCalledWith({ id: 60, fromZone: ctx.t("discard") });
    });

    it("returns false when no valid card is selected", async () => {
      const dropToPlayArea = vi.fn().mockResolvedValue(undefined);
      const effect = cardEffectsRegistry[9][4][0];
      const ctx = makeCtx({}, {
        card: { id: 9, currentSide: 4 } as any,
        selectCardsFromZone: vi.fn().mockResolvedValue([]),
        dropToPlayArea,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(false);
      expect(dropToPlayArea).not.toHaveBeenCalled();
    });
  });
});
