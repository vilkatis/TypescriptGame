namespace Arch {
    /**
     * Game Engine
     */

    export class Engine implements IMessageHandler {
        private _shader: Shader;
        private _projection: Matrix4x4;
        private _previousTime: number = 0;

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
            InputManager.initialize();
            ZoneManager.initialize();

            Message.subscribe(Constants.MOUSE_UP, this);
            GL.enable(GL.BLEND);
            GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);

            this._shader = new BasicShader();
            this._shader.use();

            // Load materials
            MaterialManager.registerMaterial(new Material('crate', 'assets/textures/wood.jpg', Color.white));
            MaterialManager.registerMaterial(new Material('duck', 'assets/textures/duck.png', Color.white));

            AudioManager.loadSoundFile('flap', 'assets/sounds/flap.mp3', false);

            // Load
            this._projection = Matrix4x4.orthographic(0, Canvas.width, Canvas.height, 0, -100.0, 100.0);

            // TODO change this to be read from a game configuration later.
            ZoneManager.changeZone(0);

            this.resize();
            this._loop();
        }

        public resize() {
            Renderer.resizeCanvas();
            this._projection = Matrix4x4.orthographic(0, Canvas.width, Canvas.height, 0, -100.0, 100.0);
        }

        public onMessage(message: Message): void {
            if (message.code === Constants.MOUSE_UP) {
                const context: MouseContext = message.context as MouseContext;
                document.title = `Pos: [${context.position.x}, ${context.position.y}]`;
                AudioManager.playSound('flap');
            }
        }

        private _loop(): void {
            this._update();
            this._render();
        }

        private _update(): void {
            const delta: number = performance.now() - this._previousTime;
            MessageBus.update(delta);
            ZoneManager.update(delta);
            CollisionManager.update(delta);

            this._previousTime = performance.now();
        }

        private _render(): void {
            GL.clear(GL.COLOR_BUFFER_BIT);
            ZoneManager.render(this._shader);
            // Set uniforms.
            const projectionPosition: WebGLUniformLocation = this._shader.getUniformLocation('u_projection');
            GL.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));
            requestAnimationFrame(this._loop.bind(this));
        }
    }
}
