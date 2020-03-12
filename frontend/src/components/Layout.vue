<template>
    <v-app id="layout">
        <v-navigation-drawer
            v-model="drawer"
            app
            clipped
        >
            <v-list dense>
                <v-list-item link to="/">
                    <v-list-item-action>
                        <v-icon>mdi-view-dashboard</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>지역별 리스트</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/about">
                    <v-list-item-action>
                        <v-icon>info</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>About</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            app
            clipped-left
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
            <v-toolbar-title>마스크 찾기</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <v-fade-transition>
                <router-view/>
            </v-fade-transition>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: 'Layout',
        data() {
            return {
                drawer: null,
            };
        },
        created() {
            this.$vuetify.theme.dark = true;
        },
    };
</script>
