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
    const circumcircle = new Circle();

    const center = circumcircle.calculateCenter(
      circumferenceTriangle.pointA,
      circumferenceTriangle.pointB,
      circumferenceTriangle.pointC
    );

    const radius = circumcircle.calculateRadius(circumferenceTriangle, center);

    const dx = center.x - this.x;
    const dy = center.y - this.y;

    return (Math.pow((dy), 2) + Math.pow((dx), 2) <= Math.pow((radius), 2));
  }
}
