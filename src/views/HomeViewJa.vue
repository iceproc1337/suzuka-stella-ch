<script setup>
import Description from './HomeView/ja/Description.vue';
import Introduction from './HomeView/ja/Introduction.vue';
import Profile from './HomeView/ja/Profile.vue';

</script>

<template>
  <div class="full-body-bg"></div>
  <div class="rounded-2 h-100 overflow-y-scroll">
    <div id="home" class="d-flex w-100 justify-content-center flex-column">
      <div class="container fluid">
        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-2">
          <div class="col d-flex justify-content-center" style="flex-basis: 1;">
            <img src="@/assets/img/suzuka-stella-full-body-portrait.webp" alt="full body portrait of Suzuka Stella"
              style="max-width: 100%; object-fit: contain;" />
          </div>
          <div class="col" style="flex-basis: 1;">
            <div class="text-center pt-2 serif bold-600">
              <div class="fs-1">Suzuka Stella</div>
              <div class="fs-5">鈴花ステラ🔔</div>
            </div>
            <div class="fs-4">
              <Introduction></Introduction>
            </div>
            <hr class="my-2" />
            <div class="fs-5">
              <Description></Description>
            </div>
            <div class="fs-6 mt-2">
              <Profile></Profile>
            </div>
            <hr class="my-2" />
            <div class="d-flex justify-content-center">
              <img src="@/assets/img/suzuka-stella-live.webp"
                alt="one of the youtube video preview of suzuka stella live video stream" />
            </div>
            <div class="container text-center mt-2">
              <div class="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-2">
                <div class="col"><a href="https://www.youtube.com/@ch.suzukastella4142" target="_blank"
                    class="btn btn-outline-primary w-100 mb-2">YouTube</a></div>
                <div class="col"><a href="https://twitter.com/_suzukastella" target="_blank"
                    class="btn btn-outline-primary w-100 mb-2">Twitter</a></div>
                <div class="col"><a href="https://megalight.jp" target="_blank"
                    class="btn btn-outline-primary w-100 mb-2">めがらいと</a></div>
                <div class="col"><a href="https://twitter.com/hiyori_skr" target="_blank"
                    class="btn btn-outline-primary w-100 mb-2">イラストレーター</a></div>
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
