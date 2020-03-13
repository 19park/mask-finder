<template>
    <v-bottom-sheet v-model="sheet"
                    :eager="true"
                    persistent
    >
        <v-sheet style="border-top: 2px solid #fff;">
            <v-card class="mx-auto">
                <v-list-item>
                    <v-list-item-avatar :color="$parent.getStatColor(item.remain_stat) || 'grey'"></v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="headline">{{item.name}}</v-list-item-title>
                        <v-list-item-subtitle>입고시간: {{item.stock_at}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn icon
                               :large="true"
                               @click="doClose">
                            <v-icon color="red">clear</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>

                <v-card-text class="pb-0">
                    <h3 style="color: #fff;">{{`재고 - ${$parent.getStatCount(item.remain_stat)}개 이상`}}</h3>
                </v-card-text>
                <v-card-text>{{item.addr}}</v-card-text>

                <v-card-text>
                    <div id="map" ref="mapContainer" style="width:100%;height:300px;"></div>
                </v-card-text>
            </v-card>
        </v-sheet>
    </v-bottom-sheet>
</template>

<script>
    export default {
        name: "Detail",
        data() {
            return {
                sheet: false,

                map: null,
                item: {
                    name: null,
                    addr: null,
                    remain_stat: null,
                    lat: null,
                    lng: null
                }
            };
        },
        methods: {
            doOpen(item) {
                this.sheet = true;
                this.item = item;

                this.$nextTick(async () => {
                    const container = this.$refs.mapContainer;
                    const getLatLng = new kakao.maps.LatLng(item.lat, item.lng);
                    const mapOptions = {
                        center: getLatLng,
                        level: 3
                    };
                    this.map = new kakao.maps.Map(container, mapOptions);

                    const {default: imageSrc} = await import('@/assets/mask.png'),
                        imageSize = new kakao.maps.Size(64, 69),
                        imageOption = {offset: new kakao.maps.Point(27, 69)};

                    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
                    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

                    // 마커생성
                    const marker = new kakao.maps.Marker({
                        position: getLatLng,
                        image: markerImage
                    });

                    // 마커가 지도 위에 표시되도록 설정
                    marker.setMap(this.map);
                });
            },
            doClose() {
                this.sheet = false;

                // remove map
                this.map = null;
                const container = this.$refs.mapContainer;
                while (container.lastElementChild) {
                    container.removeChild(container.lastElementChild);
                }
            }
        }
    };
</script>

<style scoped>

</style>
