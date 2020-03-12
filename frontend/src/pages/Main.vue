<template>
    <v-container fluid>
        <v-card
            class="mx-auto"
        >
            <v-card-text>
                <v-container fluid>
                    <v-row align="center">
                        <v-col class="d-flex" cols="12" sm="4">
                            <v-select
                                v-model="search.city"
                                :items="getCity"
                                item-text="AREA_NAME1"
                                item-value="TYPE_CODE1"
                                label="시·도"
                                hide-details
                                outlined
                            ></v-select>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="4">
                            <v-select
                                v-model="search.district"
                                :items="getDistrict"
                                item-text="AREA_NAME2"
                                item-value="TYPE_CODE2"
                                label="시·군·구"
                                hide-details
                                outlined
                            ></v-select>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="4">
                            <v-select
                                v-model="search.neigh"
                                :items="getNeigh"
                                @change="doFetchMask"
                                item-text="AREA_NAME3"
                                item-value="TYPE_CODE3"
                                label="읍·면·동"
                                hide-details
                                outlined
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
        <v-list three-line>
            <v-subheader>마스크 판매처 정보</v-subheader>
            <v-list-item v-if="!list.items.length">
                <v-list-item-content>
                    <v-list-item-title>조회결과가 없습니다.</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <template v-for="(item, index) in list.items">
                <v-list-item
                    :key="item.code"
                    @click="() => {}"
                >
                    <v-list-item-content>
                        <v-list-item-title>{{item.name}}</v-list-item-title>
                        <v-list-item-subtitle v-html="item.addr"></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-list-item-action-text>
                            <span v-if="getStatCount(item.remain_stat)">{{`${getStatCount(item.remain_stat)}개 이상`}}</span>
                        </v-list-item-action-text>
                        <v-icon
                            v-if="getStatColor(item.remain_stat)"
                            :color="getStatColor(item.remain_stat)"
                        >
                            star_border
                        </v-icon>
                    </v-list-item-action>
                </v-list-item>
                <v-divider
                    :key="index"
                ></v-divider>
            </template>
        </v-list>

        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </v-container>
</template>

<script>
    import {
        mask,
        area
    } from '@/api';

    export default {
        name: "Main",
        data() {
            return {
                overlay: false,
                search: {
                    city: null,
                    district: null,
                    neigh: null
                },
                area: {
                    city: [],
                    district: [],
                    neigh: []
                },
                list: {
                    items: []
                }
            };
        },
        computed: {
            getCity() {
                const getList = this.area.city;
                getList.unshift({TYPE_CODE1: null, AREA_NAME1: '선택하세요'});
                return getList;
            },
            getDistrict() {
                const getList = this.area.district;
                getList.unshift({TYPE_CODE2: null, AREA_NAME2: '선택하세요'});
                return getList;
            },
            getNeigh() {
                const getList = this.area.neigh;
                getList.unshift({TYPE_CODE3: null, AREA_NAME3: '전체'});
                return getList;
            }
        },
        watch: {
            'search.city'(val) {
                this.search.district = null;
                this.search.neigh = null;
                this.list.district = [];
                this.list.neigh = [];

                if (val) this.doFetchDistrict(val);
            },
            'search.district'(val) {
                this.search.neigh = null;
                this.list.neigh = [];

                this.doFetchMask();
                if (val) this.doFetchNeigh(val);
            }
        },
        methods: {
            getStatCount(stat) {
                switch (stat) {
                    case "plenty": return 100;
                    case "some": return 30;
                    case "few": return 2;
                    case "empty": return 0;
                    default: return null;
                }
            },
            getStatColor(stat) {
                switch (stat) {
                    case "plenty": return 'green';
                    case "some": return 'yellow';
                    case "few": return 'red';
                    case "empty": return '';
                }
            },

            // 마스크 정보 가져오기
            doFetchMask() {
                let address = '';
                const {city, district, neigh} = this.search;
                const getCity = city && this._.find(this.area.city, (e) => e.TYPE_CODE1 === city);
                const getDistrict = district && this._.find(this.area.district, (e) => e.TYPE_CODE2 === district);
                const getNeigh = neigh && this._.find(this.area.neigh, (e) => e.TYPE_CODE3 === neigh);
                if (getCity) address += getCity.AREA_NAME1;
                if (getDistrict) address += ` ${getDistrict.AREA_NAME2}`;
                if (getNeigh) address += ` ${getNeigh.AREA_NAME3}`;

                this.overlay = true;
                mask
                    .fetchByAddr({address})
                    .then(res => res.data)
                    .then(items => {
                        if (items.stores.length > 0) {
                            this.list.items = items.stores.sort((a, b) => this.getStatCount(b.remain_stat) - this.getStatCount(a.remain_stat));
                        } else {
                            this.list.items = [];
                        }
                    }).catch(console.log)
                    .finally(() => {
                        this.overlay = false;
                    });
            },

            // 시,도 정보 가져오기
            doFetchCity() {
                area
                    .fetchCity()
                    .then(res => res.data)
                    .then(async (list) => {
                        if (list.length) {
                            this.search.city = list[0].TYPE_CODE1;
                            this.area.city = list;

                            this.doFetchDistrict(list[0].TYPE_CODE1);
                        }
                    }).catch(console.log);
            },
            // 시, 군 정보 가져오기
            doFetchDistrict(code) {
                area
                    .fetchDistrict(code)
                    .then(res => res.data)
                    .then(list => {
                        if (list.length) {
                            this.search.district = list[0].TYPE_CODE2;
                            this.area.district = list;
                        }
                    }).catch(console.log);
            },
            // 읍면동 정보 가져오기
            doFetchNeigh(code) {
                area
                    .fetchNeigh(code)
                    .then(res => {
                        this.area.neigh = res.data;
                    }).catch(console.log);
            }
        },
        created() {
            this.doFetchCity();
        }
    };
</script>

<style scoped>

</style>
