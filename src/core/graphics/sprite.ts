namespace Arch {
    export class Sprite {
        protected readonly _name: string;
        protected readonly _width: number;
        protected readonly _height: number;

        protected _origin: Vector3 = Vector3.zero;
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

        public get origin(): Vector3 {
            return this._origin;
        }

        public set origin(value: Vector3) {
            this._origin = value;
            this.recalculateVertices();
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
            this.calculateVertices();
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

        protected calculateVertices(): void {
            const minX: number = -this._width * this._origin.x;
            const maxX: number = this._width * (1.0 - this.origin.x);

            const minY: number = -this._height * this._origin.y;
            const maxY: number = this._height * (1.0 - this.origin.y);

            this._vertices = [
                new Vertex(minX, minY, 0, 0, 0),
                new Vertex(minX, maxY, 0, 0, 1.0),
                new Vertex(maxX, maxY, 0, 1.0, 1.0),
                new Vertex(maxX, maxY, 0, 1.0, 1.0),
                new Vertex(maxX, minY, 0, 1.0, 0),
                new Vertex(minX, minY, 0, 0, 0)
            ];
            for (const vertex of this._vertices) {
                this._buffer.pushBackData(vertex.toArray());
            }
            this._buffer.upload();
            this._buffer.unbind();
        }

        protected recalculateVertices(): void {
            const minX: number = -this._width * this._origin.x;
            const maxX: number = this._width * (1.0 - this.origin.x);

            const minY: number = -this._height * this._origin.y;
            const maxY: number = this._height * (1.0 - this.origin.y);

            this._vertices[0].position.set(minX, minY);
            this._vertices[1].position.set(minX, maxY);
            this._vertices[2].position.set(maxX, maxY);

            this._vertices[3].position.set(maxX, maxY);
            this._vertices[4].position.set(maxX, minY);
            this._vertices[5].position.set(minX, minY);

            this._buffer.clearData();
            for (const vertex of this._vertices) {
                this._buffer.pushBackData(vertex.toArray());
            }
            this._buffer.upload();
            this._buffer.unbind();
        }
    }
}
