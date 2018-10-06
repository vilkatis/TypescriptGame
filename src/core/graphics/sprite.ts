import { Buffer } from '../gl/buffer';
import { IAttributeInfo } from '../models/IAttributeInfo';
import { Vector3 } from '../math/vector3';

export class Sprite {
    public position: Vector3 = new Vector3();

    private readonly _name: string;
    private readonly _width: number;
    private readonly _height: number;

    private _buffer: Buffer;

    public constructor(name: string, width: number = 100, height: number = 100) {
        this._name = name;
        this._width = width;
        this._height = height;
    }

    public load(): void {
        this._buffer = new Buffer(3);

        let positionAttribute: IAttributeInfo = {
            location: 0,
            offset: 0,
            size: 3
        };

        this._buffer.addAttributeLocation(positionAttribute);

        let vertices = [
            // x, y, z
            0, 0, 0,
            0, this._height, 0,
             this._width, this._height, 0,

            this._width, this._height, 0,
            this._width, 0, 0,
            0, 0, 0
        ];

        this._buffer.pushBackData(vertices);
        this._buffer.upload();
        this._buffer.unbind();
    }

    public update(time: number): void {

    }

    public draw(): void {
        this._buffer.bind();
        this._buffer.draw();
    }
}