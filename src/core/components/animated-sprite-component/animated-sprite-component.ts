/// <reference path="../component-manager.ts" />
/// <reference path="animated-sprite-component-builder.ts" />
namespace Arch {
    export class AnimatedSpriteComponent extends Component {
        private _autoPlay: boolean;
        private _sprite: AnimatedSprite;
        public constructor(data: AnimatedSpriteComponentData) {
            super(data);
            this._autoPlay = data.autoPlay;
            this._sprite = new AnimatedSprite(name, data.materialName, data.frameWidth, data.frameHeight, data.frameWidth, data.frameHeight, data.frameCount, data.frameSequence);
            if (!data.origin.equals(Vector3.zero)) {
                this._sprite.origin.copyFrom(data.origin);
            }
        }

        public isPlaying(): boolean {
            return this._sprite.isPlaying;
        }

        public load(): void {
            this._sprite.load();
        }

        public updateReady(): void {
            if (!this._autoPlay) {
                this._sprite.stop();
            }
        }

        public update(time: number): void {
            this._sprite.update(time);
            super.update(time);
        }

        public render(shader: Shader): void {
            this._sprite.draw(shader, this._owner.worldMatrix);
            super.render(shader);
        }

        public play(): void {
            this._sprite.play();
        }

        public stop(): void {
            this._sprite.stop();
        }

        public setFrame(frameNumber: number): void {
            this._sprite.setFrame(frameNumber);
        }
    }
    ComponentManager.registerBuilder(new AnimatedSpriteComponentBuilder());
}
