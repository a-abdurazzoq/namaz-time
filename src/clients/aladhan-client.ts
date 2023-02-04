import {AladhanClient, GetIslamicCalendarByMonth} from "./abstractions/aladhan-client";
import axios from "axios";
import {injectable} from "inversify";


@injectable()
class AladhanClientImpl implements AladhanClient {
    constructor(
        private url: string = "https://api.aladhan.com/v1"
    ) {}

    public async getIslamicCalendarByMonth(params: GetIslamicCalendarByMonth.Params): Promise<GetIslamicCalendarByMonth.Data> {
        const response = await axios.get<GetIslamicCalendarByMonth.Response>(`${this.url}/gToHCalendar/${params.month}$/${params.year}`)

        if (!Array.isArray(response.data?.data))
            throw new Error("Response data is not array")

        return response.data.data
    }

}