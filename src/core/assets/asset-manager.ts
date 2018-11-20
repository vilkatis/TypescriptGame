import { IAssetLoader } from '../models/IAssetLoader';
import { IAsset } from '../models/IAsset';
import { Message } from '../message/message';
import { ImageAssetLoader } from './image-asset-loader';
import { Constants } from './constants';

export class AssetManager {
    private static _loaders: IAssetLoader[] = [];
    private static _loadedAssets: Record<string, IAsset> = {};
    public static initialize(): void {
        AssetManager._loaders.push( new ImageAssetLoader());
    }

    public static registerLoader(loader: IAssetLoader): void {
        AssetManager._loaders.push(loader);
    }

    public static onAssetLoaded(asset: IAsset): void {
        AssetManager._loadedAssets[asset.name] = asset;
        Message.send(`${Constants.MESSAGE_ASSET_LOADER_ASSET_LOADED}::${asset.name}`, this, asset);
    }

    public static loadAsset(assetName: string): void {
        let extension = assetName.split('.').pop().toLowerCase();
        for (let loader of AssetManager._loaders) {
            if (loader.supportedExtensions.indexOf(extension) !== -1) {
                loader.loadAsset(assetName);
                return;
            }
        }
        console.warn(`Unable to load asset with extension ${extension} because there is not loader associated with it.`)
    }

    public static isAssetLoaded(assetName: string): boolean {
        return AssetManager._loadedAssets[assetName] !== undefined;
    }

    public static getAsset(assetName: string): IAsset {
        if (AssetManager.isAssetLoaded(assetName)) {
            return AssetManager._loadedAssets[assetName];
        }
        AssetManager.loadAsset(assetName);
        return undefined;
    }
}