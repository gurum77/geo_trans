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

  /**
   * value만큼 곱한값을 리턴
   * @param {number} value
   */
  mul(value) {
    return new Point(this.x * value, this.y * value);
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
