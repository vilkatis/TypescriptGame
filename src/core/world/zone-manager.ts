namespace Arch {
    export class ZoneManager {
        private static _globalZoneID: number = -1;
        private static _zones: Record<string, Zone> = {};
        private static _activeZone: Zone;

        public static createZone(name: string, description: string): number {
            ZoneManager._globalZoneID++;
            ZoneManager._zones[ZoneManager._globalZoneID] = new Zone(ZoneManager._globalZoneID, name, description);
            return ZoneManager._globalZoneID;
        }

        // TODO temporary until file load
        public static createTestZone(): number {
            ZoneManager._globalZoneID++;
            ZoneManager._zones[ZoneManager._globalZoneID] = new TestZone(ZoneManager._globalZoneID, 'test', 'A simple test zone');
            return ZoneManager._globalZoneID;
        }

        public static changeZone(id: number): void {
            if (ZoneManager._activeZone !== undefined) {
                ZoneManager._activeZone.onDeactivated();
                ZoneManager._activeZone.unload();
            }
            if (ZoneManager._zones[id] !== undefined) {
                ZoneManager._activeZone = ZoneManager._zones[id];
                ZoneManager._activeZone.onActivated();
                ZoneManager._activeZone.load();
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
    }
}
