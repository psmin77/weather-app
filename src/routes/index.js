import { createRouter, createWebHashHistory } from "vue-router";
import Home from "~/pages/Home";

export default createRouter({
    // hash 모드: 특정 페이지에서 새로고침 했을 때, '페이지를 찾을 수 없음' 메시지 방지
    history: createWebHashHistory(),

    // pages
    routes: [
        {
            path: "/",
            name: Home,
            component: Home, 
        }
    ]  
})