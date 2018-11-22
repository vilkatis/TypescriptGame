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
            AssetManager.initialize();

            this._shader = new BasicShader();
            this._shader.use();

            // Load materials
            MaterialManager.registerMaterial(new Material('crate', 'assets/textures/wood.jpg', new Color(255, 128, 0, 255)));

            // Load
            this._projection = Matrix4x4.orthographic(0, Canvas.width, Canvas.height, 0, -100.0, 100.0);

            this._sprite = new Sprite('test', 'crate');
            this._sprite.load();
            this._sprite.position.x = 200;

            this.resize();
            this._loop();
        }

        public resize() {
            Renderer.resizeCanvas();
            this._projection = Matrix4x4.orthographic(0, Canvas.width, Canvas.height, 0, -100.0, 100.0);
        }

        private _loop(): void {
            MessageBus.update(0);

            GL.clear(GL.COLOR_BUFFER_BIT);

            // Set uniforms.
            let projectionPosition: WebGLUniformLocation = this._shader.getUniformLocation('u_projection');
            GL.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));

            this._sprite.draw(this._shader);

            requestAnimationFrame(this._loop.bind(this));
        }
    }
}
