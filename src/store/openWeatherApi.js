import axios from "axios";

export default {
    // namespaced: 하나의 store에서 모듈화하여 사용할 수 있음을 명시적으로 나타내는 개념
    namespaced: true,
    // state: 실제 취급하는 데이터
    // data와 유사
    state: {
        cityName: "",
        currentWeather: {
            currentTemp: 0,
            // mainView 사용
            currentHumidity: 0,
            currentWindSpeed: 0,
            currentFeelsLike: 0,
            // subView 사용
            currentSunrise: 0,
            currentSunset: 0,
            currentVisibility: 0,
        },
        hourlyWeather: [{
            image: "",
        }]
    },
    // getters: 계산된 상태의 데이터를 만들어내는 속성
    // computed와 유사
    getters: {},
    // mutations: 관리하는 데이터(state)를 변경할 수 있음
    // methods와 유사
    mutations: {
        SET_CITYNAME(state, payload) {
            state.cityName = payload;
        },
        SET_CURRENT_WEATHER(state, payload) {
            state.currentWeather.currentTemp = Math.round(payload.data.list[0].main.temp);
            state.currentWeather.currentHumidity = payload.data.list[0].main.humidity;
            state.currentWeather.currentWindSpeed = payload.data.list[0].wind.speed;
            state.currentWeather.currentFeelsLike = Math.round(payload.data.list[0].main.feels_like);
            state.currentWeather.currentSunrise = payload.data.city.sunrise;
            state.currentWeather.currentSunset = payload.data.city.sunset;
            state.currentWeather.currentVisibility = payload.data.list[0].visibility;
        },
        SET_TIMELY_WEATHER(state, payload) {
            state.hourlyWeather = payload;
        }
    },
    // action: 특정 데이터를 직접적으로 수정할 수 없음, 비동기 동작
    // context 객체 데이터를 호출하여 사용할 수 있음 
    actions: { 
        // OPENWEATHER API 데이터 호출
        async FETCH_OPENWEATHER_API(context) {
            // context : 매개변수 전달
            try {
                const API_KEY = process.env.VUE_APP_API_KEY;
                const resp = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?id=1835848&appid=${API_KEY}&units=metric`
                );

                // 시간대별 날씨 데이터
                const initHourly = resp.data.list;
                const resultHourly = [];
                initHourly.forEach(hour => {
                    let data = { time:"", temp:"", humidity:"", image:"" };

                    data.time = hour.dt;
                    data.temp = Math.round(hour.main.temp);
                    data.humidity = hour.main.humidity;

                    const weatherIcon = hour.weather[0].icon;
                    data.image = `src/assets/images/${weatherIcon}.png`;
                    resultHourly.push(data);
                });

                context.commit("SET_CITYNAME", resp.data.city.name); // 지역 이름
                context.commit("SET_CURRENT_WEATHER", resp); // 현재 날씨 데이터
                context.commit("SET_TIMELY_WEATHER", resultHourly); // 시간대별 날씨 데이터
            } catch (error) {
                console.log(error);
            }
        },

    }
};