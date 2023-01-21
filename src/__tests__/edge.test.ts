import each from "jest-each";
import { Edge } from '../shape/edge';
import { Point } from '../shape/point';

describe("Edge Tests", () => {

  each([
    [0, 0, 10, 10, 10, 10, 0, 0, true],
    [0, 0, 10, 10, 0, 0, 10, 10, true],
    [0, 0, 10, 10, 0, 0, 10, 0, false],
    [0, 0, 10, 10, 5, 1, 1, 20, false]
  ]).it('should determine if edgeOne [(%s, %s), (%s, %s)] is equal to edgeTwo [(%s, %s), (%s, %s)] [%s]',
    (ax: number, ay: number, bx: number, by: number, cx: number, cy: number, dx: number, dy: number, equality: boolean) => {
      // given
      let edgeOne: Edge = new Edge(new Point(ax, ay), new Point(bx, by));
      let edgeTwo: Edge = new Edge(new Point(cx, cy), new Point(dx, dy));

      // when
      let result = edgeOne.isEqualTo(edgeTwo);

      // then
      expect(result).toEqual(equality);
    });

  each([
    [
      [
        [new Point(0,0), new Point(100, 0)],
        [new Point(45,45), new Point(6, 63)],
        [new Point(746,9), new Point(552, 2)]
      ],
      [
        [new Point(0,0), new Point(100, 0)],
        [new Point(45,45), new Point(6, 63)],
        [new Point(746,9), new Point(552, 2)]
      ]
    ],
    [
      [
        [new Point(0,0), new Point(100, 0)],
        [new Point(45,45), new Point(6, 63)],
        [new Point(31,6), new Point(552, 2)],
        [new Point(552,2), new Point(31, 6)],
        [new Point(746,9), new Point(552, 2)]
      ],
      [
        [new Point(0,0), new Point(100, 0)],
        [new Point(45,45), new Point(6, 63)],
        [new Point(746,9), new Point(552, 2)]
      ]
    ]
  ]).xit('should remove duplicate edges', (edges: Edge[], processedEdges: Edge[]) => {
    // CASE-0: No edge removal necessary
    // CASE-N: Edges that exist more than once are discarded

    // when
    let result = Edge.removeDuplicateEdges(edges);

    // then
    expect(result).toEqual(processedEdges);
  }); // FixMe

});