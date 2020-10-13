import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  getRepository,
  getConnection,
} from "typeorm";
import { Review } from "../entity/review.entity";
import { Studentby } from "../entity/studentby.entity";

@EventSubscriber()
export class ReviewSubscriber implements EntitySubscriberInterface<Review> {
  /**
   * Indicates that this subscriber only listen to Review events.
   */
  listenTo() {
    return Review;
  }

  /**
   * Called after review insertion.
   */
  async afterInsert(event: InsertEvent<Review>) {
    //console.log(`AFTER POST INSERTED: `, event.entity);

    const studentby = await getRepository(Studentby).findOne(
      event.entity.studentby.id,
      { relations: ["reviews"] }
    );
    const size = studentby.reviews.length + 1;

    studentby.vurderingPris =
      studentby.vurderingPris !== null
        ? (Math.floor(studentby.vurderingPris) * (size - 1) +
            event.entity.vurderingPris) /
          size
        : event.entity.vurderingPris;
    studentby.vurderingLokasjon = studentby.vurderingLokasjon
      ? (Math.floor(studentby.vurderingLokasjon) * (size - 1) +
          event.entity.vurderingLokasjon) /
        size
      : event.entity.vurderingLokasjon;
    studentby.vurderingTilstand =
      studentby.vurderingTilstand !== null
        ? (Math.floor(studentby.vurderingTilstand) * (size - 1) +
            event.entity.vurderingTilstand) /
          size
        : event.entity.vurderingTilstand;
    studentby.vurderingFellesAreal =
      studentby.vurderingFellesAreal !== null
        ? (Math.floor(studentby.vurderingFellesAreal) * (size - 1) +
            event.entity.vurderingFellesAreal) /
          size
        : event.entity.vurderingFellesAreal;
    studentby.vurderingTotal =
      (studentby.vurderingFellesAreal +
        studentby.vurderingTilstand +
        studentby.vurderingLokasjon +
        studentby.vurderingPris) /
      4;
    await getConnection().manager.save(studentby);
  }
}
