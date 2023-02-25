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

  public isEqualTo(comparisonEdge: Edge): boolean {
    // TODO: consider refactor (too much static?)
    // The edges AB and CD are equal if:
    // (A == C && B == D) || (A == D && B == C)

    const pointA: Point = this.pointA;
    const pointB: Point = this.pointB;
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
    // TODO: sort naming!
    let j = 0;
    while (j < edgeBuffer.length) {
      // Edges stored as eB = [(x1,y1), (x2,y2),    (X1,Y1), (X2,Y2),    ...]
      let k = j + 1; // next edge
      const thisEdge = edgeBuffer[j];
      while (k < edgeBuffer.length) {
        const tempEdge = edgeBuffer[k];
        if (thisEdge.isEqualTo(tempEdge)) {
          edgeBuffer.splice(k, 1);
          edgeBuffer.splice(j, 1);
          j -= 1;
          k -= 1;
          if (j < 0 || j > edgeBuffer.length - 1) break;
          if (k < 0 || k > edgeBuffer.length - 1) break;
        }
        k += 1;
      }
      j += 1;
    } // properly explain the logic behind this...
    // for each edge:
    // for each edge "ahead" of this edge:
    // compare this edge and this temp edge:
    // if they share the same coords, they must be equal and so need to be removed
    // counter gets decremented to compensate for edge removal

    return edgeBuffer;
  }

  //
  //   let thisEdgePosition = 0;
  //   while (thisEdgePosition < edgeBuffer.length) {
  //     const thisEdge: Edge = edgeBuffer[thisEdgePosition];
  //     let nextEdgePosition = thisEdgePosition + 1;
  //
  //     // for each edge "ahead" of this one, check for equality: if so, then discard this edge and its duplicate
  //     while (nextEdgePosition < edgeBuffer.length) {
  //       const nextEdge: Edge = edgeBuffer[nextEdgePosition];
  //
  //       if (Edge.areEqual(thisEdge, nextEdge)) {
  //         edgeBuffer.splice(thisEdgePosition);
  //         edgeBuffer.splice(nextEdgePosition);
  //
  //         thisEdgePosition -= 1;
  //         nextEdgePosition -= 1;
  //         // counters gets decremented to compensate for edge removal
  //
  //         if (thisEdgePosition < 0 || thisEdgePosition > edgeBuffer.length - 1) break; // Question: valid?
  //         if (nextEdgePosition < 0 || nextEdgePosition > edgeBuffer.length - 1) break; // Question: valid?
  //       }
  //       nextEdgePosition += 1;
  //     }
  //     thisEdgePosition += 1;
  //   }
  //
  //   return edgeBuffer;
  // }
}
