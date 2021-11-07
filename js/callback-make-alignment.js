import Alignment from "./alignment/alignment.js";
import Convert from "./convert.js";
import LatLng from "./alignment/latlng.js"
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFExporter } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/exporters/GLTFExporter.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";

document.getElementById("draw").onclick = drawAlignment;
document.getElementById("save").onclick = saveAlignment;

// 평면선형을 저장한다.
function saveAlignment() {
  // 20미터마다 박스를 그려서 저장한다.
  let alignment = makeAlignment();

  let interval = 20;
  // var points = alignment.getPoints(interval);
  let distances = alignment.getDistances(interval);
  const scene = new THREE.Scene();
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const vertices = new Float32Array(distances.length * 3 * 2 * 2);
  let idx = 0;
  distances.forEach(d => {
    let leftPoint = alignment.getPoint(d, -20);
    let rightPoint = alignment.getPoint(d, 20);
    vertices[idx++] = leftPoint.x - alignment.startPoint.x;
    vertices[idx++] = leftPoint.y - alignment.startPoint.y;
    vertices[idx++] = 0;

    vertices[idx++] = rightPoint.x - alignment.startPoint.x;
    vertices[idx++] = rightPoint.y - alignment.startPoint.y;
    vertices[idx++] = 0;
  })

  let geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  // points.forEach(p => {
  //   const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  //   const geometry = new THREE.CylinderGeometry(5, 5, 10, 16);
  //   // geometry.translate(0, p.x - alignment.startPoint.x, p.y - alignment.startPoint.y);
  //   geometry.translate(p.y - alignment.startPoint.y, p.x - alignment.startPoint.x, 0)

  //   const cube = new THREE.Mesh(geometry, material);


  //   scene.add(cube);


  // });

  let kmapEle = document.getElementById("kmap");
  let width = kmapEle.clientWidth;
  let height = kmapEle.clientHeight;
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: false });
  // renderer.setClearColor(0x000000, 0);
  renderer.setSize(width, height);
  kmapEle.appendChild(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);
  camera.position.z = 5;
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();


  const exporter = new GLTFExporter();
  exporter.parse(scene, function (glb) {
    // downloadGltf(glb, "test.gltf");
    // console.dir(glb);
    addToVmap(glb, alignment);
  }, { binary: true });
}

function addToVmap(glb, alignment) {

  let bp = alignment.startPoint;
  let latLng = new LatLng();
  latLng.fromXY(bp.x, bp.y);
  let point = new vw.CoordZ(latLng.lng, latLng.lat, 0);
  let options = { scale: 1, minimumPixelSize: 100 };
  let id = "test1";
  let modelz = new vw.geom.ModelZ(id);

  let blob = new Blob([glb], { type: "application/octet-stream" });
  let url = window.URL.createObjectURL(blob);

  modelz.setUrl(url);
  modelz.setCoordz(point);
  modelz.setOptions(options);
  modelz.create();
  console.dir(modelz);
  
}
function downloadGltf(gltf, fileName) {
  let blob = new Blob([gltf], { type: "application/octet-stream" });
  let d = document.createElement('a');
  d.href = window.URL.createObjectURL(blob);
  d.download = fileName;
  document.body.appendChild(d);
  d.click();
  document.body.removeChild(d);
}


/**
 * alignment를 만들어서 리턴
 * @returns Alignment
 */
function makeAlignment() {
  // 입력을 가져와서 alignment를 구성한다.
  // bp
  let bp = document.querySelector("#bp");
  let dir = document.querySelector("#dir");

  let curves = document.querySelector("textarea#curves");
  let str = curves.value;
  let strings = str.split("\n");
  for (let i = 0; i < strings.length; ++i) {
    if (strings[i] == "") {
      strings.splice(i, 1);
      i--;
    }
  }
  let alignment = new Alignment();

  alignment.startPoint.fromString(bp.value);
  let degree = parseFloat(dir.value);
  let radian = Convert.degreeToRadian(degree);
  alignment.dir.fromRadian(radian);

  let lastCurve = undefined;
  strings.forEach((element) => {
    if (lastCurve == undefined)
      lastCurve = alignment.addCurveByScript(
        element,
        alignment.startPoint,
        alignment.dir
      );
    else
      lastCurve = alignment.addCurveByScript(
        element,
        lastCurve.getEndPoint(),
        lastCurve.getEndDir()
      );
  });

  return alignment;
}
// 평면선형을 그린다.
function drawAlignment() {

  let alignment = makeAlignment();
  // 선형을 그린다.
  alignment.draw();
}
