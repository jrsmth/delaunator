import each from 'jest-each';
import { Point } from '../../shapes/point';
import { Circle } from '../../shapes/circle';
import { Triangle } from '../../shapes/triangle';

describe('Circle Tests', () => {
  each([
    [new Point(2, 6), new Point(-6, 0), new Point(2, 16), new Point(10, 0)],
    [new Point(-8, 0), new Point(9, 0), new Point(0, 15), new Point(-8, -17)],
    [new Point(3, 7), new Point(0, 3), new Point(3, 2), new Point(8, 7)],
  ]).it(
    'should find the center [%s] of the circle given three points on its circumference',
    (center, pointA, pointB, pointC) => {
      // given
      let circle = new Circle();

      // when
      let result = circle.calculateCenter(pointA, pointB, pointC);

      // then
      expect(result).toMatchObject(center);
    },
  );

  each([
    [10, new Point(2, 6), new Point(-6, 0), new Point(2, 16), new Point(10, 0)],
    [17, new Point(-8, 0), new Point(9, 0), new Point(0, 15), new Point(-8, -17)],
    [5, new Point(3, 7), new Point(0, 3), new Point(3, 2), new Point(8, 7)],
  ]).it(
    'should find circle radius [%s] given its center and three points on the circumference',
    (radius, center, pointA, pointB, pointC) => {
      // given
      let circle = new Circle();
      let triangle = new Triangle(pointA, pointB, pointC);

      // when
      let result = circle.calculateRadius(triangle, center);

      // then
      expect(result).toEqual(radius);
    },
  );
});
