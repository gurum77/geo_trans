import Curve from "./curve.js";
import Point from "./point.js";
export default class Line extends Curve {
  // startPoint에서 시작해서 interval간격으로 좌표를 계산한다.
  getPoints(interval) {
    let distances = this.getDistances(interval);
    let count = distances.length;

    let points = [];
    for (let i = 0; i < count; ++i) {
      let distFromStt  = distances[i];
      points.push(this.getPoint(distFromStt, 0));
    }

    return points;
  }

  /**
   * 
   * @param {number} distFromStt 
   * @param {number} offset 
   * @returns 
   */
  getPoint(distFromStt, offset){
    let perVec = this.getPerDir(distFromStt).mul(offset);
    let vec = this.dir.mul(distFromStt);
    let centerPoint = this.startPoint.sum(vec.x, vec.y);
    return centerPoint.sum(perVec.x, perVec.y);
  }
}
