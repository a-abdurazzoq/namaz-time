import {PrayerDto, PrayerFactory} from "../../abstractions/factories";
import {Prayer} from "../../entities";
import {injectable} from "inversify";

@injectable()
export class PrayerFactoryImpl implements PrayerFactory {
    create(dto: PrayerDto): Prayer {
        return new Prayer(
            dto.id,
            dto.name,
            dto.time,
            dto.createAt,
            dto.updateAt
        )
    }
}