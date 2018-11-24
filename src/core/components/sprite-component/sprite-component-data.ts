namespace Arch {
    export class SpriteComponentData implements IComponentData {
        public name: string;
        public materialName: string;
        public origin: Vector3 = Vector3.zero;
        public width: number;
        public height: number;

        public setFromJson(json: any): void {
            if (json.name !== undefined) {
                this.name = String(json.name);
            }
            if (json.width !== undefined) {
                this.width = Number(json.width);
            }
            if (json.height !== undefined) {
                this.height = Number(json.height);
            }
            if (json.materialName !== undefined) {
                this.materialName = String(json.materialName);
            }

            if (json.origin !== undefined) {
                this.origin.setFromJson(json.origin);
            }
        }
    }
}