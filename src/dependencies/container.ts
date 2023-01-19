import {Container as InversifyContainer, ContainerModule} from "inversify"

export interface Container {
    get<T>(symbol: symbol): T
}

export class ContainerImpl implements Container {
    private container: InversifyContainer

    constructor(modules: ContainerModule[]) {
        this.init()
        this.loadAll(modules)
    }

    private init(): void {
        this.container = new InversifyContainer()
    }

    private loadAll(modules: ContainerModule[]): void {
        this.container.load(...modules)
    }

    public get<T>(symbol: symbol): T {
        return this.container.get<T>(symbol)
    }
}