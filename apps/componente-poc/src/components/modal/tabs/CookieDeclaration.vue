<template>
    <div>
        <h4 class="cli-privacy-content-text"> Declaração de Uso de Cookies </h4>
        <div class="cli-privacy-content-text" v-html="Texto">

        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Prop } from 'vue-property-decorator';
    @Component
    export default class CookieDeclaration extends Vue{
        @Prop() readonly Texto:string= "";
    }
</script>
<style scoped>
    @import "../../../assets/styles/Modal/index.scss";
</style>