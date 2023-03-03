 [![Node.js CI](https://github.com/JRSmiffy/delaunator/actions/workflows/main.yaml/badge.svg)](https://github.com/JRSmiffy/delaunator/actions/workflows/main.yaml)
 
 # Delaunator
TypeScript [library](https://www.npmjs.com/package/@jrsmiffy/delaunator) that generates Delaunay Triangulations <br>

## Install
`npm install @jrsmiffy/delaunator`

## Release
`make release bump=<VERSION>|major|minor|patch notes="<NOTES>"`

## Test
`npx jest --coverage`

## Example
[JRSmiffy/delaunay](https://github.com/JRSmiffy/delaunay)
```typescript
 let points: Point[] = Delaunay.generatePoints(svgWidth, svgHeight, numberOfPoints);
 let triangulation: Triangle[] = Delaunay.triangulate(points);
```
