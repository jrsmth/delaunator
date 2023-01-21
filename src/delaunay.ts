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
        } // else console.debug(`Duplicate candidate found! (x: ${candidate.x}, y: ${candidate.y})`);
      }
    }

    return pointSet;
  }

  public static triangulate(points: Point[]): Triangle[] {
    let solution: Triangle[] = [];
    if (points.length < 3) return solution;

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

  public static render() {
    // TODO: Implement
  }

  private static generateRandomPoint(width: number, height: number) {
    // TODO: Extract to points?
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
    // TODO: Extract to points?
    // Note: result is inclusive of min/max
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private static addVertex(solution: Triangle[], vertex: Point): Triangle[] {
    // TODO: Implement
    let edgeBuffer: Edge[] = [];

    // #1 - For each triangle in the solution:
    // If this point lies within said triangle's circumcircle, then discard this triangle but hold onto the edges
    // for (let i = 0; i < solution.length; i++) {
    //   const triangle = solution[i];
    //   if (vertex.isWithinCircumcircle(triangle)) {
    //     edgeBuffer.push(new Edge(triangle.pointA, triangle.pointB)); // AB edge
    //     edgeBuffer.push(new Edge(triangle.pointB, triangle.pointC)); // BC edge
    //     edgeBuffer.push(new Edge(triangle.pointA, triangle.pointC)); // AC edge
    //
    //     solution.splice(i);
    //     i -= 1;
    //   }
    // }

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
