namespace Arch {
    export class ImageAssetLoader implements IAssetLoader {
        public get supportedExtensions(): string[] {
            return ['png', 'gif', 'jpg'];
        }

        public loadAsset(assetName: string): void {
            const image: HTMLImageElement = new Image();
            image.onload = this._onImageLoaded.bind(this, assetName, image);
            image.src = assetName;
        }

        private _onImageLoaded(assetName: string, image: HTMLImageElement): void {
            console.log(`onImageLoaded: assetName ${assetName}, image ${image}`);
            let asset: ImageAsset = new ImageAsset(assetName, image);
            AssetManager.onAssetLoaded(asset);
        }

    }
}
