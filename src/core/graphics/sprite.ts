namespace Arch {
    export class Sprite {
        protected readonly _name: string;
        protected readonly _width: number;
        protected readonly _height: number;
        protected _materialName: string;

        protected _buffer: Buffer;
        protected _material: Material;
        protected _vertices: Vertex[] = [];

        /**
         * Creates a new sprite.
         * @param name The name of this sprite;
         * @param materialName The name of the material to use with this sprite.
         * @param width The width of this sprite.
         * @param height The height of this sprite.
         */
        public constructor(name: string, materialName: string, width: number = 100, height: number = 100) {
            this._name = name;
            this._width = width;
            this._height = height;
            this._materialName = materialName;
            this._material = MaterialManager.getMaterial(materialName);
        }

        public get name(): string {
            return this._name;
        }

        public destroy(): void {
            this._buffer.destroy();
            MaterialManager.releaseMaterial(this._materialName);
            this._material = undefined;
            this._materialName = undefined;
        }

        public load(): void {
            this._buffer = new Buffer();

            const positionAttribute: AttributeInfo = new AttributeInfo();
            positionAttribute.location = 0;
            positionAttribute.size = 3;
            this._buffer.addAttributeLocation(positionAttribute);

            const texCoordAttribute: AttributeInfo = new AttributeInfo();
            texCoordAttribute.location = 1;
            texCoordAttribute.size = 2;
            this._buffer.addAttributeLocation(texCoordAttribute);

            this._vertices = [
                new Vertex(0, 0, 0, 0, 0),
                new Vertex(0, this._height, 0, 0, 1.0),
                new Vertex(this._width, this._height, 0, 1.0, 1.0),
                new Vertex(this._width, this._height, 0, 1.0, 1.0),
                new Vertex(this._width, 0, 0, 1.0, 0),
                new Vertex(0, 0, 0, 0, 0)
            ];
            for (const vertex of this._vertices) {
                this._buffer.pushBackData(vertex.toArray());
            }
            this._buffer.upload();
            this._buffer.unbind();
        }

        public update(time: number): void {
        }

        public draw(shader: Shader, model: Matrix4x4): void {
            const modelLocation: WebGLUniformLocation = shader.getUniformLocation('u_model');
            GL.uniformMatrix4fv(modelLocation, false, model.toFloat32Array());

            const colorLocation: WebGLUniformLocation = shader.getUniformLocation('u_tint');
            GL.uniform4fv(colorLocation, this._material.tint.toFloat32Array());

            if (this._material.diffuseTexture !== undefined) {
                this._material.diffuseTexture.activateAndBind(0);
                const diffuseLocation: WebGLUniformLocation = shader.getUniformLocation('u_diffuse');
                GL.uniform1i(diffuseLocation, 0);
            }

            this._buffer.bind();
            this._buffer.draw();
        }
    }
}
