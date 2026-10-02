import { describe, it, expect, vi } from "vitest";
import { cardEffectsRegistry } from "../cardEffects";
import { createMockContext } from "./mockContext";
import { emptyResource } from "../types";
import type { GameContext } from "../cardEffects";
import type { GameCard, ResourceMap } from "../types";

const enTranslations: Record<string, string> = {
  effect_description_shallow_mines: "effects/destroy Discover a i18n/mine (84/85).",
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

describe("Card 6 - Distant Mountain / Rocky Area / Shallow Mines / Quarry", () => {
  describe("Side 2 - Rocky Area", () => {
    it("pays 1 coin and gains 2 stone when coin is available", async () => {
      const effect = cardEffectsRegistry[6][2][0];
      const ctx = makeCtx({ coin: 3 }, {
        card: { id: 6, currentSide: 2 } as any,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(true);
      expect(ctx.resources.coin).toBe(2);
      expect(ctx.resources.stone).toBe(2);
    });

    it("returns false when no coin is available", async () => {
      const effect = cardEffectsRegistry[6][2][0];
      const ctx = makeCtx({ coin: 0 }, {
        card: { id: 6, currentSide: 2 } as any,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(false);
      expect(ctx.resources.coin).toBe(0);
      expect(ctx.resources.stone).toBe(0);
    });
  });

  describe("Side 3 - Shallow Mines", () => {
    it("destroys card and discovers a mine when discovery succeeds", async () => {
      const deleteCardInZone = vi.fn();
      const discoverCard = vi.fn().mockResolvedValue(true);
      const effect = cardEffectsRegistry[6][3][0];
      const ctx = makeCtx({}, {
        card: { id: 6, currentSide: 3 } as any,
        discoverCard,
        deleteCardInZone,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(false);
      expect(discoverCard).toHaveBeenCalled();
      expect(deleteCardInZone).toHaveBeenCalledWith(ctx.zone, 6);
    });

    it("does not destroy card when discovery fails", async () => {
      const deleteCardInZone = vi.fn();
      const discoverCard = vi.fn().mockResolvedValue(false);
      const effect = cardEffectsRegistry[6][3][0];
      const ctx = makeCtx({}, {
        card: { id: 6, currentSide: 3 } as any,
        discoverCard,
        deleteCardInZone,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(false);
      expect(deleteCardInZone).not.toHaveBeenCalled();
    });
  });
});
