export class Circle {
    private _x: number = 0;
    private _y: number = 0;
    private _radius: number = 10;
    private _lineWidth: number = 2;
    private _color: string = 'red';

    public constructor(x: number, y: number, radius: number, lineWidth: number = 2, color: string = 'red') {
        this._x = x;
        this._y = y;
        this._radius = radius;
        this._color = color;
        this._lineWidth = lineWidth;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this._color;
        ctx.lineWidth = this._lineWidth;
        ctx.arc(this._x, this._y, this._radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    }
}
