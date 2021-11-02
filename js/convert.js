export default class Convert {
  /**
   * degree 를 radian으로 변환해서 리턴
   * @param {number} degree
   */
  static degreeToRadian(degree) {
    return degree * Math.PI * 180.0;
  }
}
