/// <reference path="../component-manager.ts" />
/// <reference path="sprite-component-builder.ts" />
namespace Arch {
    export class SpriteComponent extends Component {
        private _sprite: Sprite;
        public constructor(data: SpriteComponentData) {
            super(data);
            this._sprite = new Sprite(name, data.materialName);
            if (!data.origin.equals(Vector3.zero)) {
                this._sprite.origin.copyFrom(data.origin);
            }
        }

        public load(): void {
            this._sprite.load();
        }

        public render(shader: Shader): void {
            this._sprite.draw(shader, this._owner.worldMatrix);
            super.render(shader);
        }
    }
    ComponentManager.registerBuilder(new SpriteComponentBuilder());
}
