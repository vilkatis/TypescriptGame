namespace Arch {
    export class KeyboardMovementBehaviorData implements IBehaviorData {
        public name: string;
        public speed: number = 0.1;

        public setFromJson(json: any): void {
            if (json.name === undefined) {
                throw new Error('Name must be defined in behavior data.');
            }
            this.name = String(json.name);
            if (json.speed !== undefined) {
                this.speed = Number(json.speed);
            }
        }
    }
}