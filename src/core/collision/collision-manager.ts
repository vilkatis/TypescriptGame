namespace Arch {
    class CollisionData {
        public a: CollisionComponent;
        public b: CollisionComponent;
        public time: number;

        public constructor(time: number, a: CollisionComponent, b: CollisionComponent) {
            this.a = a;
            this.b = b;
            this.time = time;
        }
    }
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
                            component.onCollisionEntry(other);
                            other.onCollisionEntry(component);
                            console.log('Component', component);
                            console.log('Other', other);
                            this._collisionData.push(new CollisionData(CollisionManager._totalTime, component, other));
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
            }

            // TODO: REMOVE ME
            document.title = CollisionManager._collisionData.length.toString(10);
        }
    }
}