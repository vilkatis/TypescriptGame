namespace Arch {
    export let GL: WebGLRenderingContext;
    export let Canvas: HTMLCanvasElement;

    export class Renderer {
        public static width: number;
        public static height: number;
        public static initialize(canvasId?: string, width?: number, height?: number) {
            if (canvasId) {
                Canvas = document.getElementById(canvasId) as HTMLCanvasElement;
                if (!Canvas) {
                    throw new Error(`Cannot find a canvas element with the ID: ${canvasId}`);
                }
            } else {
                Canvas = document.createElement('canvas') as HTMLCanvasElement;
                document.body.append(Canvas);
            }
            if (width && height) {
                this.width = width;
                this.height = height;
                Canvas.style.width = `${width}px`;
                Canvas.style.height = `${height}px`;
                Canvas.width = width;
                Canvas.height = height;
            }

            GL = Canvas.getContext('webgl');
            if (!GL) {
                throw new Error('Unable to initialize WebGL');
            }

            Renderer.initCanvas();
        }


        public static initCanvas(): void {
            Renderer.resizeCanvas();
            GL.clearColor(156 / 255, 206 / 255, 247 / 255, 1);
            GL.clear(GL.COLOR_BUFFER_BIT);
        }

        public static resizeCanvas(): void {
            if (Renderer.width === undefined || Renderer.height === undefined) {
                Canvas.width = window.innerWidth;
                Canvas.height = window.innerHeight;
            }
            GL.viewport(0, 0, Canvas.width, Canvas.height);
        }
    }
}
