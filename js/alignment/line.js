import Curve from "./curve.js";
import Point from "./point.js";
export default class Line extends Curve {
  // startPoint에서 시작해서 interval간격으로 좌표를 계산한다.
  getPoints(startPoint, interval) {
    let distances = this.getDistances(interval);
    let count = distances.length;

    let points = [];
    for (let i = 0; i < count; ++i) {
      let offset = this.dir.mul(distances[i]);
      points.push(startPoint.translate(offset.x, offset.y));
    }

    return points;
  }

  getPoint(startPoint, distFromStt, offset){
    let perVec = this.getPerDir(distFromStt).mul(offset);
    let vec = this.dir.mul(distFromStt);
    let centerPoint = startPoint.sum(vec.x, vec.y);
    return centerPoint.sum(perVec.x, perVec.y);
  }
}
