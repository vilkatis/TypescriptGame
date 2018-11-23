namespace Arch {
    export class Circle2D implements IShape2D {
        public position: Vector2 = Vector2.zero;
        public origin: Vector2 = Vector2.zero;
        public radius: number;

        public get offset(): Vector2 {
            return new Vector2(this.radius + (this.radius * this.origin.x), this.radius + (this.radius * this.origin.y));
        }

        public setFromJson(json: any): void {
            if (json.position !== undefined) {
                this.position.setFromJson(json.position);
            }
            if (json.offset !== undefined) {
                this.offset.setFromJson(json.offset);
            }
            if (json.radius === undefined) {
                throw new Error('Circle2D requires radius to be present.');
            } else {
                this.radius = Number(json.radius);
            }
        }

        public intersects(other: IShape2D): boolean {
            if (other instanceof Circle2D) {
                const distance: number = Math.abs(Vector2.distance(other.position, this.position));
                const radiusLengths: number = this.radius + other.radius;
                if (distance <= radiusLengths ) return true;
            }

            if (other instanceof Rectangle2D) {
                const deltaX: number = this.position.x - Math.max(other.position.x, Math.min(this.position.x, other.position.x + other.width));
                const deltaY: number = this.position.y - Math.max(other.position.y, Math.min(this.position.y, other.position.y + other.height));
                if ((deltaX * deltaX + deltaY * deltaY) < (this.radius * this.radius)) {
                    return true;
                }
            }
            return false;
        }

        public pointInShape(point: Vector2): boolean {
            const absDistance: number = Math.abs(Vector2.distance(this.position, point));
            return absDistance <= this.radius;
        }
    }
}
