import { Triangle } from '../shape/triangle';
import { Point } from '../shape/point';
import each from "jest-each";

describe("Point Tests", () => {

  each([
    [new Point(2, 10), new Triangle(new Point(-6, 0), new Point(2, 16), new Point(10, 0)), true],
    [new Point(0, 20), new Triangle(new Point(9, 0), new Point(0, 15), new Point(-8, -17)), false]
  ]).it('should determine if point [%s] lies within a given triangle\'s circumcircle', (point: Point, triangle: Triangle, withinCircumcircle: boolean) => {

    // when
    let result = point.isWithinCircumcircle(triangle);

    // then
    expect(result).toEqual(withinCircumcircle);
  })

});