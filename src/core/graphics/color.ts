namespace Arch {
    export class Color {
        public static get white(): Color {
            return new Color(255, 255, 255, 255);
        }
        public get r(): number {
            return this._r;
        }

        public get rFloat(): number {
            return this._r / 255;
        }

        public set r(value: number) {
            this._r = value;
        }

        public get g(): number {
            return this._g;
        }
        public get gFloat(): number {
            return this._g / 255;
        }

        public set g(value: number) {
            this._g = value;
        }

        public get b(): number {
            return this._b;
        }

        public get bFloat(): number {
            return this._b / 255;
        }

        public set b(value: number) {
            this._b = value;
        }

        public get a(): number {
            return this._a;
        }

        public get aFloat(): number {
            return this._a / 255;
        }

        public set a(value: number) {
            this._a = value;
        }
        private _r: number;
        private _g: number;
        private _b: number;
        private _a: number;

        public constructor(r: number = 255, g: number = 255, b: number = 255, a: number = 255) {
            this._r = r;
            this._g = g;
            this._b = b;
            this._a = a;
        }

        public toArray(): [number, number, number, number] {
            return [this._r, this._g, this._b, this._a];
        }


        public toFloatArray(): [number, number, number, number] {
            return [this._r / 255, this._g / 255, this._b / 255, this._a / 255];
        }

        public toFloat32Array(): Float32Array {
            return new Float32Array (this.toFloatArray());
        }
    }
}
