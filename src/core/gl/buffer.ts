namespace Arch {

    export class Buffer {

        private _hasAttributeLocation: boolean = false;
        private _elementSize: number;
        private _stride: number;
        private _buffer: WebGLBuffer;

        private _targetBufferType: number;
        private _dataType: number;
        private _mode: number;
        private _typeSize: number;

        private _data: number[] = [];
        private _attributes: AttributeInfo[] = [];

        /**
         * Creates a new GL buffer.
         * @param dataType The data type of this buffer.
         * @param targetBufferType The buffer target type.
         * @param mode The drawing mode of this buffer.
         */
        public constructor(dataType: number = GL.FLOAT, targetBufferType: number = GL.ARRAY_BUFFER, mode: number = GL.TRIANGLES) {
            this._elementSize = 0;
            this._dataType = dataType;
            this._targetBufferType = targetBufferType;
            this._mode = mode;

            // Determine byte size
            switch (this._dataType) {
                case GL.FLOAT:
                case GL.INT:
                case GL.UNSIGNED_INT:
                    this._typeSize = 4;
                    break;
                case GL.SHORT:
                case GL.UNSIGNED_SHORT:
                    this._typeSize = 2;
                    break;
                case GL.BYTE:
                case GL.UNSIGNED_BYTE:
                    this._typeSize = 1;
                    break;
                default:
                    throw new Error(`Unrecognized data type: ${dataType.toString()}`);
            }
            this._buffer = GL.createBuffer();
        }

        public destroy(): void {
            GL.deleteBuffer(this._buffer);
        }

        /**
         * Binds the buffer
         * @param normalized Indicates if the data should be normalized
         */
        public bind(normalized: boolean = false) {
            GL.bindBuffer(this._targetBufferType, this._buffer);

            if (this._hasAttributeLocation) {
                for (const attribute of this._attributes) {
                    GL.vertexAttribPointer(attribute.location, attribute.size, this._dataType, normalized, this._stride, attribute.offset * this._typeSize);
                    GL.enableVertexAttribArray(attribute.location);
                }
            }
        }

        /**
         * Unbind the buffer.
         */
        public unbind(): void {
            for (const attribute of this._attributes) {
                GL.disableVertexAttribArray(attribute.location);
            }
            GL.bindBuffer(this._targetBufferType, undefined);
        }

        /**
         * Adds an attribute with the provided information to this buffer.
         * @param info The information to be added.
         */
        public addAttributeLocation(info: AttributeInfo): void {
            this._hasAttributeLocation = true;
            info.offset = this._elementSize;
            this._attributes.push(info);
            this._elementSize += info.size;
            this._stride = this._elementSize * this._typeSize;
        }

        /**
         * Replaces the current data in this buffer with the provided data.
         * @param data The data to be loaded in this buffer.
         */
        public setData(data: number[]): void {
            this.clearData();
            this.pushBackData(data);
        }

        /**
         * Adds data to this buffer.
         * @param data
         */
        public pushBackData(data: number[]): void {
            this._data.push(...data);
        }

        /**
         * Clears out all data in this buffer.
         */
        public clearData(): void {
            this._data.length = 0;
        }

        /**
         * Uploads this buffer's data to the GPU
         */
        public upload(): void {
            GL.bindBuffer(this._targetBufferType, this._buffer);

            let bufferData: ArrayBufferView;
            switch (this._dataType) {
                case GL.FLOAT:
                    bufferData = new Float32Array(this._data);
                    break;
                case GL.INT:
                    bufferData = new Int32Array(this._data);
                    break;
                case GL.UNSIGNED_INT:
                    bufferData = new Uint32Array(this._data);
                    break;
                case GL.SHORT:
                    bufferData = new Int16Array(this._data);
                    break;
                case GL.UNSIGNED_SHORT:
                    bufferData = new Uint16Array(this._data);
                    break;
                case GL.BYTE:
                    bufferData = new Int8Array(this._data);
                    break;
                case GL.UNSIGNED_BYTE:
                    bufferData = new Uint8Array(this._data);
                    break;
            }

            GL.bufferData(this._targetBufferType, bufferData, GL.STATIC_DRAW);
        }

        /**
         * Draws this buffer
         */
        public draw(): void {
            if (this._targetBufferType === GL.ARRAY_BUFFER) {
                GL.drawArrays(this._mode, 0, this._data.length / this._elementSize);
            } else if (this._targetBufferType === GL.ELEMENT_ARRAY_BUFFER) {
                GL.drawElements(this._mode, this._data.length, this._dataType, 0);
            }
        }

    }
}
