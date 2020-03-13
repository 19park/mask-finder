<template>
    <v-container dark fluid>
        <v-alert type="warning">
            서비스되는 재고 현황 정보는 데이터 처리 및 전송으로 인해 실제 현장 판매처의
            현황과 5분~10분 정도의 차이가 있음을 참고해주세요!
        </v-alert>
        <v-alert type="info">
            또한 일부 약국에서는 번호표 배부 후 판매하는 약국도 있어 서비스되는
            정보가 번호표 배부 현황을 반영하지는 못하고 있습니다.
        </v-alert>

        <v-alert
            border="left"
            colored-border
            color="green accent-4"
            elevation="2"
        >
            <p>마스크 현황 정보는 성인용 마스크를 대상으로 합니다.</p>
            <p>마스크 재고 현황은 4단계 구간 정보로 제공합니다.</p>
            <ul>
                <li>100개 이상 : 충분 * 녹색</li>
                <li>100개 미만(99개~30개) : 보통 * 노랑색</li>
                <li>30개 미만(29개~2개) : 부족 * 빨강색</li>
                <li>1개 ~ 0개 : 없음 또는 판매전 : * 회색</li>
            </ul>
            <p><br/></p>
            <p>
                - 식약처 공적마스크 구매 안내 :
                <a href="http://blog.naver.com/kfdazzang/221839489769" target="_blank">http://blog.naver.com/kfdazzang/221839489769</a>
            </p>
        </v-alert>

        <v-alert
            outlined
            color="white"
        >
            <div class="title">감사의 말씀</div>
            <div class="mb-3">어려운 환경에서도 일선에서 공헌해 주시는 약사님, 우체국 종사자분, 하나로 마트(예정) 분들께도 감사와 응원을 드립니다.</div>
            <div>- 데이터는 NIA의 공공데이터포털에서 지원해주셨습니다.</div>
            <div>- 지도 API는 KAKAO(map api)에서 지원해주셨습니다.</div>
        </v-alert>
    </v-container>
</template>

<script>
    export default {
        name: "About"
    };
</script>

<style scoped>

</style>
