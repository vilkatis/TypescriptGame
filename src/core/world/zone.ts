namespace Arch {

    export enum ZoneState {
        UNINITIALIZED,
        LOADING,
        UPDATING
    }

    export class Zone {
        private readonly _id: number;
        private readonly _name: string;
        private readonly _description: string;
        private readonly _scene: Scene;
        private _state: ZoneState = ZoneState.UNINITIALIZED;

        public constructor(id: number, name: string, description: string) {
            this._id = id;
            this._name = name;
            this._description = description;
            this._scene = new Scene();
        }

        get id(): number {
            return this._id;
        }

        get name(): string {
            return this._name;
        }

        get description(): string {
            return this._description;
        }

        get scene(): Arch.Scene {
            return this._scene;
        }

        public load(): void {
            this._state = ZoneState.LOADING;
            this._scene.load();
            this._state = ZoneState.UPDATING;
        }

        public unload(): void {
        }

        public update(time: number): void {
            if (this._state === ZoneState.UPDATING) {
                this._scene.update(time);
            }
        }

        public render(shader: Shader): void {
            if (this._state === ZoneState.UPDATING) {
                this._scene.render(shader);
            }
        }

        public onActivated(): void {
        }

        public onDeactivated(): void {
        }
    }
}
