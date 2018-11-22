namespace Arch {
    /**
     * Represents an JSON asset loader.
     */
    export class JsonAssetLoader implements IAssetLoader {
        /**
         * Get the extensions supported by this asset loader.
         */
        public get supportedExtensions(): string[] {
            return ['json'];
        }

        /**
         * Loads an asset with the given name.
         * @param assetName
         */
        public loadAsset(assetName: string): void {
            const request: XMLHttpRequest = new XMLHttpRequest();
            request.open('GET', assetName);
            request.addEventListener('load', this._onJsonLoaded.bind(this, assetName, request));
            request.send();
        }

        private _onJsonLoaded(assetName: string, request: XMLHttpRequest): void {
            console.log(`onJsonLoaded: assetName ${assetName}, request ${request}`);
            if (request.readyState === request.DONE) {
                const json: any = JSON.parse(request.responseText);
                const asset: JsonAsset = new JsonAsset(assetName, json);
                AssetManager.onAssetLoaded(asset);
            }
        }

    }
}
