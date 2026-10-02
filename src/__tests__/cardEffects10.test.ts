import { describe, it, expect, vi } from "vitest";
import { cardEffectsRegistry } from "../cardEffects";
import { createMockContext } from "./mockContext";
import { emptyResource } from "../types";
import type { GameContext } from "../cardEffects";
import type { GameCard, ResourceMap } from "../types";

const enTranslations: Record<string, string> = {
  effect_description_trader: "effects/activate Spend resources/coin to gain resources/wood .",
  effect_description_bazaar: "effects/activate Spend resources/coin to gain resources/wood / resources/stone .",
  effect_description_market: "effects/activate Spend resources/coin to gain resources/wood / resources/stone / resources/metal .",
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

describe("Card 10 - Trader / Bazaar / Festival / Market", () => {
  describe("Side 1 - Trader", () => {
    it("pays 1 coin and gains 1 wood when coin is available", async () => {
      const effect = cardEffectsRegistry[10][1][0];
      const ctx = makeCtx({ coin: 3, wood: 0 }, {
        card: { id: 10, currentSide: 1 } as any,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(true);
      expect(ctx.resources.coin).toBe(2);
      expect(ctx.resources.wood).toBe(1);
    });

    it("returns false when no coin is available", async () => {
      const effect = cardEffectsRegistry[10][1][0];
      const ctx = makeCtx({ coin: 0 }, {
        card: { id: 10, currentSide: 1 } as any,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(false);
      expect(ctx.resources.wood).toBe(0);
    });
  });

  describe("Side 2 - Bazaar", () => {
    it("pays 1 coin and gains chosen resource (wood) when coin is available", async () => {
      const selectResourceChoice = vi.fn().mockResolvedValue({ wood: 1 });
      const effect = cardEffectsRegistry[10][2][0];
      const ctx = makeCtx({ coin: 3, wood: 0, stone: 0 }, {
        card: { id: 10, currentSide: 2 } as any,
        selectResourceChoice,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(true);
      expect(ctx.resources.coin).toBe(2);
      expect(ctx.resources.wood).toBe(1);
      expect(selectResourceChoice).toHaveBeenCalledWith({ wood: 1, stone: 1 }, 1);
    });

    it("pays 1 coin and gains chosen resource (stone) when coin is available", async () => {
      const selectResourceChoice = vi.fn().mockResolvedValue({ stone: 1 });
      const effect = cardEffectsRegistry[10][2][0];
      const ctx = makeCtx({ coin: 3, wood: 0, stone: 0 }, {
        card: { id: 10, currentSide: 2 } as any,
        selectResourceChoice,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(true);
      expect(ctx.resources.coin).toBe(2);
      expect(ctx.resources.stone).toBe(1);
    });

    it("returns false when player cancels resource choice", async () => {
      const selectResourceChoice = vi.fn().mockResolvedValue(null);
      const effect = cardEffectsRegistry[10][2][0];
      const ctx = makeCtx({ coin: 3 }, {
        card: { id: 10, currentSide: 2 } as any,
        selectResourceChoice,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(false);
      expect(ctx.resources.coin).toBe(2);
    });

    it("returns false when no coin is available", async () => {
      const effect = cardEffectsRegistry[10][2][0];
      const ctx = makeCtx({ coin: 0 }, {
        card: { id: 10, currentSide: 2 } as any,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(false);
    });
  });

  describe("Side 4 - Market", () => {
    it("pays 1 coin and gains chosen resource (wood) when coin is available", async () => {
      const selectResourceChoice = vi.fn().mockResolvedValue({ wood: 1 });
      const effect = cardEffectsRegistry[10][4][0];
      const ctx = makeCtx({ coin: 3, wood: 0, stone: 0, metal: 0 }, {
        card: { id: 10, currentSide: 4 } as any,
        selectResourceChoice,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(true);
      expect(ctx.resources.coin).toBe(2);
      expect(ctx.resources.wood).toBe(1);
      expect(selectResourceChoice).toHaveBeenCalledWith({ wood: 1, stone: 1, metal: 1 }, 1);
    });

    it("pays 1 coin and gains chosen resource (metal) when coin is available", async () => {
      const selectResourceChoice = vi.fn().mockResolvedValue({ metal: 1 });
      const effect = cardEffectsRegistry[10][4][0];
      const ctx = makeCtx({ coin: 3, wood: 0, stone: 0, metal: 0 }, {
        card: { id: 10, currentSide: 4 } as any,
        selectResourceChoice,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(true);
      expect(ctx.resources.coin).toBe(2);
      expect(ctx.resources.metal).toBe(1);
    });

    it("returns false when player cancels resource choice", async () => {
      const selectResourceChoice = vi.fn().mockResolvedValue(null);
      const effect = cardEffectsRegistry[10][4][0];
      const ctx = makeCtx({ coin: 3 }, {
        card: { id: 10, currentSide: 4 } as any,
        selectResourceChoice,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(false);
      expect(ctx.resources.coin).toBe(2);
    });

    it("returns false when no coin is available", async () => {
      const effect = cardEffectsRegistry[10][4][0];
      const ctx = makeCtx({ coin: 0 }, {
        card: { id: 10, currentSide: 4 } as any,
      });

      const result = await effect.execute(ctx);

      expect(result).toBe(false);
    });
  });
});
