import {IslamicMonthDto, IslamicMonthFactory} from "../../abstractions/factories/islamic-month";
import {IslamicMonth} from "../../entities";

export class IslamicMonthFactoryImpl implements IslamicMonthFactory {
    create(dto: IslamicMonthDto): IslamicMonth {
        return new IslamicMonth(
            dto.id,
            dto.number,
            dto.name
        )
    }
}