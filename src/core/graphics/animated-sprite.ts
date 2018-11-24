/// <reference path="sprite.ts" />
namespace Arch {
    class UVInfo {
        public min: Vector2;
        public max: Vector2;

        public constructor(min: Vector2, max: Vector2) {
            this.min = min;
            this.max = max;
        }
    }

    export class AnimatedSprite extends Sprite implements IMessageHandler {
        private _frameWidth: number;
        private _frameHeight: number;
        private _frameCount: number;
        private _frameSequence: number[];
        private _currentFrame: number = 0;
        // TODO make this configurable
        private _frameTime: number = 333;
        private _frameUVs: UVInfo[] = [];
        private _currentTime: number = 0;
        private _assetLoaded: boolean = false;
        private _assetWidth: number = 2;
        private _assetHeight: number = 2;
        private _isPlaying: boolean = true;

        /**
         * Creates a new sprite.
         * @param name The name of this sprite;
         * @param materialName The name of the material to use with this sprite.
         * @param width The width of this sprite.
         * @param height The height of this sprite.
         */
        public constructor(name: string, materialName: string, width: number = 100, height: number = 100, frameWidth: number = 10, frameHeight: number = 10, frameCount: number = 1, frameSequence: number[] = []) {
            super(name, materialName, width, height);
            this._frameWidth = frameWidth;
            this._frameHeight = frameHeight;
            this._frameCount = frameCount;
            this._frameSequence = frameSequence;
            Message.subscribe(`${Constants.MESSAGE_ASSET_LOADER_ASSET_LOADED}::${this._material.diffuseTextureName}`, this);
        }

        public get isPlaying(): boolean {
            return this._isPlaying;
        }

        public destroy(): void {
            super.destroy();
        }

        public play(): void {
            this._isPlaying = true;
        }

        public stop(): void {
            this._isPlaying = false;
        }

        public setFrame(frameNumber: number): void {
            if (frameNumber >= this._frameCount) {
                throw new Error(`Frame is out of range: ${frameNumber}, frameCount: ${this._frameCount}`);
            }
            this._currentFrame = frameNumber;
        }

        public load(): void {
            super.load();
            if (!this._assetLoaded) {
                this._setupFromMaterial();
            }
        }

        public update(time: number): void {
            if (!this._assetLoaded) {
                this._setupFromMaterial();
                return;
            }
            if (!this._isPlaying) return;
            this._currentTime += time;
            if (this._currentTime > this._frameTime) {
                this._currentFrame++;
                this._currentTime = 0;

                if (this._currentFrame >= this._frameSequence.length) {
                    this._currentFrame = 0;
                }
                const frameUV: number = this._frameSequence[this._currentFrame];
                this._vertices[0].texCoords.copyFrom(this._frameUVs[frameUV].min);
                this._vertices[1].texCoords = new Vector2(this._frameUVs[frameUV].min.x, this._frameUVs[frameUV].max.y);
                this._vertices[2].texCoords.copyFrom(this._frameUVs[frameUV].max);
                this._vertices[3].texCoords.copyFrom(this._frameUVs[frameUV].max);
                this._vertices[4].texCoords = new Vector2(this._frameUVs[frameUV].max.x, this._frameUVs[frameUV].min.y);
                this._vertices[5].texCoords.copyFrom(this._frameUVs[frameUV].min);

                this._buffer.clearData();
                for (const vertex of this._vertices) {
                    this._buffer.pushBackData(vertex.toArray());
                }
                this._buffer.upload();
                this._buffer.unbind();
            }

            super.update(time);
        }

        public onMessage(message: Message): void {
            if (message.code === `${Constants.MESSAGE_ASSET_LOADER_ASSET_LOADED}::${this._material.diffuseTextureName}`) {
                this._assetLoaded = true;
                const asset: ImageAsset = message.context as ImageAsset;
                this._assetWidth = asset.width;
                this._assetHeight = asset.height;
                this._calculateUVs();
            }
        }

        private _calculateUVs(): void {
            let totalWidth: number = 0;
            let yAxis: number = 0;
            for (let i = 0; i < this._frameCount; ++i) {
                totalWidth += i * this._frameWidth;
                if (totalWidth > this._assetWidth) {
                    yAxis++;
                    totalWidth = 0;
                }
                const uMin: number = i * this._frameWidth / this._assetWidth;
                const vMin: number = yAxis * this._frameHeight / this._assetHeight;
                const uMax: number = (i + 1) * this._frameWidth / this._assetWidth;
                const vMax: number = (yAxis + 1) * this._frameHeight / this._assetHeight;
                this._frameUVs.push(new UVInfo(new Vector2(uMin, vMin), new Vector2(uMax, vMax)));
            }
        }

        private _setupFromMaterial(): void {
            const material: Material = MaterialManager.getMaterial(this._materialName);
            if (material.diffuseTexture.isLoaded) {
                if (AssetManager.isAssetLoaded(material.diffuseTextureName)) {
                    this._assetWidth = material.diffuseTexture.width;
                    this._assetHeight = material.diffuseTexture.height;
                    this._assetLoaded = true;
                    this._calculateUVs();
                }
            }
        }
    }
}
