import { Point } from "./point";
import { Triangle } from "./triangle";

export class Circle {

  public calculateCenter(pointA: Point, pointB: Point, pointC: Point): Point {
    // https://stackoverflow.com/questions/32861804/how-to-calculate-the-centre-point-of-a-circle-given-three-points

    const yDeltaOne = pointB.y - pointA.y;
    const xDeltaOne = pointB.x - pointA.x;
    const yDeltaTwo = pointC.y - pointB.y;
    const xDeltaTwo = pointC.x - pointB.x;

    const gradA = yDeltaOne / xDeltaOne;
    const gradB = yDeltaTwo / xDeltaTwo;

    const centerX = (gradA * gradB * (pointA.y - pointC.y) + gradB * (pointA.x + pointB.x) - gradA * (pointB.x+pointC.x)) / (2 * (gradB - gradA));
    const centerY = -1 * (centerX - (pointA.x + pointB.x) / 2) / gradA +  (pointA.y + pointB.y) / 2;

    return new Point(centerX, centerY);
  }

  public calculateRadius(circumferenceTriangle: Triangle, center: Point): number {
    // (x-a)^2 + (y-b)^2 = r^2
    let xTakeA = center.x - circumferenceTriangle.pointA.x;
    let yTakeB = center.y - circumferenceTriangle.pointA.y;

    let radiusSquared = Math.pow(xTakeA, 2) + Math.pow(yTakeB, 2);

    return Math.sqrt(radiusSquared);
  }

}