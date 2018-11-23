/// <reference path="../component-manager.ts" />
/// <reference path="animated-sprite-component-builder.ts" />
namespace Arch {
    export class AnimatedSpriteComponent extends Component {
        private _sprite: AnimatedSprite;
        public constructor(data: AnimatedSpriteComponentData) {
            super(data);
            this._sprite = new AnimatedSprite(name, data.materialName, data.frameWidth, data.frameHeight, data.frameWidth, data.frameHeight, data.frameCount, data.frameSequence);
        }

        public load(): void {
            this._sprite.load();
        }

        public update(time: number): void {
            this._sprite.update(time);
            super.update(time);
        }

        public render(shader: Shader): void {
            this._sprite.draw(shader, this._owner.worldMatrix);
            super.render(shader);
        }
    }
    ComponentManager.registerBuilder(new AnimatedSpriteComponentBuilder());
}
