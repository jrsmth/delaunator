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
});
