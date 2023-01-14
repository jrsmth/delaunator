import { Triangle } from './triangle';
import { Circle } from './circle';

export class Point {
  private readonly _xCoord: number;
  private readonly _yCoord: number;

  constructor(xCoord: number, yCoord: number) {
    this._xCoord = xCoord;
    this._yCoord = yCoord;
  }

  get x() {
    return this._xCoord;
  }
  get y() {
    return this._yCoord;
  }

  public isWithinCircumcircle(circumferenceTriangle: Triangle): boolean {
    let circumcircle = new Circle();

    let center = circumcircle.calculateCenter(
      circumferenceTriangle.pointA,
      circumferenceTriangle.pointB,
      circumferenceTriangle.pointC
    );

    let radius = circumcircle.calculateRadius(circumferenceTriangle, center);

    let dx = center.x - this.x;
    let dy = center.y - this.y;

    return (Math.pow((dy), 2) + Math.pow((dx), 2) <= Math.pow((radius), 2));
  }
}
