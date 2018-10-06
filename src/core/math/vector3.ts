/**
 * 3 Component Vector
 */
export class Vector3 {

    private _x: number;
    private _y: number;
    private _z: number;

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

    /**
     * Returns the data of this vector as a number array.
     * @returns {number[]}
     */
    public toArray(): number[] {
        return [this._x, this._y, this._z];
    }

    /**
     * Returns the data of this vector as a Float32Array.
     * @returns {Float32Array}
     */
    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toArray());
    }
}