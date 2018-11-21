namespace Arch {
    export class Texture implements IMessageHandler {
        private static readonly LEVEL: number = 0;
        private static readonly BORDER: number = 0;
        private static readonly TEMP_IMAGE_DATA = new Uint8Array([255, 255, 255, 255]);
        private readonly _name: string;
        private readonly _handle: WebGLTexture;
        private _width: number;
        private _height: number;
        private _isLoaded: boolean = false;

        public constructor(name: string, width: number = 1, height: number = 1) {
            this._name = name;
            this._width = width;
            this._height = height;

            this._handle = GL.createTexture();

            Message.subscribe(`${Constants.MESSAGE_ASSET_LOADER_ASSET_LOADED}::${this._name}`, this);

            this.bind();

            GL.texImage2D(GL.TEXTURE_2D, Texture.LEVEL, GL.RGBA, 1, 1, Texture.BORDER, GL.RGBA, GL.UNSIGNED_BYTE, Texture.TEMP_IMAGE_DATA);

            let asset: ImageAsset = AssetManager.getAsset(this.name) as ImageAsset;
            if (asset !== undefined) {
                this._loadTextureFromAsset(asset);
            }
        }

        public get name(): string {
            return this._name;
        }

        public get width(): number {
            return this._width;
        }

        public get height(): number {
            return this._height;
        }

        public destroy(): void {
            GL.deleteTexture(this._handle);
        }

        public activateAndBind(textureUnit: number = 0): void {
            GL.activeTexture(GL.TEXTURE0 + textureUnit);
            this.bind();
        }

        public bind(): void {
            GL.bindTexture(GL.TEXTURE_2D, this._handle);
        }

        public unbind(): void {
            GL.bindTexture(GL.TEXTURE_2D, undefined);
        }

        public onMessage(message: Message): void {
            if (message.code === `${Constants.MESSAGE_ASSET_LOADER_ASSET_LOADED}::${this._name}`) {
                this._loadTextureFromAsset(message.context as ImageAsset);
            }
        }

        private _loadTextureFromAsset(asset: ImageAsset): void {
            this._width = asset.width;
            this._height = asset.height;
            this.bind();
            GL.texImage2D(GL.TEXTURE_2D, Texture.LEVEL, GL.RGBA, this._width, this._height, Texture.BORDER, GL.RGBA, GL.UNSIGNED_BYTE, asset.data);

            this._isLoaded = true;
        }
    }
}