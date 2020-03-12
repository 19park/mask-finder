<template>
    <v-container
            fill-height
            style="height: calc(100vh - 58px);"
    >
        <v-layout align-center>
            <v-flex text-xs-center>
                <h1 class="display-2 primary--text mb-3">Whoops, 404</h1>
                <p>요청하신 페이지가 존재하지 않습니다.</p>
                <v-btn
                        @click="goToMain"
                        outline
                        color="primary"
                >
                    메인으로 이동
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: 'NotFound',
        props: {
            lang: {
                type: String,
                default: 'ko'
            }
        },
        created () {
            this.$ssrContext && this.$ssrContext.res.status(404);
        },
        methods: {
            goToMain () {
                this.$router.replace("/");
            }
        }
    };
</script>
