namespace Arch {
    export class CollisionData {
        public a: CollisionComponent;
        public b: CollisionComponent;
        public time: number;

        public constructor(time: number, a: CollisionComponent, b: CollisionComponent) {
            this.a = a;
            this.b = b;
            this.time = time;
        }
    }
}
