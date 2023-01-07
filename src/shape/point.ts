
export class Point {
  private readonly _xCoord: number;
  private readonly _yCoord: number;

  constructor(xCoord: number, yCoord: number) {
    this._xCoord = xCoord;
    this._yCoord = yCoord;
  }

  get x() { return this._xCoord; }
  get y() { return this._yCoord; }

}