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
  map.setCenter(kakaoLatlng);

  // 마크 생성
  let marker = new kakao.maps.Marker({ position: kakaoLatlng });
  marker.setMap(map);
}
