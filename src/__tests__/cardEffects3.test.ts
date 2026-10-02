import { describe, it, expect, vi } from "vitest";
import { cardEffectsRegistry } from "../cardEffects";
import { createMockContext } from "./mockContext";
import { emptyResource } from "../types";
import type { GameContext } from "../cardEffects";
import type { GameCard, ResourceMap } from "../types";

const enTranslations: Record<string, string> = {
  effect_description_plains: "effects/activate Discard a friendly card to gain resources/coin resources/coin .",
  staysInPlay: "effects/passive Stays in play.",
  none: "",
  playArea: "playArea",
  discard: "discard",
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

describe("Card 3 - Wild Grass / Plains / Food Barns / Farmlands", () => {
  describe("Side 2 - Plains", () => {
    it("discards a friendly card and gains 2 coin when a card is selected", async () => {
      const mockCard = { id: 99, currentSide: 1, negative: [false, false, false, false] } as any;
      const dropToDiscard = vi.fn().mockResolvedValue(undefined);
      const effect = cardEffectsRegistry[3][2][0];
      const ctx = makeCtx({}, {
        card: { id: 3, currentSide: 2 } as any,
        selectCardsFromZone: vi.fn().mockResolvedValue([mockCard]),
        dropToDiscard,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(true);
      expect(dropToDiscard).toHaveBeenCalledWith({ id: 99, fromZone: ctx.zone });
      expect(ctx.resources.coin).toBe(2);
    });

    it("returns false when no card is selected", async () => {
      const dropToDiscard = vi.fn().mockResolvedValue(undefined);
      const effect = cardEffectsRegistry[3][2][0];
      const ctx = makeCtx({}, {
        card: { id: 3, currentSide: 2 } as any,
        selectCardsFromZone: vi.fn().mockResolvedValue([]),
        dropToDiscard,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(false);
      expect(dropToDiscard).not.toHaveBeenCalled();
      expect(ctx.resources.coin).toBe(0);
    });
  });

  describe("Side 3 - Food Barns (staysInPlay)", () => {
    it("returns false when context exists", async () => {
      const effect = cardEffectsRegistry[3][3][0];
      const ctx = makeCtx({}, {
        card: { id: 3, currentSide: 3 } as any,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(false);
    });
  });
});
