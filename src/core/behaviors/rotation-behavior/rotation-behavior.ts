/// <reference path="../behavior.ts" />
/// <reference path="../behavior-manager.ts" />
/// <reference path="rotation-behavior-builder.ts" />
namespace Arch {
    export class RotationBehavior extends Behavior {
        private _rotation: Vector3;

        public constructor(data: RotationBehaviorData) {
            super(data);
            this._rotation = data.rotation;
        }

        public update(time: number): void {
            this._owner.transform.rotation.add(this._rotation);
            super.update(time);
        }
    }
    BehaviorManager.registerBuilder(new RotationBehaviorBuilder());
}
