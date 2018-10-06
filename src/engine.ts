/**
 * Game Engine
 */
import { Renderer } from './core/gl/renderer';
import { Shader } from './core/gl/shader';
import { Sprite } from './core/graphics/sprite';

export class Engine {
    private _shader: Shader;

    private _sprite: Sprite;



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
        this._sprite = new Sprite('test');
        this._sprite.load();

        this.resize();
        this._loop();
    }

    public resize() {
        Renderer.resizeCanvas();
    }

    private _loop(): void {
        Renderer.gl.clear(Renderer.gl.COLOR_BUFFER_BIT);

        // Set uniforms.
        let colorPosition = this._shader.getUniformLocation('u_color');
        Renderer.gl.uniform4f(colorPosition, 1, 0.5, 0, 1);

        this._sprite.draw();


        requestAnimationFrame(this._loop.bind(this));
    }

    private _loadShaders(): void {
        let vertexShaderSource = `
            attribute vec3 a_position;

            void main() {
                gl_Position = vec4(a_position, 1.0);
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
