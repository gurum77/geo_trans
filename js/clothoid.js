class Point {
  Point(x, y) {
    this.x = x;
    this.y = y;
  }
  x = 0;
  y = 0;
}

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

class Clothoid {
  l = 0;
  a = 0;
  constructor(l, a){
    this.l = l;
    this.a = a;
  }
  static calcA(l, r) {
    return Math.sqrt(l * r);
  }
  static calcL(a, r) {
    return (a * a) / r;
  }

  static calcPoint(a, l) {
    if (a == 0 || l == 0) return new Point(0, 0);

    let uXy = new Point(0, 0);
    let jl = l / a;
    let jb = jl * jl;
    
    //	수학식 2^n*n!*(2*n+1). 참조 사이트 : http://oeis.org/A014481/list
    uXy.x =
      l *
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
      l *
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
