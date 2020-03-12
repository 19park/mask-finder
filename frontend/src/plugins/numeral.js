import Vue from 'vue';
import numeral from 'numeral';

// 값이 null 인 경우 format() 으로 표시할 정보
numeral.nullFormat('');
// numeral.nullFormat('N/A');

numeral.defaultFormat('0,0.[00]');

Vue.prototype.$n = numeral;
