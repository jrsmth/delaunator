import { Point } from './shape/point';

export class Delaunay {

  public static generatePoints(width: number, height: number, numPoints: number): Point[] {
    let pointSet: Point[] = [];
    let xList: number[] = [];
    let yList: number[] = [];

    for (let i = 1; i <= numPoints; i++) {
      let newPointRequired = true;
      while (newPointRequired) {
        let candidate = this.generateRandomPoint(width, height);

        let uniqueCandidate = !((xList.includes(candidate.x)) || (yList.includes(candidate.y)));
        if (uniqueCandidate) {
          pointSet.push(candidate);
          xList.push(candidate.x);
          yList.push(candidate.y);

          newPointRequired = false;
        } else console.debug(`Duplicate candidate found! (x: ${candidate.x}, y: ${candidate.y})`);
      }
    }

    return pointSet;
  }

  private static generateRandomPoint(width: number, height: number){
    let borderRatio = 0.1;
    let xMax = width * (1 - borderRatio);
    let yMax = height * (1 - borderRatio);

    let xMin = width * borderRatio;
    let yMin = height * borderRatio;

    let xCoord = Math.floor((xMin + Math.random() * xMax)) - xMin;
    let yCoord = Math.floor((yMin + Math.random() * yMax)) - yMin;

    return new Point(xCoord, yCoord);
  }

}