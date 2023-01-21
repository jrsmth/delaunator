import { Point } from './point';

export class Edge {
  private readonly _pointA: Point;
  private readonly _pointB: Point;

  constructor(pointA: Point, pointB: Point) {
    this._pointA = pointA;
    this._pointB = pointB;
  }

  get pointA(): Point {
    return this._pointA;
  }

  get pointB(): Point {
    return this._pointB;
  }

  public static areEqual(thisEdge: Edge, comparisonEdge: Edge): boolean { // TODO: consider refactor (too much static?)
    // the edges AB and CD are equal if:
    // (A == C && B == D) || (A == D && B == C)

    const pointA: Point = thisEdge.pointA;
    const pointB: Point = thisEdge.pointB;
    const pointC: Point = comparisonEdge.pointA;
    const pointD: Point = comparisonEdge.pointB;

    const ax: number = pointA.x;
    const ay: number = pointA.y;
    const bx: number = pointB.x;
    const by: number = pointB.y;
    const cx: number = pointC.x;
    const cy: number = pointC.y;
    const dx: number = pointD.x;
    const dy: number = pointD.y;

    return (ax === cx && ay === cy && bx === dx && by === dy) || (ax === dx && ay === dy && bx === cx && by === cy);
  }

  public static removeDuplicateEdges(edgeBuffer: Edge[]): Edge[] {
    let thisEdgePosition = 0;
    while (thisEdgePosition < edgeBuffer.length) {
      const thisEdge: Edge = edgeBuffer[thisEdgePosition];
      let nextEdgePosition = thisEdgePosition + 1;

      // for each edge "ahead" of this one, check for equality: if so, then discard this edge and its duplicate
      while (nextEdgePosition < edgeBuffer.length) {
        const nextEdge: Edge = edgeBuffer[nextEdgePosition];

        if (Edge.areEqual(thisEdge, nextEdge)) {
          edgeBuffer.splice(thisEdgePosition);
          edgeBuffer.splice(nextEdgePosition);

          thisEdgePosition -= 1;
          nextEdgePosition -= 1;
          // counters gets decremented to compensate for edge removal

          if (thisEdgePosition < 0 || thisEdgePosition > edgeBuffer.length - 1) break; // Question: valid?
          if (nextEdgePosition < 0 || nextEdgePosition > edgeBuffer.length - 1) break; // Question: valid?
        }
        nextEdgePosition += 1;
      }
      thisEdgePosition += 1;
    }

    return edgeBuffer;
  }
}
