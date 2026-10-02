import { describe, it, expect, vi } from "vitest";
import { cardEffectsRegistry } from "../cardEffects";
import { createMockContext } from "./mockContext";
import { emptyResource } from "../types";
import type { GameContext } from "../cardEffects";
import type { GameCard, ResourceMap} from "../types";
import type { TimingEntry } from "../cardEffects";

const enTranslations: Record<string, string> = {
  effect_description_prisoner: "effects/forced If there are 2 Enemies in play, effects/arrow . effects/passive After selecting cards for a purge, you can add up to 2 Prisoners to that purge.",
  none: "",
  yes: "yes",
  no: "no",
  prisoner: "prisoner",
  deck: "deck",
};

function makeCtx(initialResources: Partial<ResourceMap> = {}, overrides: Partial<GameContext> = {}, options: { initialEffectsList?: TimingEntry[]; initialPurgedCards?: GameCard[] } = {}) {
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
  }, options);
}

describe("Card 142 - Prisoner (afterPurgeSelect)", () => {
  const effect = () => cardEffectsRegistry[142][3][1];

  it("returns false when player says no", async () => {
    const selectStringChoice = vi.fn().mockResolvedValue("no");
    const selectCardsFromZone = vi.fn();
    const { context: ctx } = makeCtx({}, {
      card: { id: 142, currentSide: 2 } as any,
      selectStringChoice,
      selectCardsFromZone,
    });

    const result = await effect().execute(ctx);

    expect(result).toBe(false);
    expect(selectStringChoice).toHaveBeenCalled();
    expect(selectCardsFromZone).not.toHaveBeenCalled();
  });

  it("returns false when player says yes but selects no prisoners", async () => {
    const selectStringChoice = vi.fn().mockResolvedValue("yes");
    const selectCardsFromZone = vi.fn().mockResolvedValue([]);
    const { context: ctx, state } = makeCtx({}, {
      card: { id: 142, currentSide: 2 } as any,
      selectStringChoice,
      selectCardsFromZone,
    });

    const result = await effect().execute(ctx);

    expect(result).toBe(false);
    expect(selectCardsFromZone).toHaveBeenCalled();
    expect(state.purgedCards).toHaveLength(0);
  });

  it("purges selected prisoners and removes other prisoner effects from the list", async () => {
    const prisonerCard1 = { id: 200, currentSide: 1, GetName: () => "prisoner" } as any;
    const prisonerCard2 = { id: 201, currentSide: 1, GetName: () => "prisoner" } as any;
    const otherCard = { id: 300, currentSide: 1, GetName: () => "guard" } as any;

    const prisonerEffect = { description: "test", timing: "afterPurgeSelect", execute: async () => false } as any;
    const otherEffect = { description: "test", timing: "afterPurgeSelect", execute: async () => false } as any;

    const selectStringChoice = vi.fn().mockResolvedValue("yes");
    const selectCardsFromZone = vi.fn().mockResolvedValue([prisonerCard1, prisonerCard2]);

    const { context: ctx, state } = makeCtx({}, {
      card: { id: 142, currentSide: 2 } as any,
      selectStringChoice,
      selectCardsFromZone,
    }, {
      initialEffectsList: [
        { effect: prisonerEffect, card: prisonerCard1, timing: "afterPurgeSelect" },
        { effect: otherEffect, card: otherCard, timing: "afterPurgeSelect" },
      ],
    });

    const result = await effect().execute(ctx);

    expect(result).toBe(false);
    expect(state.purgedCards).toHaveLength(2);
    expect(state.purgedCards[0].id).toBe(200);
    expect(state.purgedCards[1].id).toBe(201);
    expect(state.effectsList).toHaveLength(1);
    expect(state.effectsList[0].card.GetName(() => "")).toBe("guard");
  });
});
