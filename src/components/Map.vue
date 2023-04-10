<template>
  <div id="mapContainer">
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    const API_KEY = 'eb4b49790fe0a097c4264a4c2a795471';

    if (window.kakao && window.kakao.maps) {
      this.initMap();

    } else {
      const script = document.createElement('script');
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${API_KEY}`;
      document.head.appendChild(script);
    }    
  },
  methods: {
    initMap() {
      const mapContainer = document.getElementById('map'); // 지도를 표시할 div
      const mapOption = {
        center: new kakao.maps.LatLng(37.5251913154781, 126.929112756574), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

      const map = new kakao.maps.Map(mapContainer, mapOption);

      const markerPosition = new kakao.maps.LatLng(37.5251913154781, 126.929112756574);

      // 마커를 생성합니다.
      const marker = new kakao.maps.Marker({
          position: markerPosition // 마커의 위치
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
      kakao.maps.event.addListener(marker, 'click', () => {
        // 클릭한 위도, 경도 정보를 가져옵니다
        // watch로 따로 빼지 않고, 직접 할당
        this.$store.commit('openWeatherApi/SET_CITYNAME', pos.cityName);
        this.$store.commit('openWeatherApi/SET_LATLON', marker.getPosition());
        this.$store.dispatch('openWeatherApi/FETCH_OPENWEATHER_API');
      });

      // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
      // marker.setMap(null);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/scss/main.scss';

#mapContainer {
  @include center;
  width: 100%;
  height: 35%;

  #map {
    width: 80%;
    height: 90%;
    border-radius: 10px;
  }
}
</style>