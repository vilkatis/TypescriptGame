namespace Arch {
    export class RotationBehaviorData implements IBehaviorData {
        public name: string;
        public rotation: Vector3 = Vector3.zero;

        public setFromJson(json: any): void {
            if (json.name === undefined) {
                throw new Error('Name must be defined in behavior data.');
            }
            this.name = String(json.name);
            if (json.rotation !== undefined) {
                this.rotation.setFromJson(json.rotation);
            }
        }
    }
}