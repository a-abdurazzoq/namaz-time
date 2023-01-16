import {MosqueDto, MosqueFactory} from "../abstractions/mosque";
import {Mosque} from "../../entities/mosque";

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