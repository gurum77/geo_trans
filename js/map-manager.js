import LatLng from "./alignment/LatLng.js";
import KMapManager from "./kmap-manager.js";
import VMapManager from "./vmap-manager.js";

// kakao map�� vworld map�� ����
export default class MapManager {
  kMapManager;
  vMapManager;

  // �� �ʱ�ȭ
  init(kMapContainer, vMapContainer) {
    this.kMapManager = new KMapManager();
    this.kMapManager.init(kMapContainer);

    this.vMapManager = new VMapManager();
    this.vMapManager.init(vMapContainer);
  }

  setCenter(lat, lng) {
    this.kMapManager.setCenter(lat, lng);
    this.vMapManager.setCenter(lat, lng);
  }

  addMarker(lat, lng) {
    this.kMapManager.addMarker(lat, lng);
    this.vMapManager.addMarker(lat, lng);
  }

  clearMarkers() {
    this.kMapManager.clearMarkers();
    this.vMapManager.clearMarkers();
  }

  /**
   * xy point들을 latlng로 변환
   * @param {[]} points
   */
  toLatLngs(points) {
    let latLngs = [];
    points.forEach((p) => {
      let latlng = new LatLng();
      latlng.fromXY(p.x, p.y);
      latLngs.push(latlng);
    });

    return latLngs;
  }
  /**
   * xy좌표로 점을 찍는다.
   * @param {[]} points
   */
  drawPoints(points) {
    let latLngs = this.toLatLngs(points);
    this.kMapManager.drawPoints(latLngs);
    this.vMapManager.drawPoints(latLngs);
  }

  drawPolyline(points) {
    let latLngs = this.toLatLngs(points);
    this.kMapManager.drawPolyline(latLngs);
  }
}
