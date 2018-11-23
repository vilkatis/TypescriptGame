/// <reference path="../behavior.ts" />
/// <reference path="../behavior-manager.ts" />
/// <reference path="keyboard-movement-behavior-builder.ts" />
namespace Arch {
    export class KeyboardMovementBehavior extends Behavior {
        public speed: number = 0.1;
        public constructor(data: KeyboardMovementBehaviorData) {
            super(data);

            this.speed = data.speed;
        }

        public update(time: number): void {
            if (InputManager.isKeyDown(Keys.LEFT)) {
                this._owner.transform.position.x -= this.speed;
            }
            if (InputManager.isKeyDown(Keys.RIGHT)) {
                this._owner.transform.position.x += this.speed;
            }
            if (InputManager.isKeyDown(Keys.UP)) {
                this._owner.transform.position.y -= this.speed;
            }
            if (InputManager.isKeyDown(Keys.DOWN)) {
                this._owner.transform.position.y += this.speed;
            }
            super.update(time);
        }
    }
    BehaviorManager.registerBuilder(new KeyboardMovementBehaviorBuilder());
}
