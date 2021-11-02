export default class VMapManager {
  markers = [];
  map;

  // īī���� �ʱ�ȭ
  init(mapContainer) {
    let mapOptions = new vw.MapOptions(
      vw.BasemapType.GRAPHIC,
      "",
      "FULL",
      "BASIC",
      false,
      new vw.CameraPosition(
        new vw.CoordZ(127.425, 38.196, 13487000),
        new vw.Direction(-90, 0, 0)
      ),
      new vw.CameraPosition(
        new vw.CoordZ(127.425, 38.196, 1548700),
        new vw.Direction(0, -90, 0)
      )
    );

    this.map = new vw.Map("vmap", mapOptions);

    // Ŭ���� �̺�Ʈ
    // Ŭ���ϸ� ��Ŀ �߰�
    this.map.onClick.addEventListener(function (
      windowPosition,
      ecefPositio,
      cartographic
    ) {
      mapManager.vMapManager.addMarker(
        cartographic.latitudeDD,
        cartographic.longitudeDD
      );
    });
  }

  // �߽� ��ǥ�� ���浵�� ����
  getCenter() {
    let pos = this.map.getCurrentPosition();
    return { lat: pos.position.y, lng: pos.position.x };
  }

  // �߽���ǥ ���浵�� ����
  setCenter(lat, lng) {
    let pos = new vw.CameraPosition(
      new vw.CoordZ(lng, lat, 2000),
      new vw.Direction(0, -90, 0)
    );

    this.map.moveTo(pos);
  }

  // marker�� �߰��Ѵ�.
  addMarker(lat, lng) {
    var point1Coord = new vw.Coord(lng, lat);
    var pt = new vw.geom.Point(point1Coord);

    pt.setImage("http://map.vworld.kr/images/op02/map_point.png");
    // pt.setName(mngNo);
    pt.setFont("����");
    pt.setFontSize(20);
    pt.create();
    this.markers.push(pt);

    showMarkerInfoByLatLng(lat, lng);
    pt.addEventListener(function (
      windowPosition,
      ecefPosition,
      cartographic,
      featureInfo
    ) {
      showMarkerInfoByLatLng(lat, lng);
    });
  }

  clearMarkers() {
    for (let i = 0; i < this.markers.length; ++i) {
      this.map.removeObject(this.markers[i]);
    }
  }

  /**
   * 위경도를 받아서 점을 그린다.
   * @param {[]} latLngs 
   */
  drawPoints(latLngs){
    latLngs.forEach(latLng=>this.addMarker(latLng.lat, latLng.lng));
  }
}
