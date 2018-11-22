namespace Arch {
    export abstract class Component {
        public name: string;
        protected _owner: SimObject;

        protected constructor(name: string) {
            this.name = name;
        }

        public get owner(): SimObject {
            return this._owner;
        }

        public set owner(owner: SimObject) {
            this._owner = owner;
        }

        public load(): void {
        }

        public update(time: number): void {
        }

        public render(shader: Shader): void {
        }
    }
}
