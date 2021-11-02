import Curve from "./curve.js";
import Point from "./point.js";
export default class Line extends Curve {
  /**
   * startPoint���� �����ؼ� interval�������� ��ǥ�� ����Ѵ�.
   * @param {Point} startPoint 
   * @param {Point} dir 
   * @param {number} interval 
   * @returns 
   */
  getPoints(startPoint, dir, interval) {
    let distances = this.getDistances(interval);
    let count = distances.length;

    let points = [];
    for (let i = 0; i < count; ++i) {
      let offset = this.dir.mul(distances[i]);
      points.push(startPoint.translate(offset.x, offset.y));
    }

    return points;
  }
}
