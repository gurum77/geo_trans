import Curve from "./curve.js";
import Point from "./point.js";

const math00 = 1;
const math01 = 6;
const math02 = 40;
const math03 = 336;
const math04 = 3456;
const math05 = 42240;
const math06 = 599040;
const math07 = 9676800;
const math08 = 175472640;
const math09 = 3530096640;
const math10 = 78033715200;
const math11 = 1880240947200;
const math12 = 49049763840000;
const math13 = 1377317368627200;
const math14 = 41421544567603200;
const math15 = 1328346084409344000;
const math161 = 45249466617298944;
const math162 = 1000;
const math171 = 1631723190138961920;
const math172 = 1000;
const math16 = math161 * math162;
const math17 = math171 * math172;

export default class Clothoid extends Curve {
  a = 0;
  radius1 = 0;
  radius2 = 0;
  ccw = true;

  /**
   * 시작부터 떨어진 거리에서의 방향
   * @param {number} distFromStt
   */
  getDir(distFromStt) {
    let inverse = this.isInverse();
    if(!inverse)
      return Clothoid.calcDir(this.a, distFromStt, this.ccw, this.dir); 

    // inverse이면 크로소이드를 뒤집어서 계산해야함
    let endDir = Clothoid.calcDir(this.a, this.length, this.ccw, this.dir);
    return Clothoid.calcDir(this.a, inverse ? this.length - distFromStt : distFromStt, inverse ? !this.ccw : this.ccw, endDir); 
  }

  // 마지막지점의 dir
  getEndDir() {
    return this.getDir(this.length);
  }

  /**
   * 크로소이드 시점에서 떨어진 거리에서의 좌표
   * @param {number} distFromStt
   * @param {number} offset
   */
  getPoint(distFromStt, offset) {
    

    // center point 계산
    let inverse = this.isInverse();
    let centerPoint = Clothoid.calcPoint(
      this.a,
      inverse ? this.length - distFromStt : distFromStt
    );
    if (!this.ccw) centerPoint.y *= -1;

    // 직선
    if (this.radius1 == 0 && this.radius2 == 0) {
    }
    // 클로소이드
    else if (this.radius1 == 0 && this.radius2 > 0) {
      centerPoint = centerPoint.rotate(this.dir);
    }
    // 반전 클로소이드
    else if (this.radius1 > 0 && this.radius2 == 0) {
      centerPoint = this.toInversePoint(centerPoint);
      centerPoint = centerPoint.rotate(this.dir);
    }
    // 난형 클로소이드
    else if (this.radius1 > this.radius2) {
    }
    // 반전 난형 클로소이드
    else if (this.radius1 < this.radius2) {
    }

    centerPoint = centerPoint.translate(this.startPoint.x, this.startPoint.y);

    // offset
    if(offset != 0){
      let perVec = this.getPerDir(distFromStt).mul(offset);
      return centerPoint.sum(perVec.x, perVec.y);
    }

    return centerPoint;
  }

  /**
   * 반전 클로소이드인지?(직선->곡선이 정상임)
   */
  isInverse() {
    if (this.radius1 > 0 && this.radius2 == 0) return true;

    if (this.radius1 == 0 && this.radius2 > 0) return false;
    if (this.radius1 == 0 && this.radius2 == 0) return false;

    if (this.radius1 > this.radius2) return false;
    return true;
  }
  /**
   * startPoint부터 interval 간격으로 좌표를 리턴
   * @param {Point} startPoint
   * @param {number} interval
   */
  getPoints(interval) {
    let points = [];
    let distances = this.getDistances(interval);

    distances.forEach((dist) => {
      let point = this.getPoint(dist, 0);
      points.push(point);
    });
    return points;
  }

