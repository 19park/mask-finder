import Vue from 'vue';
import _get from 'lodash/get';
import moment from 'moment';
import moment_timezone from 'moment-timezone';

let timer;
const common = {};

common.install = function (Vue) {
    /**
     * 전역 공통 함수
     */
    const common = {
        /**
         * err객체를 받아서 구조에 따라서 message를 찾기위함
         * @param err
         * @returns {string|*|T}
         */
        parseErrorMsg(err) {
            let msg = '';

            if (!err.response) {
                msg = err?.data || err?.message;
            } else {
                const res = err.response;
                if (res.status === 403) {
                    // access denied handling
                    msg = '권한이 없어 해당 기능을 사용할 수 없습니다.';
                } else {
                    if (res?.data) {
                        const getData = res.data;
                        msg = this.parseDetailMessage(getData);
                    } else {
                        msg = `${res.status} : ${res?.statusText}<br/>서버관리자에게 문의하세요.`;
                    }
                }
            }
            return msg;
        },

        parseDetailMessage(data) {
            if (data.details) {
                let tmpErrTxt = '';
                data.details?.forEach((v, k) => {
                    if (k > 0) {
                        tmpErrTxt += '<br/>';
                    }
                    tmpErrTxt += v.message;
                });
                return data.message + '<br/>' + tmpErrTxt;
            } else if (data.message) {
                return data.message;
            } else {
                return data;
            }
        },

        // resize callback
        debounce(func, time = 300) {
            (function (event) {
                if (timer) clearTimeout(timer);
                timer = setTimeout(func, time, event);
            })();
        },

        /**
         * 오늘날짜 가져오기
         * 기존 new Date().toISOString().substr(0, 10)로 인하여
         * 9시 이전엔 전날짜가 보이는 이슈발생
         * @returns {string}
         */
        getCurrentDate(d) {
            return moment_timezone(d).tz("Asia/Seoul").format('YYYY[-]MM[-]DD');
        },

        /**
         * 현재 년도 가져오기
         * @returns year
         */
        getCurrentYear() {
            return moment_timezone().tz("Asia/Seoul").year();
        },

        getFormatDate(d, isTime) {
            const params = isTime ? 'YYYY[-]MM[-]DD HH:mm:ss' : 'YYYY[-]MM[-]DD';

            return d ? moment_timezone(d).tz("Asia/Seoul").format(params) : null;
        },

        /**
         * 요일 텍스트 가져오기
         * @param d
         */
        getDayWeekText(d) {
            const getDay = moment_timezone(d).tz("Asia/Seoul").day();
            switch(getDay) {
                case 0: return '일';
                case 1: return '월';
                case 2: return '화';
                case 3: return '수';
                case 4: return '목';
                case 5: return '금';
                case 6: return '토';
            }
        },

        /**
         * 해당 월의 1일 날짜
         * @returns {string}
         */
        getStartMonthDate() {
            return moment_timezone().tz("Asia/Seoul").startOf('month').format('YYYY[-]MM[-]DD');
        },

        // 로딩 오버레이 리턴
        getLoader(self) {
            return self.$loading.show({
                container: self.$el,
                canCancel: false
            }, {
                // default: self.$createElement()
            });
        },

        // vuetify datepicker day format
        formatPickerDay(d) {
            if (!moment(d).isValid()) return null;
            return moment(d).format('D');
        },

        /**
         * 데이터, 프로퍼티 path 에 대하여 _get 을 이용 추출, numeraljs 을 이용하여 format 적용
         * @param data
         * @param propertyPath
         * @returns {*}
         */
        formatNumeral(data, propertyPath) {
            return Vue.prototype.$n(_get(data, propertyPath, null)).format();
        },

        /**
         * obj1 의 구조에 맞는 정보만 obj2 에서 복사하여 새로운 newObj 를 리턴
         * @param obj1 구조 오브젝트
         * @param obj2 정보 오브젝트
         * @returns obj1 구조를 따르며, obj2 의 정보를 가지는 newObj
         */
        copy(obj1, obj2) {
            let newObj = Vue.util.extend({}, obj1);
            Object.keys(newObj).forEach(key => {
                // console.debug('key = ', key)
                if (_get(newObj, key, {}) instanceof Object) {
                    newObj[key] = this.copy(newObj[key], _get(obj2, key, null));
                } else {
                    newObj[key] = _get(obj2, key, null);
                }
            });
            return newObj;
        },

        convertNullToEmpty(obj) {
            let newObj = Vue.util.extend({}, obj);
            Object.keys(newObj).forEach(key => {
                if (newObj[key] === null) newObj[key] = '';
            });
            return newObj;
        }

    };

    Vue.prototype.$common = common;
};

Vue.use(common);
