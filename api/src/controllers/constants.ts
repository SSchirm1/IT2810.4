type Order = "ASC" | "DESC";

interface Sort {
  order: Order | null;
  field: string;
}

export const ORDER_MAP: Record<string, Sort | undefined> = {
  alphabetical: { order: "ASC", field: "studentby.navn" },
  inverseAlphabetical: { order: "DESC", field: "studentby.navn" },
  ratingHighToLow: {
    order: "DESC",
    field:
      "(AVG(anmeldelse.vurderingPris) + AVG(anmeldelse.vurderingLokasjon) + AVG(anmeldelse.vurderingFellesAreal) + AVG(anmeldelse.vurderingTilstand))/4",
  },
  ratingLowToHigh: {
    order: "ASC",
    field:
      "(AVG(anmeldelse.vurderingPris) + AVG(anmeldelse.vurderingLokasjon) + AVG(anmeldelse.vurderingFellesAreal) + AVG(anmeldelse.vurderingTilstand))/4",
  },
  "": undefined,
};
