namespace Arch {
    /**
     * Game Engine
     */

    export class Engine {
        private _shader: Shader;

        private _sprite: Sprite;

        private _projection: Matrix4x4;


        /**
         * Creates a new engine.
         */
        public constructor(canvasId?: string) {
            Renderer.initialize(canvasId);
        }

        /**
         * Starts up the engine
         */
        public start(): void {


            this._loadShaders();
            this._shader.use();

            // Load
            this._projection = Matrix4x4.orthographic(0, Canvas.width, 0, Canvas.height, -100.0, 100.0);

            this._sprite = new Sprite('test');
            this._sprite.load();
            this._sprite.position.x = 200;

            this.resize();
            this._loop();
        }

        public resize() {
            Renderer.resizeCanvas();
            this._projection = Matrix4x4.orthographic(0, Canvas.width, 0, Canvas.height, -100.0, 100.0);
        }

        private _loop(): void {
            GL.clear(GL.COLOR_BUFFER_BIT);

            // Set uniforms.
            let colorPosition: WebGLUniformLocation = this._shader.getUniformLocation('u_color');
            GL.uniform4f(colorPosition, 1, 0.5, 0, 1);

            let projectionPosition: WebGLUniformLocation = this._shader.getUniformLocation('u_projection');
            GL.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));

            let modelPosition: WebGLUniformLocation = this._shader.getUniformLocation('u_model');
            GL.uniformMatrix4fv(modelPosition, false, new Float32Array(Matrix4x4.translation(this._sprite.position).data));

            this._sprite.draw();


            requestAnimationFrame(this._loop.bind(this));
        }

        private _loadShaders(): void {
            let vertexShaderSource = `
            attribute vec3 a_position;
            
            uniform mat4 u_projection;
            uniform mat4 u_model;

            void main() {
                gl_Position = u_projection * u_model * vec4(a_position, 1.0);
            }`;

            let fragmentShaderSource = `
            precision mediump float;
            
            uniform vec4 u_color;

            void main() {
                gl_FragColor = u_color;
            }`;

            this._shader = new Shader('basic', vertexShaderSource, fragmentShaderSource);
        }
    }
}
