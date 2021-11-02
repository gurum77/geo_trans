import Curve from "./curve.js";
import Point from "./point.js";
export default class Arc extends Curve{
   radius = 0;
   ccw = true;

   /**
    * startPoint부터 interval 간격으로 좌표를 리턴
    * @param {Point} startPoint 
    * @param {number} interval 
    */
   getPoints(startPoint, interval){
      let points = [];
      return points;
   }
}