namespace Arch {
    /**
     * 3 Component Vector
     */
    export class Vector3 {

        private _x: number;
        private _y: number;
        private _z: number;

        public static distance(a: Vector3, b: Vector3): number {
            const diff: Vector3 = a.clone().substract(b);
            return Math.sqrt(diff.x * diff.x + diff.y * diff.y + diff.z * diff.z);
        }

        /**
         * Create a new Vector3
         * @param x {number} The x component.
         * @param y {number} The y component.
         * @param z {number} The z component.
         */
        public constructor(x: number = 0, y: number = 0, z: number = 0) {
            this._x = x;
            this._y = y;
            this._z = z;
        }

        /**
         * Getter for x component.
         * @returns {number}
         */
        public get x(): number {
            return this._x;
        }

        /**
         * Setter for x component.
         */
        public set x(x: number) {
            this._x = x;
        }

        /**
         * Getter for y component.
         * @returns {number}
         */
        public get y(): number {
            return this._y;
        }

        /**
         * Setter for y component.
         */
        public set y(y: number) {
            this._y = y;
        }

        /**
         * Getter for z component.
         * @returns {number}
         */
        public get z(): number {
            return this._z;
        }

        /**
         * Setter for z component.
         */
        public set z(z: number) {
            this._z = z;
        }

        public static get zero(): Vector3 {
            return new Vector3();
        }

        public static get one(): Vector3 {
            return new Vector3(1, 1, 1);
        }

        public set(x?: number, y?: number, z?: number): void {
            if (x !== undefined) this._x = x;
            if (y !== undefined) this._y = y;
            if (z !== undefined) this._z = z;
        }

        public equals(v: Vector3): boolean {
            return (this._x === v.x && this._y === v.y && this._z === v.z);
        }

        /**
         * Returns the data of this vector as a number array.
         * @returns {number[]}
         */
        public toArray(): [number, number, number] {
            return [this._x, this._y, this._z];
        }

        /**
         * Returns the data of this vector as a Float32Array.
         * @returns {Float32Array}
         */
        public toFloat32Array(): Float32Array {
            return new Float32Array(this.toArray());
        }

        public copyFrom(vector: Vector3): void {
            this._x = vector.x;
            this._y = vector.y;
            this._z = vector.z;
        }

        public setFromJson(json: any): void {
            if (json.x !== undefined) {
                this._x = Number(json.x);
            }
            if (json.y !== undefined) {
                this._y = Number(json.y);
            }
            if (json.z !== undefined) {
                this._z = Number(json.z);
            }
        }

        public add(v: Vector3): Vector3 {
            this._x += v.x;
            this._y += v.y;
            this._z += v.z;
            return this;
        }

        public substract(v: Vector3): Vector3 {
            this._x -= v.x;
            this._y -= v.y;
            this._z -= v.z;
            return this;
        }

        public multiply(v: Vector3): Vector3 {
            this._x *= v.x;
            this._y *= v.y;
            this._z *= v.z;
            return this;
        }

        public divide(v: Vector3): Vector3 {
            this._x /= v.x;
            this._y /= v.y;
            this._z /= v.z;
            return this;
        }

        public clone(): Vector3 {
            return new Vector3(this._x, this._y, this._z);
        }

        public toVector2(): Vector2 {
            return new Vector2(this._x, this._y);
        }
    }
}
