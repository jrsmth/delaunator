import { Point } from './shapes/point';
import { Triangle } from './shapes/triangle';
import { Edge } from './shapes/edge';

export class Delaunay {
  public static generatePoints(width: number, height: number, numPoints: number): Point[] {
    const pointSet: Point[] = [];
    const xList: number[] = [];
    const yList: number[] = [];

    for (let i = 1; i <= numPoints; i++) {
      let newPointRequired = true;
      while (newPointRequired) {
        const candidate = this.generateRandomPoint(width, height);

        const uniqueCandidate = !(xList.includes(candidate.x) || yList.includes(candidate.y));
        if (uniqueCandidate) {
          pointSet.push(candidate);
          xList.push(candidate.x);
          yList.push(candidate.y);

          newPointRequired = false;
        }
      }
    }

    return pointSet;
  }

  public static triangulate(points: Point[]): Triangle[] {
    let solution: Triangle[] = [];
    if (points.length < 2) return solution;

    if (points.length === 2) return [new Triangle(points[0], points[0], points[1])];

    if (points.length === 3) return [new Triangle(points[0], points[1], points[2])];

    // #1 - Create a super triangle that encloses all points
    const superTriangle: Triangle = Triangle.generateSuperTriangle(points);
    solution.push(superTriangle);

    // #2 - Build the solution by adding each vertex incrementally
    for (const point of points) {
      solution = this.addVertex(solution, point);
    }

    // #3 - Discard any triangle that contains a coordinate of the super triangle
    solution = Triangle.discardSuperTriangle(solution, superTriangle);

    return solution;
  }

  private static generateRandomPoint(width: number, height: number) {
    const borderRatio = 0.1;
    const xMax = width * (1 - borderRatio);
    const yMax = height * (1 - borderRatio);

    const xMin = width * borderRatio;
    const yMin = height * borderRatio;

    const xCoord = this.randomIntFromInterval(xMin, xMax);
    const yCoord = this.randomIntFromInterval(yMin, yMax);

    return new Point(xCoord, yCoord);
  }

  private static randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min); // Includes min/max
  }

  private static addVertex(solution: Triangle[], vertex: Point): Triangle[] {
    let edgeBuffer: Edge[] = [];

    let i = 0;
    while (i < solution.length) {
      const triangle = solution[i];

      if (vertex.isWithinCircumcircle(triangle)) {
        edgeBuffer.push(new Edge(triangle.pointA, triangle.pointB)); // AB edge
        edgeBuffer.push(new Edge(triangle.pointB, triangle.pointC)); // BC edge
        edgeBuffer.push(new Edge(triangle.pointA, triangle.pointC)); // AC edge

        solution.splice(i, 1);
        i -= 1;
      }
      i += 1;
    }

    // #2 - Discard duplicate edges in the edge buffer; only retain edges that exist once
    edgeBuffer = Edge.removeDuplicateEdges(edgeBuffer);

    // #3 - For all remaining edges (AB), construct a new triangle (PAB) using this point (P)
    for (const edge of edgeBuffer) {
      solution.push(new Triangle(vertex, edge.pointA, edge.pointB));
    }

    return solution;
  }
}

// TODO: fix tests and improve coverage
