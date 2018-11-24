namespace Arch {
    export class PlayerBehaviorData implements IBehaviorData {
        public name: string;
        public acceleration: Vector2 = new Vector2(0, 920);
        public playerCollisionComponent: string;
        public groundCollisionComponent: string;
        public animatedSpriteName: string;

        public setFromJson(json: any): void {
            if (json.name === undefined) {
                throw new Error('Name must be defined in behavior data.');
            } else {
                this.name = String(json.name);
            }
            if (json.acceleration !== undefined) {
                this.acceleration.setFromJson(json.acceleration);
            }
            if (json.animatedSpriteName === undefined) {
                throw new Error('animatedSpriteName must be defined in behavior data.');
            } else {
                this.animatedSpriteName = String(json.animatedSpriteName);
            }
            if (json.playerCollisionComponent === undefined) {
                throw new Error('playerCollisionComponent must be defined in behavior data.');
            } else {
                this.playerCollisionComponent = String(json.playerCollisionComponent);
            }
            if (json.groundCollisionComponent === undefined) {
                throw new Error('groundCollisionComponent must be defined in behavior data.');
            } else {
                this.groundCollisionComponent = String(json.groundCollisionComponent);
            }
        }
    }
}