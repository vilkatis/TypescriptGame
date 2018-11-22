namespace Arch {
    export class Matrix4x4 {
        private readonly _data: number[] = [];

        private constructor() {
            this._data = [
                1.0, 0, 0, 0,
                0, 1.0, 0, 0,
                0, 0, 1.0, 0,
                0, 0, 0, 1.0
            ];
        }

        public get data(): number[] {
            return this._data;
        }

        public static identity(): Matrix4x4 {
            return new Matrix4x4();
        }

        public static orthographic(left: number, right: number, bottom: number, top: number, nearClip: number, farClip: number): Matrix4x4 {
            const m: Matrix4x4 = new Matrix4x4();

            const lr: number = 1.0 / (left - right);
            const bt: number = 1.0 / (bottom - top);
            const nf: number = 1.0 / (nearClip - farClip);

            m._data[0] = -2.0 * lr;
            m._data[5] = -2.0 * bt;
            m.data[10] = 2.0 * nf;

            m._data[12] = (left + right) * lr;
            m._data[13] = (top + bottom) * bt;
            m._data[14] = (farClip + nearClip) * nf;

            return m;
        }

        public static translation(position: Vector3): Matrix4x4 {
            const m: Matrix4x4 = new Matrix4x4();

            m._data[12] = position.x;
            m._data[13] = position.y;
            m._data[14] = position.z;

            return m;
        }

        public static rotationX(angleInRadians: number): Matrix4x4 {
            const m: Matrix4x4 = new Matrix4x4();
            const c: number = Math.cos(angleInRadians);
            const s: number = Math.sin(angleInRadians);
            m._data[5] = c;
            m._data[6] = s;
            m._data[9] = -s;
            m._data[10] = c;
            return m;
        }

        public static rotationY(angleInRadians: number): Matrix4x4 {
            const m: Matrix4x4 = new Matrix4x4();
            const c: number = Math.cos(angleInRadians);
            const s: number = Math.sin(angleInRadians);
            m._data[0] = c;
            m._data[2] = -s;
            m._data[8] = s;
            m._data[10] = c;
            return m;
        }

        public static rotationZ(angleInRadians: number): Matrix4x4 {
            const m: Matrix4x4 = new Matrix4x4();
            const c: number = Math.cos(angleInRadians);
            const s: number = Math.sin(angleInRadians);
            m._data[0] = c;
            m._data[1] = s;
            m._data[4] = -s;
            m._data[5] = c;
            return m;
        }

        public static rotationXYZ( xRadians: number, yRadians: number, zRadians: number ): Matrix4x4 {
            const rx: Matrix4x4 = Matrix4x4.rotationX( xRadians );
            const ry: Matrix4x4 = Matrix4x4.rotationY( yRadians );
            const rz: Matrix4x4 = Matrix4x4.rotationZ( zRadians );

            return Matrix4x4.multiply( Matrix4x4.multiply( rz, ry ), rx );
        }

        public static scale(scale: Vector3): Matrix4x4 {
            const m: Matrix4x4 = new Matrix4x4();
            m._data[0] = scale.x;
            m._data[5] = scale.y;
            m._data[10] = scale.z;
            return m;
        }

        public static multiply(a: Matrix4x4, b: Matrix4x4): Matrix4x4 {
            const m: Matrix4x4 = new Matrix4x4();
            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 4; col++) {
                    m._data[row * 4 + col] = b.at(row, 0) * a.at(0, col) + b.at(row, 1) * a.at(1, col) + b.at(row, 2) * a.at(2, col) + b.at(row, 3) * a.at(3, col);
                }
            }
            return m;
        }

        public at(row: number, col: number): number {
            return this._data[row * 4 + col];
        }

        public toFloat32Array(): Float32Array {
            return new Float32Array(this._data);
        }

        public copyFrom(matrix: Matrix4x4): void {
            for (let i: number = 0; i < 16; i++) {
                this._data[i] = matrix._data[i];
            }
        }
    }
}
