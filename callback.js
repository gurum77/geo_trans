function toggleVWorldMap() {
  
  if (showingVWorldMap) {
    document.getElementById("kmap").style.display = "inline-block";
    document.getElementById("vmap").style.display = "none";
    document.querySelector("#map_toggle").value = "브이월드3D지도";

  }
  else {
    document.getElementById("kmap").style.display = "none";
    document.getElementById("vmap").style.display = "inline-block";
    document.querySelector("#map_toggle").value = "카카오맵";


    let kmapCenter = kmap.getCenter();
    let pos = new vw.CameraPosition(
      new vw.CoordZ(kmapCenter.La, kmapCenter.Ma, 2000),
      new vw.Direction(0, -90, 0)
    )

    vmap.moveTo(pos);
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

  let kakaoLatlng = new kakao.maps.LatLng(p.y, p.x);

  // 지도 이동
  kmap.setCenter(kakaoLatlng);

  // marker 추가
  addMarker(kakaoLatlng);

}
