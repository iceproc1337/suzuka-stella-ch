<script setup>
import HomeView from "./HomeView.vue";
import { useI18nStore } from "@/stores/i18n";
import TestComponent from "@/components/TestComponent.vue";

let { ref } = Vue;
let test = ref(null);

const i18nStore = useI18nStore();
i18nStore.setLang("en");
</script>

<template>
  <TestComponent ref="test"></TestComponent>
</template>
