namespace Arch {

    /**
     * Represents an JSON asset.
     */
    export class JsonAsset implements IAsset {
        public readonly name: string;
        public readonly data: any;

        /**
         * Create a new JSON asset.
         * @param name The name of this asset.
         * @param data The data of this asset.
         */
        public constructor(name: string, data: any) {
            this.name = name;
            this.data = data;
        }
    }
}