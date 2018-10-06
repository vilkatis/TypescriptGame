/**
 * Game Engine
 */
import { Renderer } from './core/gl/renderer';
import { Shader } from './core/gl/shader';
import { Buffer } from './core/gl/buffer';
import { IAttributeInfo } from './core/gl/buffer';

export class Engine {
    private _shader: Shader;

    private _buffer: Buffer;


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

        this._createBuffer();

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

        this._buffer.bind();
        this._buffer.draw();

        requestAnimationFrame(this._loop.bind(this));
    }

    private _createBuffer(): void {
        this._buffer = new Buffer(3);

        let positionAttribute: IAttributeInfo = {
            location: this._shader.getAttributeLocation('a_position'),
            offset: 0,
            size: 3
        };

        this._buffer.addAttributeLocation(positionAttribute);

        let vertices = [
            // x, y, z
            0, 0, 0,
            0, 0.5, 0,
            0.5, 0.5, 0
        ];

        this._buffer.pushBackData(vertices);
        this._buffer.upload();
        this._buffer.unbind();
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
