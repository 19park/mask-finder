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
                                :value="search.city"
                                @input="updateCity"
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
                                :value="search.district"
                                @input="updateDistrict"
                                @change="doFetchMask"
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
                                :value="search.neigh"
                                @input="updateNeigh"
                                @change="doFetchMask"
                                :items="getNeigh"
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
                    @click="doOpenDetail(item)"
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

        <Detail ref="detailView"/>
    </v-container>
</template>

<script>
    import {mapState} from 'vuex';
    import {
        mask,
        area
    } from '@/api';

    // detail view
    import Detail from '@/pages/Detail';

    export default {
        name: "Main",
        data() {
            return {
                overlay: false,
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
            ...mapState(['search']),
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
                this.$store.commit('SET_DISTRICT', null);
                this.$store.commit('SET_NEIGH', null);
                this.area.district = [];
                this.area.neigh = [];
                this.list.items = [];

                if (val) this.doFetchDistrict();
            },
            'search.district'(val) {
                this.$store.commit('SET_NEIGH', null);
                this.area.neigh = [];

                if (val) this.doFetchNeigh();
            }
        },
        components: {
            Detail
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
                return area
                    .fetchCity()
                    .then(res => res.data)
                    .then(list => {
                        if (list.length) {
                            this.area.city = list;
                        } else {
                            this.area.city = [];
                        }
                    }).catch(console.log);
            },
            // 시, 군 정보 가져오기
            doFetchDistrict() {
                return area
                    .fetchDistrict(this.search.city)
                    .then(res => res.data)
                    .then(list => {
                        if (list.length) {
                            this.area.district = list;
                        } else {
                            this.area.district = [];
                        }
                    }).catch(console.log);
            },
            // 읍면동 정보 가져오기
            doFetchNeigh() {
                return area
                    .fetchNeigh(this.search.district)
                    .then(res => res.data)
                    .then(list => {
                        if (list.length) {
                            this.area.neigh = list;
                        } else {
                            this.area.neigh = [];
                        }
                    }).catch(console.log);
            },

            updateCity(e) {
                this.$store.commit('SET_CITY', e);
            },

            updateDistrict(e) {
                this.$store.commit('SET_DISTRICT', e);
            },

            updateNeigh(e) {
                this.$store.commit('SET_NEIGH', e);
            },

            // 판매처 상세정보
            doOpenDetail(item) {
                this.$refs.detailView.doOpen(item);
            }
        },
        async created() {
            await this.doFetchCity();
            await this.doFetchDistrict();
            await this.doFetchNeigh();

            this.doFetchMask();
        }
    };
</script>

<style scoped>

</style>
