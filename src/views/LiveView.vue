<script setup>
let { onMounted } = Vue;

onMounted(() => {
  const player = new Plyr('#player', {
    debug: true
  });
  player.on('ended', (event) => {
    const instance = event.detail.plyr;
    instance.stop();
  });
});

</script>
<template>
  <div class="container-fluid p-4">
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-3 row-cols-xl-3">
      <div class="col col-lg-8 col-xl-9">
        <div class="aspect-ratio-wrapper mb-2">
          <div id="player" data-plyr-provider="youtube" data-plyr-embed-id="bTqVqk7FSmY"></div>
        </div>
        <div>
          <h1 class="fs-5 fw-bold">【オリジナル曲】七色ジェット彗星【鈴花ステラ/めがらいと】</h1>
        </div>
        <div class="my-3">
          <div class="d-flex justify-content-between">
            <div class="d-flex">
              <a class="btn rounded-circle p-0 d-flex justify-content-center align-items-center"
                style="width: 40px; height: 40px;" href="#">
                <img class="rounded-circle" width="40" height="40" src="@/assets/img/icon.jpg"
                  alt="circular thumbnail icon of Suzuka Stella channel">
              </a>
              <div class="ms-2">
                <div class="fw-bold">鈴花ステラ Ch. / Suzuka Stella</div>
                <div><small>60.4K subscribers</small></div>
              </div>
              <div class="ms-4">
                <a class="btn btn-secondary rounded-pill">Subscribe</a>
              </div>
            </div>
            <div class="d-flex">
              <div>
                <div class="btn-group" role="group">
                  <button type="button"
                    class="btn btn-light rounded-start-pill d-flex justify-content-center align-items-center"><span
                      class="material-symbols-outlined">thumb_up</span>1.5K</button>
                  <button type="button"
                    class="btn btn-light rounded-end-pill d-flex justify-content-center align-items-center border-start"><span
                      class="material-symbols-outlined">thumb_down</span></button>
                </div>
              </div>
              <div class="ms-2">
                <a class="btn btn-light rounded-pill">Share</a>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-light">
          51,628 views Aug 20, 2021 #ステライブ #ステラの絵画 #鈴花ステラ
        </div>
      </div>
      <div class="col col-lg-4 col-xl-3">
        <div class="d-flex flex-column bg-warning rounded" style="height: 640px;">
          <div class="d-flex flex-shrink-0 justify-content-between">
            <div class="dropdown">
              <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Live chat replay
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Live chat replay</a></li>
              </ul>
            </div>
            <div class="dropdown">
              <button class="btn btn-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-three-dots-vertical"></i>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Toggle timestamp</a></li>
              </ul>
            </div>
          </div>
          <div class="superchat-row overflow-x-scroll flex-shrink-0">

          </div>
          <div class="chat-list flex-grow-1">

          </div>
          <div class="flex-shrink-0">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.aspect-ratio-wrapper {
  aspect-ratio: 16 / 9;
}
</style>