  /**
   * 반전 선형의 point로 변환
   * 원점 기준의 좌표를
   * mirror X
   * move 전체폭
   * rotate endDir
   * @param {Point} point
   */
  toInversePoint(point) {
    let originEndPoint = Clothoid.calcPoint(this.a, this.length);
    let originEndDir = Clothoid.calcDir(this.a, this.length);

    let inversePoint = point.mirrorX();
    inversePoint = inversePoint.translate(originEndPoint.x, -originEndPoint.y);
    inversePoint = inversePoint.rotate(originEndDir);
    return inversePoint;
  }

  calcLength() {
    if (this.radius1 > 0 && this.radius2 == 0)
      this.length = Clothoid.calcL(this.a, this.radius1);
    else if (this.radius1 == 0 && this.radius2 > 0)
      this.length = Clothoid.calcL(this.a, this.radius2);
    else if (this.radius1 > 0 && this.radius2 > 0) {
      let l1 = Clothoid.calcL(this.a, this.radius1);
      let l2 = Clothoid.calcL(this.a, this.radius2);
      this.length = Math.abs(l1 - l2);
    }
  }

  /**
   * distFromStt 지점에서의 방향을 계산
   * @param {number} a
   * @param {number} distFromStt
   * @param {boolean} ccw
   * @param {Point} dir
   * @return {Point} 마지막 지점에서의 방향
   */
  static calcDir(a, distFromStt, ccw = true, dir = new Point(1, 0)) {
    let aa = a * a;

    // 반시계 방향이 아니면 시계방향으로 돌린다.
    if (!ccw) aa *= -1.0;

    // radian
    let direction = dir.toRadian();
    direction += (distFromStt * distFromStt) / (2 * aa);

    let endDir = new Point();
    endDir.fromRadian(direction);
    return endDir;
  }

  static calcA(length, radius) {
    return Math.sqrt(length * radius);
  }
  static calcL(a, radius) {
    if (radius == Infinity || a == Infinity || radius == 0 || a == 0) return 0;
    return (a * a) / radius;
  }

  static calcR(a, length) {
    if (length == Infinity || a == Infinity || length == 0 || a == 0) return 0;
    return length / (a * a);
  }

  static calcPoint(a, length) {
    if (a == 0 || length == 0) return new Point(0, 0);

    let uXy = new Point(0, 0);
    let jl = length / a;
    let jb = jl * jl;

    //	수학식 2^n*n!*(2*n+1). 참조 사이트 : http://oeis.org/A014481/list
    uXy.x =
      length *
      (1.0 / math00 -
        (jb * jb) / math02 +
        (jb * jb * jb * jb) / math04 -
        (jb * jb * jb * jb * jb * jb) / math06 +
        (jb * jb * jb * jb * jb * jb * jb * jb) / math08 -
        (jb * jb * jb * jb * jb * jb * jb * jb * jb * jb) / math10 +
        (jb * jb * jb * jb * jb * jb * jb * jb * jb * jb * jb * jb) / math12 -
        (jb * jb * jb * jb * jb * jb * jb * jb * jb * jb * jb * jb * jb * jb) /
          math14 +
        (jb *
          jb *
          jb *
          jb *
          jb *
          jb *
          jb *
          jb *
          jb *
          jb *
          jb *
          jb *
          jb *
          jb *
          jb *
          jb) /
          math16);

    uXy.y =
      length *
      jb *
      (1.0 / math01 -
        (jb * jb) / math03 +
        (jb * jb * jb * jb) / math05 -
        (jb * jb * jb * jb * jb * jb) / math07 +
        (jb * jb * jb * jb * jb * jb * jb * jb) / math09 -
        (jb * jb * jb * jb * jb * jb * jb * jb * jb * jb) / math11 +
        (jb * jb * jb * jb * jb * jb * jb * jb * jb * jb * jb * jb) / math13 -
        (jb * jb * jb * jb * jb * jb * jb * jb * jb * jb * jb * jb * jb * jb) /
          math15 +
        (jb *
          jb *
          jb *
          jb *
          jb *
          jb *
          jb *
          jb *
          jb *
          jb *
          jb *
          jb *
          jb *
          jb *
          jb *
          jb) /
          math17);

    return uXy;
  }
}
