import {Factory} from "../factory";
import {District} from "../../../entities/district";

interface DistrictDto {
    id: string;
    name: string;
}
interface DistrictFactory extends Factory<DistrictDto, District> {}
