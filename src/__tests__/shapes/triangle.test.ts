import { Delaunay } from '../../delaunay';
import { Triangle } from '../../shapes/triangle';

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

  it('should remove any triangle that shares a vertex with the super triangle', () => {
    // given
    const points = Delaunay.generatePoints(1000, 1000, 4);
    const superTriangle = Triangle.generateSuperTriangle(points);

    // construct a dummy solution
    let dummyTriangleOne = new Triangle(superTriangle.pointA, points[0], points[1]);
    let dummyTriangleTwo = new Triangle(superTriangle.pointB, points[1], points[2]);
    let dummyTriangleThree = new Triangle(superTriangle.pointC, points[2], points[3]);
    let dummyTriangleFour = new Triangle(points[1], points[3], points[1]);
    let dummyTriangleFive = new Triangle(points[0], points[2], points[1]);

    let solution = [dummyTriangleOne, dummyTriangleTwo, dummyTriangleThree, dummyTriangleFour, dummyTriangleFive];

    // when
    const result = Triangle.discardSuperTriangle(solution, superTriangle);

    // then
    expect(result).toEqual([dummyTriangleFour, dummyTriangleFive]);
    // get a failing solution from lib and try to debug issue

    // TODO:
    // 813 349 388 265 2664.2 0    <---- this one belongs to the super triangle and should have been removed!
    // 813 349 388 265 662 569
    // 813 349 1211 529 777 614
    // 813 349 662 569 777 614
    // 5 points ^
  });
});
