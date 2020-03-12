<template>
    <v-container fluid>
        <v-list three-line>
            <v-subheader>마스크 판매처 정보</v-subheader>
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
                        <v-list-item-action-text>{{item.remain_stat | formatStat}}</v-list-item-action-text>
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
    </v-container>
</template>

<script>
    import {mask} from '@/api';

    export default {
        name: "Main",
        data() {
            return {
                search: {
                    city: [],
                    district: [],
                    neigh: []
                },
                list: {
                    items: []
                }
            };
        },
        filters: {
            formatStat(stat) {
                switch (stat) {
                    case "plenty": return '100개 이상';
                    case "some": return '30개이상';
                    case "few": return '2개이상';
                    case "empty": return '';
                }
            }
        },
        methods: {
            getStatColor(stat) {
                switch (stat) {
                    case "plenty": return 'green';
                    case "some": return 'yellow';
                    case "few": return 'red';
                    case "empty": return '';
                }
            }
        },
        created() {
            mask
                .fetchByAddr({
                    address: '서울특별시 은평구 불광동'
                })
                .then(res => {
                    console.log(res.data);
                    this.list.items = res.data.stores;
                }).catch(console.log);
        }
    };
</script>

<style scoped>

</style>
