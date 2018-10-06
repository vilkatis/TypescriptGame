/**
 * Game Engine
 */
import { Renderer } from './core/gl/renderer';
import { Shader } from './core/gl/shader';
import { Sprite } from './core/graphics/sprite';
import { Matrix4x4 } from './core/math/matrix4x4';

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
        this._projection = Matrix4x4.orthographic(0,Renderer.canvas.width, 0, Renderer.canvas.height, -1.0, 100.0);

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

        let projectionPosition = this._shader.getUniformLocation('u_projection');
        Renderer.gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));

        this._sprite.draw();


        requestAnimationFrame(this._loop.bind(this));
    }

    private _loadShaders(): void {
        let vertexShaderSource = `
            attribute vec3 a_position;
            
            uniform mat4 u_projection;
            uniform mat4 u_model;

            void main() {
                gl_Position = u_projection * vec4(a_position, 1.0);
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
