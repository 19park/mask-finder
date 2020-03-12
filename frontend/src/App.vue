<template>
    <div id="root">
        <v-fade-transition>
            <router-view/>
        </v-fade-transition>
    </div>
</template>

<script>
    export default {
        name: 'App'
    };
</script>
