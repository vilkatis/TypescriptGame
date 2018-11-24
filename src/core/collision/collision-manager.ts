namespace Arch {

    export class CollisionManager {
        private static _components: CollisionComponent[] = [];
        private static _collisionData: CollisionData[] = [];
        private static _totalTime: number = 0;

        public static registerCollisionComponent(component: CollisionComponent): void {
            CollisionManager._components.push(component);
        }

        public static unRegisterCollisionComponent(component: CollisionComponent): void {
            const index: number = CollisionManager._components.indexOf(component);
            if (index !== -1) {
                CollisionManager._components.slice(index, 1);
            }
        }

        public static clear(): void {
            CollisionManager._components.length = 0;
        }

        public static update(time: number): void {
            CollisionManager._totalTime += time;
            for (const component of CollisionManager._components) {
                for (const other of CollisionManager._components) {
                    // Do not check against collisions with self.
                    if (component === other) continue;
                    if (component.shape.intersects(other.shape)) {
                        // We have a collision!
                        let exists: boolean = false;
                        for (const data of CollisionManager._collisionData) {
                            if ( (data.a === component && data.b === other) || (data.a === other && data.b === component)) {
                                // We have existing data. Update the data.
                                component.onCollisionUpdate(other);
                                other.onCollisionUpdate(component);
                                data.time = CollisionManager._totalTime;
                                exists = true;
                                break;
                            }
                        }
                        if (!exists) {
                            // Create a new collision.
                            const collision: CollisionData = new CollisionData(CollisionManager._totalTime, component, other);
                            component.onCollisionEntry(other);
                            other.onCollisionEntry(component);
                            Message.sendPriority(`${Constants.COLLISION_ENTRY}::${component.name}`, this, collision);
                            Message.sendPriority(`${Constants.COLLISION_ENTRY}::${other.name}`, this, collision);
                            this._collisionData.push(collision);
                        }
                    }
                }
            }

            // Remove stale collision data.
            const removeData: CollisionData[] = [];
            for (const data of CollisionManager._collisionData) {
                if (data.time !== CollisionManager._totalTime) {
                    // Old collision data
                    removeData.push(data);
                }
            }

            while (removeData.length !== 0) {
                const data: CollisionData = removeData.shift();
                const index: number = CollisionManager._collisionData.indexOf(data);
                CollisionManager._collisionData.splice(index, 1);
                data.a.onCollisionExit(data.b);
                data.b.onCollisionExit(data.a);
                Message.sendPriority(`${Constants.COLLISION_EXIT}::${data.a.name}`, this, data);
                Message.sendPriority(`${Constants.COLLISION_EXIT}::${data.b.name}`, this, data);
            }
        }
    }
}