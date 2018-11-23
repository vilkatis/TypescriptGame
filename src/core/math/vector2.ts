namespace Arch {
    /**
     * 2 Component Vector
     */
    export class Vector2 {
        public static get zero(): Vector2 {
            return new Vector2();
        }

        public static get one(): Vector2 {
            return new Vector2(1, 1);
        }

        /**
         * Create a new Vector2
         * @param x {number} The x component.
         * @param y {number} The y component.
         */
        public constructor(x: number = 0, y: number = 0) {
            this._x = x;
            this._y = y;
        }

        private _x: number;

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

        private _y: number;

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
         * Returns the data of this vector as a number array.
         * @returns {number[]}
         */
        public toArray(): [number, number] {
            return [this._x, this._y];
        }

        /**
         * Returns the data of this vector as a Float32Array.
         * @returns {Float32Array}
         */
        public toFloat32Array(): Float32Array {
            return new Float32Array(this.toArray());
        }

        public setFromJson(json: any): void {
            if (json.x !== undefined) {
                this._x = Number(json.x);
            }
            if (json.y !== undefined) {
                this._y = Number(json.y);
            }
        }

        public copyFrom(v: Vector2): void {
            this.x = v.x;
            this.y = v.y;
        }
    }
}
