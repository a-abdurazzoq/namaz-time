import {UseCase} from "../../../index";
import {Request} from "../../../../../domain/entities/request";

export interface GetAllRequestUseCase extends UseCase<void, Request[]> {}