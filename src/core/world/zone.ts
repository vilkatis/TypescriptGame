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
        private _globalId: number = -1;

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

        public initialize(zoneData: any): void {
            if (zoneData.objects === undefined) {
                throw new Error('Zone initialization error: objects not present.');
            }
            for (const key in zoneData.objects) {
                const object: any = zoneData.objects[key];
                this._loadSimObject(object, this._scene.root);
            }
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

        private _loadSimObject(dataSection: any, parent: SimObject): void {
            let  name: string;
            if (dataSection.name !== undefined) {
                name = String(dataSection.name);
            }
            this._globalId++;
            const simObject: SimObject = new SimObject(this._globalId, name, this._scene);
            if (dataSection.transform !== undefined) {
                simObject.transform.setFromJson(dataSection.transform);
            }
            if (dataSection.children !== undefined) {
                for (const key in dataSection.children) {
                    const object: any = dataSection.children[key];
                    this._loadSimObject(object, simObject);
                }
            }
            if (parent !== undefined) {
                parent.addChild(simObject);
            }
        }
    }
}