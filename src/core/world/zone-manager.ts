namespace Arch {
    export class ZoneManager implements IMessageHandler {
        private static _globalZoneID: number = -1;
        // private static _zones: Record<string, Zone> = {};
        private static _registeredZones: Record<string, string> = {};
        private static _activeZone: Zone;
        private static _instance: ZoneManager;

        public static initialize(): void {
            ZoneManager._instance = new ZoneManager();
            // TEMPORARY
            ZoneManager._registeredZones[0] = 'assets/zones/testZone.json';
        }

        public static changeZone(id: number): void {
            if (ZoneManager._activeZone !== undefined) {
                ZoneManager._activeZone.onDeactivated();
                ZoneManager._activeZone.unload();
                ZoneManager._activeZone = undefined;
            }
            const registeredZoneName: string = ZoneManager._registeredZones[id];
            if (registeredZoneName !== undefined) {
                if (AssetManager.isAssetLoaded(registeredZoneName)) {
                    ZoneManager._loadZone(AssetManager.getAsset(registeredZoneName));
                } else {
                    Message.subscribe(`${Constants.MESSAGE_ASSET_LOADER_ASSET_LOADED}::${registeredZoneName}`, ZoneManager._instance);
                    AssetManager.loadAsset(registeredZoneName);
                }
            } else {
                throw new Error(`Zone id ${id} does not exist.`);
            }
        }

        public static update(time: number): void {
            if (ZoneManager._activeZone !== undefined) {
                ZoneManager._activeZone.update(time);
            }
        }

        public static render(shader: Shader): void {
            if (ZoneManager._activeZone !== undefined) {
                ZoneManager._activeZone.render(shader);
            }
        }

        public onMessage(message: Message): void {
            if (message.code.indexOf(Constants.MESSAGE_ASSET_LOADER_ASSET_LOADED) !== -1) {
                const asset: JsonAsset = message.context as JsonAsset;
                ZoneManager._loadZone(asset);
            }
        }

        private static _loadZone(asset: JsonAsset): void {
            const zoneData: any = asset.data;
            let zoneId: number;
            if (zoneData.id === undefined) {
                throw new Error('Zone file format exception: zone id not present.');
            } else {
                zoneId = Number(zoneData.id);
            }
            let zoneName: string;
            if (zoneData.name === undefined) {
                throw new Error('Zone file format exception: zone name not present.');
            } else {
                zoneName = String(zoneData.name);
            }
            let zoneDescription: string;
            if (zoneData.description !== undefined) {
                zoneDescription = String(zoneData.description);
            }
            ZoneManager._activeZone = new Zone(zoneId, zoneName, zoneDescription);
            ZoneManager._activeZone.initialize(zoneData);
            ZoneManager._activeZone.onActivated();
            ZoneManager._activeZone.load();
        }
    }
}
