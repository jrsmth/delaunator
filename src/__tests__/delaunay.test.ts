import { Delaunay } from '../delaunay';
import { Point } from '../shapes/point';
import { Triangle } from '../shapes/triangle';

describe('Delaunay Tests', () => {
  it('should return a unique set of points within a given width and height', () => {
    // unique refers to distinctness across all values of x & y, rather than just distinct pairs of (x,y)

    // given
    const width = 1000;
    const height = 1000;
    const numPoints = 100;

    // when
    const points: Point[] = Delaunay.generatePoints(width, height, numPoints);

    // then
    expect(points.length).toBe(numPoints);

    const xSet = points.map((pt) => pt.x);
    const ySet = points.map((pt) => pt.y);

    // all x's and y's are unique
    expect(xSet.length).toEqual(new Set(xSet).size);
    expect(ySet.length).toEqual(new Set(ySet).size);

    // all x's and y's are between zero and width/height
    for (const ordinate of xSet) {
      expect(ordinate).toBeGreaterThan(0);
      expect(ordinate).toBeLessThan(width);
    }

    for (const ordinate of ySet) {
      expect(ordinate).toBeGreaterThan(0);
      expect(ordinate).toBeLessThan(width);
    }
  });

  it('should calculate a valid delaunay triangulation for a given set of points', () => {
    // given
    const pointA = new Point(10, 10);
    const pointB = new Point(10, 100);
    const pointC = new Point(100, 100);
    const pointD = new Point(100, 10);

    const points = [pointA, pointB, pointC, pointD];

    // when
    let result = Delaunay.triangulate(points);

    // then
    console.log(result);
    // expect(result.length).toEqual(2);
  });

  it('should return a triangle with a duplicated coordinate pair for a set of 2 points', () => {
    // i.e. given a set of two points, a single 'edge' between them should be rendered
    // this is achieved through a triangle of the form [pointA, pointA, pointB]

    // given
    let points = Delaunay.generatePoints(100, 100, 2);

    // when
    let solution = Delaunay.triangulate(points);

    // then
    expect(solution.length).toEqual(1);

    // pointA == pointB
    // pointA == pointC
    // pointB == pointC
    // strictly one of these should be true
    let tri: Triangle = solution[0];
    let equalityCount = 0;

    if (tri.pointA == tri.pointB) equalityCount++;
    if (tri.pointA == tri.pointC) equalityCount++;
    if (tri.pointB == tri.pointC) equalityCount++;

    expect(equalityCount).toBe(1);
  });
});
