<script setup>
import HomeView from "./HomeView.vue";
import { useI18nStore } from "@/stores/i18n";

const i18nStore = useI18nStore();
i18nStore.setLang("ja");
</script>

<template>
  <HomeView></HomeView>
</template>
