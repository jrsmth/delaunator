import { Delaunay } from '../../delaunay';
import { Triangle } from '../../shapes/triangle';
import each from 'jest-each';
import { Edge } from '../../shapes/edge';
import { Point } from '../../shapes/point';

describe('Triangle Tests', () => {
  it('should return a triangle that encompasses the entire point set', () => {
    // note: see ../resources/super-triangle.png
    // given
    const points = Delaunay.generatePoints(1000, 1000, 10);
    const innerWidth = Math.max(...points.map((pt) => pt.x));
    const innerHeight = Math.max(...points.map((pt) => pt.y));

    // when
    const result = Triangle.generateSuperTriangle(points);

    // then
    expect(result.pointA.x).toBeLessThan(-innerWidth);
    expect(result.pointA.y).toBeLessThan(-innerHeight);

    expect(result.pointB.x).toEqual(0);
    expect(result.pointB.y).toBeGreaterThan(2 * innerHeight);

    expect(result.pointC.x).toBeGreaterThan(2 * innerWidth);
    expect(result.pointC.y).toEqual(0);
  });

  each([
    // TODO: extract to fixture?
    [
      new Triangle(new Point(-1573.0000000000002, -694.1), new Point(0, 1388.2), new Point(3146.0000000000005, 0)),
      [
        new Triangle(new Point(1379, 605), new Point(1430, 631), new Point(1149, 282)),
        new Triangle(new Point(1379, 605), new Point(1149, 282), new Point(868, 377)),
        new Triangle(new Point(170, 316), new Point(1149, 282), new Point(868, 377)),
        new Triangle(new Point(170, 316), new Point(1149, 282), new Point(-1573.0000000000002, -694.1)),
      ],
      [
        new Triangle(new Point(1379, 605), new Point(1430, 631), new Point(1149, 282)),
        new Triangle(new Point(1379, 605), new Point(1149, 282), new Point(868, 377)),
        new Triangle(new Point(170, 316), new Point(1149, 282), new Point(868, 377)),
      ],
    ],
  ]).it(
    'should remove any triangle that shares a vertex with the super triangle',
    (superTriangle: Triangle, solnBefore: Triangle[], solnAfter: Triangle[]) => {
      // when
      const result = Triangle.discardSuperTriangle(solnBefore, superTriangle);

      // then
      expect(result).toEqual(solnAfter);
      // get a failing solution from lib and try to debug issue

      // TODO:
      // 813 349 388 265 2664.2 0    <---- this one belongs to the super triangle and should have been removed!
      // 813 349 388 265 662 569
      // 813 349 1211 529 777 614
      // 813 349 662 569 777 614
      // 5 points ^
    },
  );
});
