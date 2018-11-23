/// <reference path="../component-manager.ts" />
/// <reference path="collision-component-builder.ts" />
namespace Arch {
    export class CollisionComponent extends Component {
        private _shape: IShape2D;
        public constructor(data: CollisionComponentData) {
            super(data);
            this._shape = data.shape;
        }

        public get shape(): IShape2D {
            return this._shape;
        }

        public load(): void {
            super.load();

            this._shape.position.copyFrom(this.owner.transform.position.toVector2().add(this._shape.offset));

            // Tell the collision manager that we exist.
            CollisionManager.registerCollisionComponent(this);
        }

        public update(time: number): void {
            // TODO Update this to handle nested objects / get world position.
            this._shape.position.copyFrom(this.owner.transform.position.toVector2().add(this._shape.offset));
            super.update(time);
        }

        public render(shader: Shader): void {
            // this._sprite.draw(shader, this._owner.worldMatrix);
            super.render(shader);
        }

        public onCollisionEntry(other: CollisionComponent): void {
            // console.log('onCollisionEntry', this, other);
        }

        public onCollisionUpdate(other: CollisionComponent): void {
            // console.log('onCollisionUpdate', this, other);
        }

        public onCollisionExit(other: CollisionComponent): void {
            // console.log('onCollisionExit', this, other);
        }
    }
    ComponentManager.registerBuilder(new CollisionComponentBuilder());
}
