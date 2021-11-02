export default class KMapManager {
  markers = [];
  map;

  // 카카오맵 초기화
  init(mapContainer) {
    let mapOption = {
      center: new kakao.maps.LatLng(37.482077583660335, 126.8920853404084),
      level: 3,
    };

    // 지도 추가
    this.map = new kakao.maps.Map(mapContainer, mapOption);

    let zoomControl = new kakao.maps.ZoomControl();
    this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    var mapTypeControl = new kakao.maps.MapTypeControl();
    this.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);

    // 클릭시 이벤트
    kakao.maps.event.addListener(this.map, "click", function (mouseEvent) {
      // 마커 표시

      mapManager.kMapManager.addMarker(
        mouseEvent.latLng.Ma,
        mouseEvent.latLng.La
      );
    });
  }

  getCenter() {
    let center = this.map.getCenter();
    return { lat: center.Ma, lng: center.La };
  }

  setCenter(lat, lng) {
    let latlng = new kakao.maps.LatLng(lat, lng);
    this.map.setCenter(latlng);
  }

  // marker를 추가한다.
  addMarker(lat, lng) {
    let latlng = new kakao.maps.LatLng(lat, lng);
    var marker = new kakao.maps.Marker({ position: latlng });
    marker.setMap(this.map);

    // 클릭한 위치 정보 표시
    showMarkerInfoByLatLng(marker.getPosition().La, marker.getPosition().Ma);

    // 마커 보관
    this.markers.push(marker);

    // marker 클릭시 이벤트
    kakao.maps.event.addListener(marker, "click", function () {
      showMarkerInfoByLatLng(marker.getPosition().La, marker.getPosition().Ma);
    });
  }

  clearMarkers() {
    for (let i = 0; i < this.markers.length; ++i) this.markers[i].setMap(null);
  }

  /**
   * 위경도를 받아서 점을 그린다.
   * @param {[]} latLngs
   */
  drawPoints(latLngs) {
    latLngs.forEach((latLng) => this.addMarker(latLng.lat, latLng.lng));
  }

  /**
   * 위경도를 받아서 polyline을 그린다.
   * @param {[]} latLngs
   */
  drawPolyline(latLngs) {
    let path = [];
    latLngs.forEach((latLng) => {
      path.push(new kakao.maps.LatLng(latLng.lat, latLng.lng));
    });

    let polyline = new kakao.maps.Polyline({
      path: path,
      strokeWeight: 5,
      strokeColor: "#FF0000",
      strokeStyle: 'solid',
    });
    polyline.setMap(this.map);
  }
}
