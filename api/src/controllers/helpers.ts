import { Anmeldelse } from "../entity/anmeldelse.entity";

export const calculateAverage = (anmeldelser: Anmeldelse[]) => {
  const vurderingPris =
    anmeldelser
      .map((anmeldelse: Anmeldelse) => anmeldelse.vurderingPris)
      .reduce((a, b) => a + b) / anmeldelser.length;

  const vurderingLokasjon =
    anmeldelser
      .map((anmeldelse: Anmeldelse) => anmeldelse.vurderingLokasjon)
      .reduce((a, b) => a + b) / anmeldelser.length;

  const vurderingFellesAreal =
    anmeldelser
      .map((anmeldelse: Anmeldelse) => anmeldelse.vurderingFellesAreal)
      .reduce((a, b) => a + b) / anmeldelser.length;

  const vurderingTilstand =
    anmeldelser
      .map((anmeldelse: Anmeldelse) => anmeldelse.vurderingTilstand)
      .reduce((a, b) => a + b) / anmeldelser.length;

  const vurderingTotal =
    (vurderingPris +
      vurderingLokasjon +
      vurderingFellesAreal +
      vurderingTilstand) /
    4;
  return {
    vurderingPris,
    vurderingLokasjon,
    vurderingTilstand,
    vurderingFellesAreal,
    vurderingTotal,
  };
};
