namespace Arch {
    /**
     * Renderer Shader
     */

    export abstract class Shader {

        private readonly _name: string;
        private _program: WebGLProgram;
        private _attributes: Record<string, number> = {};
        private _uniforms: Record<string, WebGLUniformLocation> = {};

        /**
         * Creates a new shader.
         * @param name {string} The name of the shader.
         */
        protected constructor(name: string) {
            this._name = name;
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
            GL.useProgram(this._program);
        }

        /**
         * Gets the location of an attribute with the provided name.
         * @param name The name of the attribute whose location to retrieve.
         */
        public getAttributeLocation(name: string): number {
            if (this._attributes[name] === undefined) {
                throw new Error(`Unable to find attribute named ${name} in shader name ${this._name}`);
            }
            return this._attributes[name];
        }

        /**
         * Gets the location of a uniform with the provided name.
         * @param name The name of the attribute whose location to retrieve.
         */
        public getUniformLocation(name: string): WebGLUniformLocation {
            if (this._uniforms[name] === undefined) {
                throw new Error(`Unable to find attribute named ${name} in shader name ${this._name}`);
            }
            return this._uniforms[name];
        }

        protected load(vertexSource: string, fragmentSource: string): void {
            const vertexShader = this._loadShader(vertexSource, GL.VERTEX_SHADER);
            const fragmentShader = this._loadShader(fragmentSource, GL.FRAGMENT_SHADER);

            this._createProgram(vertexShader, fragmentShader);

            this._detectAttributes();
            this._detectUniforms();
        }

        private _loadShader(source: string, shaderType: number): WebGLShader {
            const shader: WebGLShader = GL.createShader(shaderType);

            GL.shaderSource(shader, source);
            GL.compileShader(shader);
            const error: string | null = GL.getShaderInfoLog(shader).trim();
            if (error !== '') {
                throw new Error(`Error compiling shader ${this.name}: ${error}`);
            }
            return shader;
        }

        private _createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): void {
            this._program = GL.createProgram();

            GL.attachShader(this._program, vertexShader);
            GL.attachShader(this._program, fragmentShader);

            GL.linkProgram(this._program);

            const error : string | null = GL.getProgramInfoLog(this._program).trim();
            if (error) {
                throw new Error(`Error linking shader ${this._name}: ${error}`);
            }
        }

        private _detectAttributes(): void {
            const attributeCount: number = GL.getProgramParameter(this._program, GL.ACTIVE_ATTRIBUTES);
            for (let i = 0; i < attributeCount; ++i) {
                const info: WebGLActiveInfo = GL.getActiveAttrib(this._program, i);
                if (!info) {
                    break;
                }
                this._attributes[info.name] = GL.getAttribLocation(this._program, info.name);
            }
        }

        private _detectUniforms(): void {
            const uniformCount: number = GL.getProgramParameter(this._program, GL.ACTIVE_UNIFORMS);
            for (let i = 0; i < uniformCount; ++i) {
                const info: WebGLActiveInfo = GL.getActiveUniform(this._program, i);
                if (!info) {
                    break;
                }
                this._uniforms[info.name] = GL.getUniformLocation(this._program, info.name);
            }
        }
    }
}