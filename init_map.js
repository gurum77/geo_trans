// map container
var mapContainer = document.getElementById("map"), // ������ ǥ���� div
  mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // ������ �߽���ǥ
    level: 3, // ������ Ȯ�� ����
  };

// ������ ǥ���� div��  ���� �ɼ�����  ������ �����մϴ�
var map = new kakao.maps.Map(mapContainer, mapOption);

// �� ��Ʈ��
let zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// ���� ���� ���� ��Ʈ��
var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);
