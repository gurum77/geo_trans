import KMapManager from "./kmap-manager.js";
import VMapManager from "./vmap-manager.js";

// kakao map과 vworld map을 지원
export default class MapManager {
  kMapManager;
  vMapManager;

  // 맵 초기화
  init(kMapContainer, vMapContainer) {
    this.kMapManager = new KMapManager();
    this.kMapManager.init(kMapContainer);

    this.vMapManager = new VMapManager();
    this.vMapManager.init(vMapContainer);
  }

  setCenter(lat, lng){
    this.kMapManager.setCenter(lat, lng);
    this.vMapManager.setCenter(lat, lng);
  }

  
  addMarker(lat, lng){
    this.kMapManager.addMarker(lat, lng);
    this.vMapManager.addMarker(lat, lng);
  }

  clearMarkers(){
    this.kMapManager.clearMarkers();
    this.vMapManager.clearMarkers();
  }
}
