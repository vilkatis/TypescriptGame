namespace Arch {
    export class Sprite {
        public position: Vector3 = new Vector3();

        private readonly _name: string;
        private readonly _width: number;
        private readonly _height: number;
        private readonly _textureName: string;

        private _buffer: Buffer;
        private _texture: Texture;

        /**
         * Creates a new sprite.
         * @param name The name of this sprite;
         * @param textureName The name of the texture to use with this sprite.
         * @param width The width of this sprite.
         * @param height The height of this sprite.
         */
        public constructor(name: string, textureName: string, width: number = 100, height: number = 100) {
            this._name = name;
            this._width = width;
            this._height = height;
            this._textureName = textureName;
            this._texture = TextureManager.getTexture(textureName);
        }

        public get name(): string {
            return this._name;
        }

        public destroy(): void {
            this._buffer.destroy();
            TextureManager.releaseTexture(this._textureName);
        }

        public load(): void {
            this._buffer = new Buffer(5);

            let positionAttribute: IAttributeInfo = {
                location: 0,
                offset: 0,
                size: 3
            };

            this._buffer.addAttributeLocation(positionAttribute);

            let texCoordAttribute: IAttributeInfo = {
                location: 1,
                offset: 3,
                size: 2
            };

            this._buffer.addAttributeLocation(texCoordAttribute);

            let vertices = [
                // x, y, z, u, v
                0, 0, 0, 0, 0,
                0, this._height, 0, 0, 1.0,
                this._width, this._height, 0, 1.0, 1.0,
                this._width, this._height, 0, 1.0, 1.0,
                this._width, 0, 0, 1.0, 0,
                0, 0, 0, 0, 0
            ];

            this._buffer.pushBackData(vertices);
            this._buffer.upload();
            this._buffer.unbind();
        }

        public update(time: number): void {

        }

        public draw(shader: Shader): void {
            let modelPosition: WebGLUniformLocation = shader.getUniformLocation('u_model');
            GL.uniformMatrix4fv(modelPosition, false, new Float32Array(Matrix4x4.translation(this.position).data));

            let colorLocation: WebGLUniformLocation = shader.getUniformLocation('u_tint');
            GL.uniform4f(colorLocation, 1, 0.5, 0, 1);

            this._texture.activateAndBind(0);
            let diffuseLocation: WebGLUniformLocation = shader.getUniformLocation('u_diffuse');
            GL.uniform1i(diffuseLocation, 0);

            this._buffer.bind();
            this._buffer.draw();
        }
    }
}