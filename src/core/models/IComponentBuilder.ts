namespace Arch {
    export interface IComponentBuilder {
        readonly type: string;

        buildFromJson(json: any): IComponent;
    }
}
