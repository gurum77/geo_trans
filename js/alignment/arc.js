import Curve from "./curve.js";
import Point from "./point.js";
export default class Arc extends Curve{
   radius = 0;
   ccw = true;

     /**
   * ���ۺ��� ������ �Ÿ������� ����
   * @param {number} distFromStt
   */
  getDir(distFromStt) {
     let radian = this.dir.toRadian() + (distFromStt * this.getCurvature());
     let curDir = new Point();
     curDir.fromRadian(radian);
     return curDir;
 }

 getEndDir() {
   return this.getDir(this.length);
 }

   /**
    * ���(1/R)�� ���ۺ����� �Ÿ��� ��ǥ ���
    * @param {number} curvature 
    * @param {number} startDirInRadians  ���۹���
    * @param {number} dist 
    */
   calcPoint(startPoint, curvature, startDirInRadians, dist){
      let x;
      let y;

      let absRadius;
      if (curvature != 0)
      {
          absRadius = Math.abs(1.0 / curvature);
      }
      else
      {
          absRadius = MAX_VALUE;
      }


      let epsilon = 0.000001;
      let halfPI = (Math.PI / 2.0);
   
      let curvatureSign = Math.sign(curvature);

      // if radius is not too big, calculate an arc point
      if (curvature > epsilon || curvature < -epsilon)
      {
          x = startPoint.x + absRadius * Math.cos(startDirInRadians + (curvatureSign * halfPI)) + absRadius * Math.cos((startDirInRadians + (-curvatureSign * halfPI)) + dist * curvature);
          y = startPoint.y + absRadius * Math.sin(startDirInRadians + (curvatureSign * halfPI)) + absRadius * Math.sin((startDirInRadians + (-curvatureSign * halfPI)) + dist * curvature);
      }
      else // else if radius is very large (curvature nearly 0), calculate a line point 
      {
          x = startPoint.x + dist * Math.cos(startDirInRadians);
          y = startPoint.y + dist * Math.sin(startDirInRadians);
      }

      return new Point(x, y);
   }

   /**
    * 
    * @returns ��� ����
    */
   getCurvature(){
      return 1.0 / this.radius;
   }
   /**
    * startPoint���� interval �������� ��ǥ�� ����
    * @param {Point} startPoint 
    * @param {number} interval 
    */
   getPoints(startPoint, interval){
      let points = [];
      let distances = this.getDistances(interval);
      let curvature = this.getCurvature();
      
      let startDirInRadians = this.dir.toRadian();
      
      distances.forEach((dist) => {
        let point = this.calcPoint(startPoint, curvature, startDirInRadians, dist);
        if (!this.ccw) point.y *= -1;
  
        points.push(point);
      });
      
      
      return points;
   }
}