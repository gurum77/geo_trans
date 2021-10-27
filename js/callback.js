// 모든 입력 field set을 숨긴다.
// marker 정보 입력은 유지
function hideAllInputFieldSet(){

}

// 평면선형 만들기
function makeAlignment(){
  hideAllInputFieldSet();

  // 평면선형 field set을 표시한다.
  
}

function toggleVWorldMap() {
  
  if (showingVWorldMap) {
    // 카카오 맵을 표시한다.
    document.getElementById("kmap").style.display = "inline-block";
    document.getElementById("vmap").style.display = "none";
    document.querySelector("#map_toggle a").innerText = "브이월드3D지도";

    // 브이월드 맵 위치로 이동
    let curPos = mapManager.vMapManager.getCenter();
    mapManager.kMapManager.setCenter(curPos.lat, curPos.lng);
  }
  else {
    document.getElementById("kmap").style.display = "none";
    document.getElementById("vmap").style.display = "inline-block";
    document.querySelector("#map_toggle a").innerText = "카카오맵";

    // kakao 맵 위치로 이동
    let center = mapManager.kMapManager.getCenter();
    mapManager.vMapManager.setCenter(center.lat, center.lng);
  }

  showingVWorldMap = !showingVWorldMap;
}



function toGRS80(origin) {

  let xy = document.querySelector('#input').querySelector("#xy").value;
  const arr = xy.split(",");
  x = Number(arr[0]);
  y = Number(arr[1]);



  let latlng = document.querySelector("#input").querySelector("#latlng");

  let p = new Proj4js.Point(x, y);
  let from = new Proj4js.Proj("EPSG:5181");

  if (origin == "west") from = new Proj4js.Proj("EPSG:5185");
  else if (origin == "east") from = new Proj4js.Proj("EPSG:5187");
  else if (origin == "central") from = new Proj4js.Proj("EPSG:5186");
  else if (origin == "east_sea") from = new Proj4js.Proj("EPSG:5188");

  let to = new Proj4js.Proj("EPSG:4019");
  Proj4js.transform(from, to, p);
  // 좌표 쓰기
  latlng.value = p.x + "," + p.y;

  // 지도 이동
  mapManager.setCenter(p.y, p.x);

  // 마커 추가
  mapManager.addMarker(p.y, p.x);
}

// 
function clearMarkers(){  
  mapManager.clearMarkers();
}