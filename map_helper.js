let markers = [];
// map container
var mapContainer = document.getElementById("map"), // ������ ǥ���� div
  mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // ������ �߽���ǥ
    level: 3, // ������ Ȯ�� ����
  };

// ������ ǥ���� div��  ���� �ɼ�����  ������ �����մϴ�
var map = new kakao.maps.StaticMap(mapContainer, mapOption);
console.dir(map);

// �� ��Ʈ��
let zoomControl = new kakao.maps.ZoomControl();
// map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// ���� ���� ���� ��Ʈ��
var mapTypeControl = new kakao.maps.MapTypeControl();
// map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);



// 클릭시 이벤트
kakao.maps.event.addListener(map, "click", function (mouseEvent) {

  // 마커 표시
  addMarker(mouseEvent.latLng);

  let img = map.querySelector("img");
  console.log(img);
})
// Using fetch
async function downloadImage(imageSrc) {
  const image = await fetch(imageSrc)
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)

  const link = document.createElement('a')
  link.href = imageURL
  link.download = 'image file name here'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
// marker를 추가한다.
function addMarker(latLng){
  var marker = new kakao.maps.Marker({ position: latLng });
  marker.setMap(map);

  // 클릭한 위치 정보 표시
  showMarkerInfo(marker);

  // 마커 보관
  markers.push(marker);

  // marker 클릭시 이벤트
  kakao.maps.event.addListener(marker, "click", function () {
    showMarkerInfo(marker);
  })
}

function showMarkerInfoLine(elementId, toProjCode, title, marker) {
  var element = document.querySelector(".content").querySelector(elementId);

  let p = new Proj4js.Point(marker.getPosition().La, marker.getPosition().Ma);
  let from = new Proj4js.Proj("EPSG:4019"); // from은 경,위도
  let to = new Proj4js.Proj(toProjCode);
  Proj4js.transform(from, to, p);
  element.innerText = `${title} : ${p.x.toFixed(7)},${p.y.toFixed(7)}`;
}

// 마커에 대한정보 표시
function showMarkerInfo(marker) {
  var grs80 = document.querySelector(".content").querySelector("#grs80");
  grs80.innerText = "경,위도 : " + marker.getPosition().La + "," + marker.getPosition().Ma;

  showMarkerInfoLine("#central_50", "EPSG:5181", "중부원점,50만(x,y)", marker)
  showMarkerInfoLine("#west", "EPSG:5185", "서부원점(x,y)", marker)
  showMarkerInfoLine("#central", "EPSG:5186", "중부원점(x,y)", marker)
  showMarkerInfoLine("#east", "EPSG:5187", "동부원점(x,y)", marker)
  showMarkerInfoLine("#east_sea", "EPSG:5188", "동해(울릉)원점,50만(x,y)", marker)
}


function clearMarkers() {
  for (let i = 0; i < markers.length; ++i)
    markers[i].setMap(null);
}

