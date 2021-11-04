import Point from "./point.js";
import Line from "./line.js";
import Arc from "./arc.js";
import Clothoid from "./clothoid.js";

export default class Alignment {
  startPoint = new Point();
  curves = []; // curve들을 담고 있는다.
  dir = new Point();

  draw() {
    // 20미터 간격으로 점을 추출
    let points = this.getPoints(20);

    // 맵에 점을 찍는다.
    mapManager.drawPolyline(points, 1, "#ff0000");

    // tick을 그린다.
    let distances = this.getDistances(20);
    distances.forEach((d) => {
      this.drawTick(d);
    });
  }

  /**
   * tick을 그린다.
   * @param {number} distance
   */
  drawTick(distance) {
    let pt1 = this.getPoint(distance, -3);
    let pt2 = this.getPoint(distance, 3);
    mapManager.drawLine(pt1, pt2, 1, "#ffff00");
  }

  // distFromStt위치에 있는 curve 리턴
  getCurveAtDistFromStt(distFromStt) {
    let curDist = 0;
    for (let i = 0; i < this.curves.length; ++i) {
      let c = this.curves[i];
      if (curDist + c.length > distFromStt) {
        return c;
      }
      curDist += c.length;
    }
  }

  /**
   * 시작점에서 떨어진 거리에서의 좌표 리턴
   * @param {number} distFromStt
   * @param {number} offset curve 중심에서 수직으로 떨어진 거리
   */
  getPoint(distFromStt, offset) {
    // curve와 curve이전까지 누적 거리
    let curve = this.getCurveAtDistFromStt(distFromStt);
    if(curve == undefined)
      return new Point(0, 0);

    let distFromCurveStt = distFromStt - curve.distFromAlignmentStt;
    return curve.getPoint(distFromCurveStt, offset);
  }

  /**
   * 선형의 전체 길이 리턴
   */
  getLength() {
    let len = 0;
    this.curves.forEach((c) => (len += c.length));
    return len;
  }
  /**
   * interval 간격으로 나눈 거리값을 리턴
   * @param {number} interval
   */
  getDistances(interval) {
    let distances = [];
    let len = this.getLength();
    let count = len / interval;
    for (let i = 0; i < count; ++i) {
      distances.push(i * interval);
    }
    if (distances.length == 0) distances.push(0);
    else if (distances[distances.length - 1] != len) distances.push(len);
    return distances;
  }

  // interval 간격으로 좌표들을 계산한다.
  getPoints(interval) {
    let points = [];
    this.curves.forEach((curve) => {
      let curvePoints = curve.getPoints(interval);
      if (curvePoints != undefined) {
        curvePoints.forEach((p) => points.push(p));
      }
    });

    return points;
  }

  // 선형의 전체 길이 리턴
  getLength() {
    let len = 0;
    this.curves.forEach((curve) => {
      len += curve.length;
    });
    return len;
  }

  /**
   * script로 curve를 추가한다.
   * line,l=100
   * arc,l=100,r=200
   * clothoid,l=200,r=200,a=150
   * @param {string} str
   * @param {Point} startPoint
   * @param {Point} dir
   * @returns {Curve} 마지막으로 추가된 curve
   */
  addCurveByScript(str, startPoint, dir) {
    let obj = this.parseScript(str);
    if (!obj.has("tag")) return false;

    let tag = obj.get("tag");
    if (tag == "line") {
      let line = new Line();
      line.length = this.getFloat(obj, "l");
      this.curves.push(line);
    } else if (tag == "arc") {
      let arc = new Arc();
      arc.radius = this.getFloat(obj, "r");
      arc.length = this.getFloat(obj, "l");
      arc.ccw = this.getBool(obj, "ccw");
      this.curves.push(arc);
    } else if (tag == "clothoid") {
      let clothoid = new Clothoid();
      clothoid.a = this.getFloat(obj, "a");
      clothoid.radius1 = this.getFloat(obj, "r1");
      clothoid.radius2 = this.getFloat(obj, "r2");
      clothoid.ccw = this.getBool(obj, "ccw");
      clothoid.calcLength();
      this.curves.push(clothoid);
    }

    // 공통으로설정해야 하는 것들
    let lastCurve = this.curves[this.curves.length - 1];
    lastCurve.dir = dir;
    lastCurve.startPoint = startPoint;
    lastCurve.index = this.curves.length-1;
    lastCurve.distFromAlignmentStt = 0;
    if(this.curves.length > 1){
      let lastPrevCurve = this.curves[this.curves.length - 2];
      lastCurve.distFromAlignmentStt = lastPrevCurve.distFromAlignmentStt + lastPrevCurve.length;
    }
      
    return lastCurve;
  }
  /**
   *
   * @param {Map} map
   * @param {string} key
   */
  getBool(map, key) {
    let v = String(map.get(key)).toLowerCase();
    if (v == "false") return false;

    if (map.has(key)) return Boolean(v);
    return false;
  }

  /**
   *
   * @param {Map} map
   * @param {string} key
   */
  getFloat(map, key) {
    if (map.has(key)) return parseFloat(map.get(key));
    return 0;
  }
  /**
   * script , = 을 분석해서 object로 리턴 첫번째는 object 이름이다.
   * @param {string} str
   */
  parseScript(str) {
    let elements = str.split(",");
    if (elements.length == 0) return { tag: "none" };

    let map = new Map();
    map.set("tag", elements[0].toString());
    for (let i = 1; i < elements.length; ++i) {
      let kv = elements[i].split("=");
      if (kv.length != 2) continue;

      map.set(kv[0].toString(), kv[1].toString());
    }

    return map;
  }
}
