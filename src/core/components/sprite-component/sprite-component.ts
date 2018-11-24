/// <reference path="../component-manager.ts" />
/// <reference path="sprite-component-builder.ts" />
namespace Arch {
    export class SpriteComponent extends Component {
        private _sprite: Sprite;
        private _width: number;
        private _height: number;

        public constructor(data: SpriteComponentData) {
            super(data);
            this._width = data.width;
            this._height = data.height;
            this._sprite = new Sprite(name, data.materialName, this._width, this._height);
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
