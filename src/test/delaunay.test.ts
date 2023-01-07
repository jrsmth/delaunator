import { Delaunay } from '../delaunay';
import { Point } from '../shape/point';

describe('Delaunay Tests', () => {
  it('should return a unique set of points within a given width and height', () => {
    // Note: Unique refers to distinctness across all values of x & y, rather than just distinct pairs of (x,y)

    // Given
    const width = 1000;
    const height = 1000;
    const numPoints = 100;

    // When
    const points: Point[] = Delaunay.generatePoints(width, height, numPoints);

    // Then
    expect(points.length).toBe(numPoints);

    const xSet = points.map((pt) => pt.x);
    const ySet = points.map((pt) => pt.y);

    // all x's and y's are unique
    expect(xSet.length).toEqual(new Set(xSet).size);
    expect(ySet.length).toEqual(new Set(ySet).size);

    // all x's/y's are between zero and width/height
    for (const ordinate of xSet) {
      expect(ordinate).toBeGreaterThan(0);
      expect(ordinate).toBeLessThan(width);
    }

    for (const ordinate of ySet) {
      expect(ordinate).toBeGreaterThan(0);
      expect(ordinate).toBeLessThan(width);
    }
  });
});
