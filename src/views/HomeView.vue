<script setup>
import { useI18nStore } from "@/stores/i18n";
const i18nStore = useI18nStore();
</script>

<template>
  <div class="full-body-bg"></div>
  <div class="rounded-2 h-100 overflow-y-scroll">
    <div id="home" class="d-flex w-100 justify-content-center flex-column">
      <div class="container fluid">
        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-2">
          <div class="col d-flex justify-content-center" style="flex-basis: 1;">
            <img class="w-100 h-auto" src="@/assets/img/suzuka-stella-full-body-portrait.webp"
              alt="full body portrait of Suzuka Stella" width="546" height="864" />
          </div>
          <div class="col" style="flex-basis: 1;">
            <div class="text-center pt-2 serif bold-500">
              <div class="fs-1">Suzuka Stella</div>
              <div class="fs-5">鈴花ステラ🔔</div>
            </div>
            <div class="fs-4">
              <div>{{ i18nStore.t("home.introduction1") }}</div>
              <div>{{ i18nStore.t("home.introduction2") }}</div>
              <div>{{ i18nStore.t("home.introduction3") }}</div>
            </div>
            <hr class="my-2" />
            <div class="fs-5">
              <div>{{ i18nStore.t("home.description1") }}</div>
              <div>{{ i18nStore.t("home.description2") }}</div>
            </div>
            <div class="fs-6 mt-2">
              <div>{{ i18nStore.t("home.profile1") }}</div>
              <div>{{ i18nStore.t("home.profile2") }}</div>
              <div>{{ i18nStore.t("home.profile3") }}</div>
              <div>{{ i18nStore.t("home.profile4") }}</div>
              <div>{{ i18nStore.t("home.profile5") }}</div>
            </div>
            <hr class="my-2" />
            <div class="d-flex justify-content-center">
              <img src="@/assets/img/suzuka-stella-live.webp"
                alt="one of the youtube video preview of suzuka stella live video stream" width="320" height="180" />
            </div>
            <div class="container text-center mt-2">
              <div class="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-2">
                <div class="col"><a href="https://www.youtube.com/@ch.suzukastella4142" target="_blank"
                    class="btn btn-outline-primary w-100 mb-2">YouTube</a></div>
                <div class="col"><a href="https://twitter.com/_suzukastella" target="_blank"
                    class="btn btn-outline-primary w-100 mb-2">Twitter</a></div>
                <div class="col"><a href="https://megalight.jp" target="_blank"
                    class="btn btn-outline-primary w-100 mb-2">{{ i18nStore.t("home.megalight") }}</a></div>
                <div class="col"><a href="https://twitter.com/hiyori_skr" target="_blank"
                    class="btn btn-outline-primary w-100 mb-2">{{ i18nStore.t("home.illustrator") }}</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.full-body-bg {
  background-image: url("@/assets/img/suzuka-stella-full-body-portrait.webp");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100%;
  background-position-y: 40px;
  opacity: 0.2;
  z-index: -1;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.section-header {
  transform: skewX(-5deg);
  background: radial-gradient(#e67771, #beaab4);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
