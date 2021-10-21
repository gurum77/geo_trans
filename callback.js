function toGRS80(origin) {
  let x = document
    .querySelector("#trans_coord")
    .querySelector("#x").valueAsNumber;
  let y = document
    .querySelector("#trans_coord")
    .querySelector("#y").valueAsNumber;

  let lat = document.querySelector("#trans_coord").querySelector("#lat");
  let lon = document.querySelector("#trans_coord").querySelector("#lon");
  let p = new Proj4js.Point(x, y);
  let from = new Proj4js.Proj("EPSG:5181");
  
  if (origin == "west") from = new Proj4js.Proj("EPSG:5185");
  else if (origin == "east") from = new Proj4js.Proj("EPSG:5187");
  else if (origin == "central") from = new Proj4js.Proj("EPSG:5186");
  else if (origin == "east_sea") from = new Proj4js.Proj("EPSG:5188");

  let to = new Proj4js.Proj("EPSG:4019");
  Proj4js.transform(from, to, p);
  // 좌표 쓰기
  lat.value = p.x;
  lon.value = p.y;
  // 지도 이동
  let latlon = new kakao.maps.LatLng(lon.value, lat.value);
  console.log(latlon);
  map.setCenter(latlon);

  // 마크 생성
  let marker = new kakao.maps.Marker({ position: latlon });
  marker.setMap(map);
}
