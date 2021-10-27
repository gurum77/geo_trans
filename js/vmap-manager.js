export default class VMapManager {
  markers = [];
  map;

  // 카카오맵 초기화
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

    // 클릭시 이벤트
    // 클릭하면 마커 추가
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

  // 중심 좌표를 위경도로 리턴
  getCenter() {
    let pos = this.map.getCurrentPosition();
    return { lat: pos.position.y, lng: pos.position.x };
  }

  // 중심좌표 위경도로 설정
  setCenter(lat, lng) {
    let pos = new vw.CameraPosition(
      new vw.CoordZ(lng, lat, 2000),
      new vw.Direction(0, -90, 0)
    );

    this.map.moveTo(pos);
  }

  // marker를 추가한다.
  addMarker(lat, lng) {
    var point1Coord = new vw.Coord(lng, lat);
    var pt = new vw.geom.Point(point1Coord);

    pt.setImage("http://map.vworld.kr/images/op02/map_point.png");
    // pt.setName(mngNo);
    pt.setFont("고딕");
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
}
