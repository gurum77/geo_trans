import Point from "./point.js";

// 시작점과 길이로 정의 하는 curve
export default class Curve {
  length = 0.0;
  dir = new Point(1, 0);
  startPoint = new Point(0, 0);
  distFromAlignmentStt = 0; // alignment의 시작에서 떨어진 거리
  index = -1; // alignment에 들어갔을때의 인덱스(빠른 계산을 위함)

  /**
   * 시작부터 떨어진 거리에서의 우측수직방향
   * @param {number} distFromStt
   */
  getPerDir(distFromStt) {
    let dir = this.getDir(distFromStt);
    return dir.rotate(new Point(0, -1));
  }

  /**
   * 시작부터 떨어진 거리에서의 방향
   * @param {number} distFromStt
   */
  getDir(distFromStt) {
    return this.dir;
  }

  getEndDir() {
    return this.dir;
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


  getEndPoint(){
    return this.getPoint(this.length, 0);
  }
  /**
   * interval로 나눈 거리값들을 리턴
   * @param {number} interval
   */
  getDistances(interval) {
    let count = this.length / interval;
    let distances = [];
    for (let i = 0; i < count; ++i) {
      distances.push(i * interval);
    }

    if (
      distances.length == 0 ||
      distances[distances.length - 1] !== this.length
    ) {
      distances.push(this.length);
    }

    return distances;
  }
}
