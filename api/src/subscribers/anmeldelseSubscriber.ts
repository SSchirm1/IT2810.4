import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  getRepository,
  getConnection,
} from "typeorm";
import { Anmeldelse } from "../entity/anmeldelse.entity";
import { Studentby } from "../entity/studentby.entity";
import { calculateAverage } from "./helpers";

@EventSubscriber()
export class AnmeldelseSubscriber implements EntitySubscriberInterface<Anmeldelse> {
  /**
   * Indicates that this subscriber only listen to Review events.
   */
  listenTo() {
    return Anmeldelse;
  }

  /**
   * Called after review insertion.
   */
  async afterInsert(event: InsertEvent<Anmeldelse>) {
    //console.log(`AFTER POST INSERTED: `, event.entity);

    const studentby = await getRepository(Studentby).findOne(
      event.entity.studentby.id,
      { relations: ["anmeldelser"] }
    );
    const size = studentby.anmeldelser.length + 1;

    studentby.vurderingPris = calculateAverage(studentby.vurderingPris, event.entity.vurderingPris, size);
    studentby.vurderingLokasjon = calculateAverage(studentby.vurderingLokasjon, event.entity.vurderingLokasjon, size);
    studentby.vurderingTilstand = calculateAverage(studentby.vurderingTilstand, event.entity.vurderingTilstand, size);
    studentby.vurderingFellesAreal = calculateAverage(studentby.vurderingFellesAreal, event.entity.vurderingFellesAreal, size);

    studentby.vurderingTotal =
      (studentby.vurderingFellesAreal +
        studentby.vurderingTilstand +
        studentby.vurderingLokasjon +
        studentby.vurderingPris) /
      4;
    await getConnection().manager.save(studentby);
  }
}
