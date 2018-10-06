export class Renderer {
    private static _canvas: HTMLCanvasElement;
    private static _gl: WebGLRenderingContext;

    public static get gl(): WebGLRenderingContext {
        if (this._gl) {
            return this._gl;
        } else {
            throw new Error(`Renderer was not initialized`);
        }
    }

    public static get canvas(): HTMLCanvasElement {
        if (this._canvas) {
            return this._canvas;
        } else {
            throw new Error(`Renderer was not initialized`);
        }
    }

    public static initialize(canvasId: string) {
        if (canvasId) {
            this._canvas = <HTMLCanvasElement>document.getElementById(canvasId);
            if (!this._canvas) {
                throw new Error(`Cannot find a canvas element with the ID: ${canvasId}`);
            }
        } else {
            this._canvas = <HTMLCanvasElement>document.createElement('canvas');
            document.body.append(this._canvas);
        }

        this._canvas.style.position = 'absolute';
        this._canvas.style.width = '100vw';
        this._canvas.style.height = '100vh';
        this._canvas.style.top = '0';
        this._canvas.style.bottom = '0';
        this._canvas.style.left = '0';
        this._canvas.style.right = '0';

        this._gl = this._canvas.getContext('webgl');
        if (!this._gl) {
            throw new Error('Unable to initialize WebGL');
        }

        this.initCanvas();
    }


    public static initCanvas(): void {
        this.resizeCanvas();
        this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
        this._gl.clearColor(0, 0, 0, 1);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT);
    }

    public static resizeCanvas(): void {
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
    }
}
