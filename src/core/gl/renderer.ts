export class Renderer {
    private static _canvas: HTMLCanvasElement;
    private static _gl: WebGLRenderingContext;

    public static get gl(): WebGLRenderingContext {
        if (Renderer._gl) {
            return Renderer._gl;
        } else {
            throw new Error(`Renderer was not initialized`);
        }
    }

    public static get canvas(): HTMLCanvasElement {
        if (Renderer._canvas) {
            return Renderer._canvas;
        } else {
            throw new Error(`Renderer was not initialized`);
        }
    }

    public static initialize(canvasId: string) {
        if (canvasId) {
            Renderer._canvas = <HTMLCanvasElement>document.getElementById(canvasId);
            if (!Renderer._canvas) {
                throw new Error(`Cannot find a canvas element with the ID: ${canvasId}`);
            }
        } else {
            Renderer._canvas = <HTMLCanvasElement>document.createElement('canvas');
            document.body.append(Renderer._canvas);
        }

        Renderer._gl = Renderer._canvas.getContext('webgl');
        if (!Renderer._gl) {
            throw new Error('Unable to initialize WebGL');
        }

        Renderer.initCanvas();
    }


    public static initCanvas(): void {
        Renderer.resizeCanvas();
        Renderer._gl.clearColor(0, 0, 0, 1);
        Renderer._gl.clear(Renderer._gl.COLOR_BUFFER_BIT);
    }

    public static resizeCanvas(): void {
        Renderer._canvas.width = window.innerWidth;
        Renderer._canvas.height = window.innerHeight;
        Renderer._gl.viewport(0, 0, Renderer.canvas.width, Renderer.canvas.height)
    }
}
