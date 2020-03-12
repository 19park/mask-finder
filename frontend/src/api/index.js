import api from '@/api/common';

function jsonToQueryString(json) {
    if (!json) return '';
    return '?' +
        Object.keys(json).map(function (key) {
            if (json[key] instanceof Array) {
                let query = [];
                for (let i = 0;i < json[key].length;i++) {
                    query.push(encodeURIComponent(key) + '=' +
                             encodeURIComponent(json[key][i]));
                }
                return query.join('&');
            } else {
                return encodeURIComponent(key) + '=' +
                    encodeURIComponent(json[key]);
            }
        }).join('&');
}

export const mask = {
    fetchByAddr(data) {
        return api.request({
            method: 'get',
            url: `/openapi/storesByAddr/json${jsonToQueryString(data)}`
        });
    }
};

export const area = {
    fetchCity() { // 시 정보
        return api.request({
            method: 'get',
            url: `/area/1`
        });
    },
    fetchDistrict(code) { // 구 정보
        return api.request({
            method: 'get',
            url: `/area/2?code=${code}`
        });
    },
    fetchNeigh(code) { // 동 정보
        return api.request({
            method: 'get',
            url: `/area/3?code=${code}`
        });
    }
};

export default mask;
