function showMarkerInfoLine(elementId, toProjCode, title, lat, lng) {
    var element = document.querySelector(".content").querySelector(elementId);
  
    let p = new Proj4js.Point(lat, lng);
    let from = new Proj4js.Proj("EPSG:4019"); // from은 경,위도
    let to = new Proj4js.Proj(toProjCode);
    Proj4js.transform(from, to, p);
    element.innerText = `${title} : ${p.x.toFixed(7)},${p.y.toFixed(7)}`;
  }
  
// 경위도에 대한 정보 표시
function showMarkerInfoByLatLng(lat, lng) {
    var grs80 = document.querySelector(".content").querySelector("#grs80");
    grs80.innerText = "경,위도 : " + lat + "," + lng;
  
    showMarkerInfoLine("#central_50", "EPSG:5181", "중부원점,50만(x,y)", lat, lng)
    showMarkerInfoLine("#west", "EPSG:5185", "서부원점(x,y)", lat, lng)
    showMarkerInfoLine("#central", "EPSG:5186", "중부원점(x,y)", lat, lng)
    showMarkerInfoLine("#east", "EPSG:5187", "동부원점(x,y)", lat, lng)
    showMarkerInfoLine("#east_sea", "EPSG:5188", "동해(울릉)원점,50만(x,y)", lat, lng)
  }
  

  