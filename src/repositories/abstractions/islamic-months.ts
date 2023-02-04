import {IslamicMonth} from "../../domain/entities";

export interface IslamicMonthRepository {
    getByNumber(monthNumber: number): Promise<IslamicMonth>
}