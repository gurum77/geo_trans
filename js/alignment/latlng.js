export default class LatLng {
  lat = 0.0;
  lng = 0.0;
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  fromXY(x, y) {
    let p = new Proj4js.Point(x, y);
    let from = new Proj4js.Proj(espgType);
    let to = new Proj4js.Proj("EPSG:4019");
    Proj4js.transform(from, to, p);

    this.lng = p.x;
    this.lat = p.y;
  }
}
