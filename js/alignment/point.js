export default class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  /**
   * string으로 x, y를 취함
   * @param {string} str
   */
  fromString(str) {
    let arr = str.split(",");
    if (arr.length < 2) return;
    this.x = parseFloat(arr[0]);
    this.y = parseFloat(arr[1]);
  }

  /**
   * radian으로 단위 벡터 설정
   * @param {number} radian 
   */
  fromRadian(radian){
    this.x = Math.cos(radian);
    this.y = Math.sin(radian);
  }

  /**
   * 벡터의 길이 리턴
   */
  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * 단위벡터 리턴
   */
  getNormalize() {
    let len = this.getLength();
    if (len == 0) len = 1;
    return new Point(this.x / len, this.y / len);
  }
  /**
   * radian으로 리턴
   */
  toRadian() {
    let vec = this.getNormalize();
    let res = Math.acos(vec.x / vec.getLength());
    return this.y >= 0.0 ? res : 2 * Math.PI - res;
  }

  Point(x, y) {
    this.x = x;
    this.y = y;
  }
  x = 0;
  y = 0;

  /**
   * point가 같은지 비교
   * @param {Point} other
   */
  equals(other) {
    return this.x === other.x && this.y === other.y;
  }

  
  /**
   *
   * @param {number} x
   * @param {number} y
   * @returns
   */
  sub(x, y) {
    return new Point(this.x - x, this.y - y);
  }

  sum(x, y){
    return new Point(this.x + x, this.y + y);
  }

  /**
   * value만큼 곱한값을 리턴
   * @param {number} value
   */
  mul(value) {
    return new Point(this.x * value, this.y * value);
  }


  /**
   * point를 원점 x축 기준으로 mirror
   */
  mirrorX(){
    return new Point(this.x * -1, this.y);
  }

  /**
   * point를 원점 기준으로 회전해서 리턴
   * @param {Point} dir 
   */
  rotate(dir){
    return new Point(this.x * dir.x - this.y * dir.y, this.x * dir.y + this.y * dir.x);
  }
  /**
   * point를 x, y만큼 이동한 좌표를 리턴
   * @param {number} x
   * @param {number} y
   */
  translate(x, y) {
    return new Point(this.x + x, this.y + y);
  }

  /**
   * point를 복제해서 리턴
   * @returns Point
   */
  clone() {
    return new Point(this.x, this.y);
  }
}
