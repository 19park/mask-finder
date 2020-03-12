import axios from 'axios';

export const SETTINGS = {
    DOMAIN: '/api',
    UNAUTHORIZED: 401
};

// 기본 타임아웃
axios.defaults.timeout = 1000000;
axios.defaults.withCredentials = true;

export default {
    request (settings) {
        const GET_URL = settings.url;
        // 공공api가 아닌경우 url앞에 /api 추가
        if (!GET_URL.match('/openapi/')) {
            settings.url = SETTINGS.DOMAIN + GET_URL;
        }

        return axios(settings)
            .then(result => result)
            .catch(err => {
                throw err;
            });
    }
};
