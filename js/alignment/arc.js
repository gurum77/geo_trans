import Curve from "./curve.js";
import Point from "./point.js";
export default class Arc extends Curve{
   radius = 0;
   ccw = true;

   /**
    * startPoint���� interval �������� ��ǥ�� ����
    * @param {Point} startPoint 
    * @param {number} interval 
    */
   getPoints(startPoint, interval){
      let points = [];
      return points;
   }
}