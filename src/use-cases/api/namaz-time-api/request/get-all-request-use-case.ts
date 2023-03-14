import {inject, injectable} from "inversify";
import {Symbols} from "../../../../dependencies/symbols";
import {RequestRepository} from "../../../../repositories/abstractions";
import {Request} from "../../../../domain/entities/request";
import {GetAllRequestUseCase} from "../../../abstractions/api/namaz-time-api/request/get-all-request-use-case";

@injectable()
export class GetAllRequestUseCaseImpl implements GetAllRequestUseCase {
    constructor(
        @inject(Symbols.Repositories.Request) private readonly requestRepository: RequestRepository
    ) {}

    public async execute(): Promise<Request[]> {
        return this.requestRepository.getAll()
    }
}