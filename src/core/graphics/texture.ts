import { Renderer } from '../gl/renderer';
import { Message } from '../message/message';
import { Constants } from '../assets/constants';
import { IMessageHandler } from '../models/IMessageHandler';
import { IAsset } from '../models/IAsset';
import { AssetManager } from '../assets/asset-manager';
import { ImageAsset } from '../assets/image-asset';

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

        this._handle = Renderer.gl.createTexture();

        Message.subscribe(`${Constants.MESSAGE_ASSET_LOADER_ASSET_LOADED}::${this._name}`, this);

        this.bind();

        Renderer.gl.texImage2D(Renderer.gl.TEXTURE_2D, Texture.LEVEL, Renderer.gl.RGBA, 1, 1, Texture.BORDER, Renderer.gl.RGBA, Renderer.gl.UNSIGNED_BYTE, Texture.TEMP_IMAGE_DATA);

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
        Renderer.gl.deleteTexture(this._handle);
    }

    public bind(): void {
        Renderer.gl.bindTexture(Renderer.gl.TEXTURE_2D, this._handle);
    }

    public unbind(): void {
        Renderer.gl.bindTexture(Renderer.gl.TEXTURE_2D, undefined);
    }

    public activeAndBind(textureUnit: number = 0): void {
        Renderer.gl.activeTexture(Renderer.gl.TEXTURE0 + textureUnit);
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
        Renderer.gl.texImage2D(Renderer.gl.TEXTURE_2D, Texture.LEVEL, Renderer.gl.RGBA, this._width, this._height, Texture.BORDER, Renderer.gl.RGBA, Renderer.gl.UNSIGNED_BYTE, asset.data);

        this._isLoaded = true;
    }
}