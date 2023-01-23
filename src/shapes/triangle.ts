import { Point } from './point';

export class Triangle {
  private readonly _pointA: Point;
  private readonly _pointB: Point;
  private readonly _pointC: Point;

  constructor(pointA: Point, pointB: Point, pointC: Point) {
    this._pointA = pointA;
    this._pointB = pointB;
    this._pointC = pointC;
  }

  get pointA() {
    return this._pointA;
  }

  get pointB() {
    return this._pointB;
  }

  get pointC() {
    return this._pointC;
  }

  public static generateSuperTriangle(points: Point[]): Triangle {
    const buffer = 1.1;
    const innerWidth = Math.max(...points.map((pt) => pt.x)) * buffer;
    const innerHeight = Math.max(...points.map((pt) => pt.y)) * buffer;

    const pointA = new Point(-innerWidth, -innerHeight);
    const pointB = new Point(0, 2 * innerHeight);
    const pointC = new Point(2 * innerWidth, 0);

    return new Triangle(pointA, pointB, pointC);
  }

  public static discardSuperTriangle(solution: Triangle[], superTriangle: Triangle): Triangle[] {
    // for each triangle in the solution, if any point equals a super triangle point then discard that triangle
    // for (let i = 0; i < solution.length; i++) {
    //   const triangle = solution[i];
    //
    //   const points = [triangle.pointA, triangle.pointB, triangle.pointC];
    //   const superPoints = [superTriangle.pointA, superTriangle.pointB, superTriangle.pointC];
    //   hit: for (const point of points) {
    //     for (const superPoint of superPoints) {
    //       if (point.x === superPoint.x || point.y === superPoint.y) {
    //         solution.splice(i);
    //         i -= 1;
    //         continue hit;
    //       }
    //     }
    //   }

    // if (
    //   triangle.pointA === superTriangle.pointA ||
    //   triangle.pointA === superTriangle.pointB ||
    //   triangle.pointA === superTriangle.pointC ||
    //   triangle.pointB === superTriangle.pointA ||
    //   triangle.pointB === superTriangle.pointB ||
    //   triangle.pointB === superTriangle.pointC ||
    //   triangle.pointC === superTriangle.pointA ||
    //   triangle.pointC === superTriangle.pointB ||
    //   triangle.pointC === superTriangle.pointC
    // ) {
    //   solution.splice(i);
    //   i -= 1;
    // }
    // }

    // Remove any tri that contains a coord of the Super T
    // for each tri, if any point equals a super T point, remove the tri
    let i = 0;
    while (i < solution.length) {
      const points = [solution[i].pointA, solution[i].pointB, solution[i].pointC];
      for (const coord of points) {
        if (
          (coord.x === superTriangle.pointA.x && coord.y === superTriangle.pointA.y) ||
          (coord.x === superTriangle.pointB.x && coord.y === superTriangle.pointB.y) ||
          (coord.x === superTriangle.pointC.x && coord.y === superTriangle.pointC.y)
        ) {
          solution.splice(i, 1);
          i -= 1;
          break;
        }
      }
      i += 1;
    }

    return solution;
  }
}
