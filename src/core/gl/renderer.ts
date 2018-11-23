namespace Arch {
    export var GL: WebGLRenderingContext;
    export var Canvas: HTMLCanvasElement;

    export class Renderer {
        public static initialize(canvasId: string) {
            if (canvasId) {
                Canvas = <HTMLCanvasElement>document.getElementById(canvasId);
                if (!Canvas) {
                    throw new Error(`Cannot find a canvas element with the ID: ${canvasId}`);
                }
            } else {
                Canvas = <HTMLCanvasElement>document.createElement('canvas');
                document.body.append(Canvas);
            }

            GL = Canvas.getContext('webgl');
            if (!GL) {
                throw new Error('Unable to initialize WebGL');
            }

            Renderer.initCanvas();
        }


        public static initCanvas(): void {
            Renderer.resizeCanvas();
            GL.clearColor(0, 0, 0.1, 1);
            GL.clear(GL.COLOR_BUFFER_BIT);
        }

        public static resizeCanvas(): void {
            Canvas.width = window.innerWidth;
            Canvas.height = window.innerHeight;
            GL.viewport(0, 0, Canvas.width, Canvas.height)
        }
    }
}
