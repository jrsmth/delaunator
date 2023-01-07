import { Delaunay } from '../delaunay';
import { Point } from '../shape/point';

describe("Delaunay Tests", () => {

  it('should return a unique set of points within a given width and height', () => {
    // Note: Unique refers to distinctness across all values of x & y, rather than just distinct pairs of (x,y)

    // Given
    let width = 1000; let height = 1000; let numPoints = 100;

    // When
    let points: Point[] = Delaunay.generatePoints(width, height, numPoints);

    // Then
    expect(points.length).toBe(numPoints);

    let xSet = points.map(pt => pt.x);
    let ySet = points.map(pt => pt.y);

    // all x's and y's are unique
    expect(xSet.length).toEqual(new Set(xSet).size)
    expect(ySet.length).toEqual(new Set(ySet).size)

    // all x's/y's are between zero and width/height
    for (let ordinate of xSet) {
      expect(ordinate).toBeGreaterThan(0);
      expect(ordinate).toBeLessThan(width);
    }

    for (let ordinate of ySet) {
      expect(ordinate).toBeGreaterThan(0);
      expect(ordinate).toBeLessThan(width);
    }

  });

});