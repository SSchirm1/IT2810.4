type Order = "ASC" | "DESC" | 1 | -1;

interface Sort {
    navn: Order | null;
    vurderingTotal: Order | null;
}

export const ORDER_MAP: Record<string, Sort> =  {
    "alphabetical":  { navn: "ASC", vurderingTotal: null },
    "inverseAlphabetical":  { navn: "DESC", vurderingTotal: null },
    "ratingHighToLow" : { vurderingTotal: "DESC", navn: null },
    "ratingLowToHigh" : { vurderingTotal: "ASC", navn: null }
};