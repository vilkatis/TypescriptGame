namespace Arch {
    export abstract class Component implements IComponent {
        public name: string;
        protected _owner: SimObject;
        protected _data: IComponentData;

        protected constructor(data: IComponentData) {
            this._data = data;
            this.name = data.name;
        }

        public get owner(): SimObject {
            return this._owner;
        }

        public set owner(owner: SimObject) {
            this._owner = owner;
        }

        public load(): void {
        }

        public updateReady(): void {
        }

        public update(time: number): void {
        }

        public render(shader: Shader): void {
        }
    }
}
