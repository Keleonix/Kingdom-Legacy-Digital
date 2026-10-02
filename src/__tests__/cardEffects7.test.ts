import { describe, it, expect, vi } from "vitest";
import { cardEffectsRegistry } from "../cardEffects";
import { createMockContext } from "./mockContext";
import { emptyResource } from "../types";
import type { GameContext } from "../cardEffects";
import type { GameCard, ResourceMap } from "../types";

const enTranslations: Record<string, string> = {
  effect_description_sacred_well: "effects/destroy Discover a i18n/shrine (82/83).",
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

describe("Card 7 - Forest / Felled Forest / Sacred Well / Lumberjack", () => {
  describe("Side 1 - Forest", () => {
    it("gains 3 wood and upgrades to side 2", async () => {
      const upgradeCard = vi.fn().mockResolvedValue(true);
      const effect = cardEffectsRegistry[7][1][0];
      const ctx = makeCtx({ wood: 0 }, {
        card: { id: 7, currentSide: 1 } as any,
        upgradeCard,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(true);
      expect(ctx.resources.wood).toBe(3);
      expect(upgradeCard).toHaveBeenCalledWith(ctx.card, 2, true);
    });
  });

  describe("Side 3 - Sacred Well", () => {
    it("destroys card and discovers a shrine when discovery succeeds", async () => {
      const deleteCardInZone = vi.fn();
      const discoverCard = vi.fn().mockResolvedValue(true);
      const effect = cardEffectsRegistry[7][3][0];
      const ctx = makeCtx({}, {
        card: { id: 7, currentSide: 3 } as any,
        discoverCard,
        deleteCardInZone,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(false);
      expect(discoverCard).toHaveBeenCalled();
      expect(deleteCardInZone).toHaveBeenCalledWith(ctx.zone, 7);
    });

    it("does not destroy card when discovery fails", async () => {
      const deleteCardInZone = vi.fn();
      const discoverCard = vi.fn().mockResolvedValue(false);
      const effect = cardEffectsRegistry[7][3][0];
      const ctx = makeCtx({}, {
        card: { id: 7, currentSide: 3 } as any,
        discoverCard,
        deleteCardInZone,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(false);
      expect(deleteCardInZone).not.toHaveBeenCalled();
    });
  });
});
