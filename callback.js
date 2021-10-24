function saveMap(){
  var map = document.querySelector("#map");
  var img = map.querySelector("img");
  console.log(img);
  downloadImage(img.src);
}


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

function toGRS80(origin) {
  
  let xy = document.querySelector('#input').querySelector("#xy").value;
  const arr = xy.split(",");
  x = Number(arr[0]);
  y = Number(arr[1]);
  


  let latlng = document.querySelector("#input").querySelector("#latlng");

  let p = new Proj4js.Point(x, y);
  let from = new Proj4js.Proj("EPSG:5181");
  
  if (origin == "west") from = new  Proj4js.Proj("EPSG:5185");
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

  // marker 추가
  addMarker(kakaoLatlng);

}
