import { Renderer } from './renderer';

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
    private _attributes: IAttributeInfo[] = [];

    /**
     * Creates a new GL buffer.
     * @param elementSize The size of each element in this buffer.
     * @param dataType The data type of this buffer.
     * @param targetBufferType The buffer target type.
     * @param mode The drawing mode of this buffer.
     */
    public constructor(elementSize: number, dataType: number = Renderer.gl.FLOAT, targetBufferType : number = Renderer.gl.ARRAY_BUFFER, mode: number = Renderer.gl.TRIANGLES) {
        this._elementSize = elementSize;
        this._dataType = dataType;
        this._targetBufferType = targetBufferType;
        this._mode = mode;

        // Determine byte size
        switch (this._dataType) {
            case Renderer.gl.FLOAT:
            case Renderer.gl.INT:
            case Renderer.gl.UNSIGNED_INT:
                this._typeSize = 4;
                break;
            case Renderer.gl.SHORT:
            case Renderer.gl.UNSIGNED_SHORT:
                this._typeSize = 2;
                break;
            case Renderer.gl.BYTE:
            case Renderer.gl.UNSIGNED_BYTE:
                this._typeSize = 1;
                break;
            default:
                throw new Error(`Unrecognized data type: ${dataType.toString()}`)
        }
        this._stride = this._elementSize * this._typeSize;
        this._buffer = Renderer.gl.createBuffer();
    }

    public destroy(): void {
        Renderer.gl.deleteBuffer(this._buffer);
    }

    /**
     * Binds the buffer
     * @param normalized Indicates if the data should be normalized
     */
    public bind(normalized: boolean = false) {
        Renderer.gl.bindBuffer(this._targetBufferType, this._buffer);

        if (this._hasAttributeLocation) {
            for (let it of this._attributes) {
                Renderer.gl.vertexAttribPointer(it.location, it.size, this._dataType, normalized, this._stride , it.offset * this._typeSize);
                Renderer.gl.enableVertexAttribArray(it.location);
            }
        }
    }

    /**
     * Unbind the buffer.
     */
    public unbind(): void {
        for (let it of this._attributes) {
            Renderer.gl.disableVertexAttribArray(it.location);
        }
        Renderer.gl.bindBuffer(this._targetBufferType, undefined);
    }

    /**
     * Adds an attribute with the provided information to this buffer.
     * @param info The information to be added.
     */
    public addAttributeLocation(info: IAttributeInfo): void {
        this._hasAttributeLocation = true;
        this._attributes.push(info);
    }

    /**
     * Adds data to this buffer.
     * @param data
     */
    public pushBackData(data: number[]): void {
        this._data.push(...data);
    }

    /**
     * Uploads this buffer's data to the GPU
     */
    public upload():void {
        Renderer.gl.bindBuffer(this._targetBufferType, this._buffer);

        let bufferData: ArrayBufferView;
        switch(this._dataType) {
            case Renderer.gl.FLOAT:
                bufferData = new Float32Array(this._data);
                break;
            case Renderer.gl.INT:
                bufferData = new Int32Array(this._data);
                break;
            case Renderer.gl.UNSIGNED_INT:
                bufferData = new Uint32Array(this._data);
                break;
            case Renderer.gl.SHORT:
                bufferData = new Int16Array(this._data);
                break;
            case Renderer.gl.UNSIGNED_SHORT:
                bufferData = new Uint16Array(this._data);
                break;
            case Renderer.gl.BYTE:
                bufferData = new Int8Array(this._data);
                break;
            case Renderer.gl.UNSIGNED_BYTE:
                bufferData = new Uint8Array(this._data);
                break;
        }

        Renderer.gl.bufferData(this._targetBufferType, bufferData, Renderer.gl.STATIC_DRAW);
    }

    /**
     * Draws this buffer
     */
    public draw(): void {
        if (this._targetBufferType === Renderer.gl.ARRAY_BUFFER) {
            Renderer.gl.drawArrays(this._mode, 0 , this._data.length / this._elementSize);
        } else if (this._targetBufferType === Renderer.gl.ELEMENT_ARRAY_BUFFER) {
            Renderer.gl.drawElements(this._mode, this._data.length, this._dataType, 0);
        }
    }

}


/**
 * Represents the information needed for a GLBuffer attribute
 */
export interface IAttributeInfo {
    location: number;
    size: number;
    offset: number;
}
