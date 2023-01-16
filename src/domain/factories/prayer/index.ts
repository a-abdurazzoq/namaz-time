import {PrayerDto, PrayerFactory} from "../abstractions/prayer";
import {Prayer} from "../../entities/prayer";

export class PrayerFactoryImpl implements PrayerFactory {
    create(dto: PrayerDto): Prayer {
        return new Prayer(
            dto.name,
            dto.time,
            dto.createAt,
            dto.updateAt
        )
    }
}