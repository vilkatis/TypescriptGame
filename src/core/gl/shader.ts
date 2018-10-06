/**
 * Renderer Shader
 */
import { Renderer } from './renderer';

export class Shader {

    private readonly _name: string;
    private _program: WebGLProgram;
    private _attributes: { [name: string]: number } = {};

    /**
     * Creates a new shader.
     * @param name {string} The name of the shader.
     * @param vertexSource {string} The source of the vertex shader.
     * @param fragmentSource {string} The source of the fragment shader.
     */
    public constructor(name: string, vertexSource: string, fragmentSource: string) {
        this._name = name;
        let vertexShader = this._loadShader(vertexSource, Renderer.gl.VERTEX_SHADER);
        let fragmentShader = this._loadShader(fragmentSource, Renderer.gl.FRAGMENT_SHADER);

        this._createProgram(vertexShader, fragmentShader);

        this._detectAttributes();
    }

    /**
     * Getter the name of the shader
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Use this shader.
     */
    public use(): void {
        Renderer.gl.useProgram(this._program);
    }

    /**
     * Gets the location of an attribute with the provided name.
     * @param name The name of the attribute whose location to retrieve.
     */
    public getAttributeLocation(name :string ): number {
        if (this._attributes[name] === undefined) {
            throw new Error(`Unable to find attribute named ${name} in shader name ${this._name}`);
        }
        return this._attributes[name];
    }

    protected load(vertexSource: string, fragmentSource: string): void {
        let vertexShader = this._loadShader(vertexSource, Renderer.gl.VERTEX_SHADER);
        let fragmentShader = this._loadShader(fragmentSource, Renderer.gl.FRAGMENT_SHADER);

        this._createProgram(vertexShader, fragmentShader);

        this._detectAttributes();
    }

    private _loadShader(source: string, shaderType: number): WebGLShader {
        let shader: WebGLShader = Renderer.gl.createShader(shaderType);


        Renderer.gl.shaderSource(shader, source);
        Renderer.gl.compileShader(shader);
        let error = Renderer.gl.getShaderInfoLog(shader);
        if (error) {
            throw new Error(`Error compiling shader: ${error}`);
        }
        return shader;
    }

    private _createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): void {
        this._program = Renderer.gl.createProgram();

        Renderer.gl.attachShader(this._program, vertexShader);
        Renderer.gl.attachShader(this._program, fragmentShader);

        Renderer.gl.linkProgram(this._program);

        let error = Renderer.gl.getProgramInfoLog(this._program);
        if (error) {
            throw new Error(`Error linking shader ${this._name}: ${error}`);
        }
    }

    private _detectAttributes(): void {
        let attributeCount: number = Renderer.gl.getProgramParameter(this._program, Renderer.gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < attributeCount; ++i) {
            let info: WebGLActiveInfo = Renderer.gl.getActiveAttrib(this._program, i);
            if (!info) {
                break;
            }
            this._attributes[info.name] = Renderer.gl.getAttribLocation(this._program, info.name );
        }
    }
}
