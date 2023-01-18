import {MosqueDto, MosqueFactory} from "../../abstractions/factories";
import {Mosque} from "../../entities";
import {injectable} from "inversify";

@injectable()
export class MosqueFactoryImpl implements MosqueFactory {
    create(dto: MosqueDto): Mosque {
        return new Mosque(
            dto.name,
            dto.user,
            dto.address,
            dto.createAt,
            dto.updateAt
        )
    }
}