<script setup>
</script>

<template>
  <div style="height: 64px;" class="d-block"></div>
  <nav id="navbar" class="navbar fixed-top navbar-expand-lg bg-white nav-shadow m-0 p-0">
    <div class="container-fluid p-0 align-items-stretch">
      <div class="navbar-brand d-flex justify-content-center align-items-center m-0 p-0">
        <div class="btn btn-light py-1 px-2 me-2 h-100 rounded-0 d-flex justify-content-center align-items-center">
          <a class="rounded-circle">
            <img src="@/assets/img/suzucastella.png" height="48" width="48" class="rounded-5" />
          </a>
          <span class="ms-2 fs-5 font-weight-bold">Suzuka Stella</span>
        </div>
      </div>
      <button class="navbar-toggler p-0 m-2" style="width: 48px; height: 42px; z-index: 1;" type="button"
        data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-center align-items-center" id="navbarSupportedContent">
        <ul class="navbar-nav bg-white justify-content-center align-items-center fs-5">
          <li class="nav-item nav-item-fixed-width">
            <a class="nav-link btn btn-light px-2 mx-1 rounded-0 d-flex justify-content-center align-items-center"
              aria-current="page" href="#home">Home</a>
          </li>
          <li class="nav-item nav-item-fixed-width">
            <a class="nav-link btn btn-light px-2 mx-1 rounded-0 d-flex justify-content-center align-items-center"
              href="#video">Video</a>
          </li>
        </ul>
        <hr class="m-0" />
        <div class="d-flex align-items-center justify-content-center ms-auto me-2">
          <div class="dropdown fixed-width-dropdown my-2">
            <a class="btn dropdown-toggle fixed-width-dropdown" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              <i class="bi bi-globe"></i> 日本語
            </a>
            <ul class="dropdown-menu dropdown-menu-end text-center">
              <li><a class="dropdown-item" href="#">日本語</a></li>
              <li><a class="dropdown-item" href="#">English</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div class="full-body-bg"></div>
  <div class="w-100 ps-2 pt-2 position-absolute">
    <nav
      style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);"
      aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Suzuka Stella</li>
      </ol>
    </nav>
  </div>
  <div data-bs-spy="scroll" data-bs-target="#navbar" data-bs-smooth-scroll="true" class="scrollspy-example rounded-2"
    tabindex="0">
    <div id="home" class="d-flex w-100 justify-content-center flex-column">
      <div class="container fluid">
        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-2">
          <div class="col d-flex justify-content-center">
            <img src="@/assets/img/full-body.png" style="max-width: 100%; object-fit: contain;" />
          </div>
          <div class="col">
            <div class="text-center pt-2">
              <div class="fs-1">Suzuka Stella</div>
              <div class="fs-5">鈴花ステラ🔔</div>
            </div>
            <div class="fs-4">
              <div>「Konsute～！」</div>
              <div>I’m Suzu Castella’s virtual fairy.</div>
              <div>I've come to your world because I want to do gaming and singing.</div>
            </div>
            <hr />
            <div class="fs-5">
              <div>She opened her Twitter account on 23 April 2020 while her YouTube channel was created on 26 January
                2021. Her introduction video was uploaded on 5 February 2021.</div>
              <div>Stella graduated from Megalight Production due to physical health problems. She held her farewell
                stream at 1 April 2022.</div>
            </div>
            <div class="fs-6 mt-3">
              <div>【Debut date】2021/2/5</div>
              <div>【Birthday】December 20</div>
              <div>【Height】154cm</div>
              <div>【Likes】Singing, anime, games, drums, macaroons, shrimps, beef tongue</div>
              <div>【Dislikes】Carrots</div>
            </div>
            <hr />
            <div class="d-flex justify-content-center">
              <img src="@/assets/img/stella-live.webp" class="w-100" />
            </div>
            <div class="container text-center mt-2">
              <div class="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-2">
                <div class="col"><a href="https://www.youtube.com/@ch.suzukastella4142" target="_blank"
                    class="btn btn-outline-primary w-100 mb-2">YouTube</a></div>
                <div class="col"><a href="https://twitter.com/_suzukastella" target="_blank"
                    class="btn btn-outline-primary w-100 mb-2">Twitter</a></div>
                <div class="col"><a href="https://megalight.jp" target="_blank"
                    class="btn btn-outline-primary w-100 mb-2">Megalight</a></div>
                <div class="col"><a href="https://twitter.com/hiyori_skr" target="_blank"
                    class="btn btn-outline-primary w-100 mb-2">illustrator</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="video" class="d-flex w-100 justify-content-center flex-column">
      <div class="ps-3 pt-3 d-flex justify-content-center align-items-center mb-2 flex-column">
        <span class="fs-1 section-header font-weight-bolder">SONGS</span>
        <hr class="m-1" style="width: 120px; border-top: 4px solid black !important;" />
      </div>
      <div class="aspect-ratio">
        <iframe width="560" height="315"
          src="https://www.youtube-nocookie.com/embed/videoseries?list=PLS5l9a0eM_R4Wsl-jYCIpYnSTMcnewSTa"
          title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>

<style>
.full-body-bg {
  background-image: url("@/assets/img/full-body.png");
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

/* This element defines the size the iframe will take.
   In this example we want to have a ratio of 25:14 */
.aspect-ratio {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  /* The height of the item will now be 56.25% of the width. */
}

/* Adjust the iframe so it's rendered in the outer-width and outer-height of it's parent */
.aspect-ratio iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.fixed-width-dropdown {
  width: 120px;
}

.fixed-width-dropdown .dropdown-menu {
  width: 120px;
  --bs-dropdown-min-width: 120px;
}

.nav-shadow {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2);
}

.nav-item-fixed-width {
  width: 80px;
}

#navbarSupportedContent .nav-link,
#navbarSupportedContent .nav-item,
#navbarSupportedContent .btn {
  width: 100%;
  margin: 0 !important;
}

.section-header {
  transform: skewX(-5deg);
  background: radial-gradient(#e67771, #beaab4);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
