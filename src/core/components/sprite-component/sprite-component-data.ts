namespace Arch {
    export class SpriteComponentData implements IComponentData {
        public name: string;
        public materialName: string;

        public setFromJson(json: any): void {
            if (json.name !== undefined) {
                this.name = String(json.name);
            }
            if (json.materialName !== undefined) {
                this.materialName = String(json.materialName);
            }
        }
    }
}