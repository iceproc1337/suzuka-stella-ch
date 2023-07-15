<script setup>
import { RouterView } from 'vue-router';
import { useI18nStore } from './stores/i18n';
const i18nStore = useI18nStore();

</script>

<template>
  <div style="height: 58px; flex-shrink: 0;" class="d-block w-100"></div>
  <nav id="navbar" class="navbar fixed-top navbar-expand-lg bg-light nav-shadow m-0 p-0">
    <div class="container-fluid p-0 align-items-stretch">
      <div class="navbar-brand d-flex justify-content-center align-items-center m-0 p-0">
        <a class="btn btn-light py-1 px-2 me-2 h-100 rounded-0 d-flex justify-content-center align-items-center" href=".">
          <div class="rounded-circle" href="#">
            <img src="@/assets/img/suzu-castella.webp" alt="pixelated suzu castella icon" height="48" width="48"
              class="rounded-5" />
          </div>
          <span class="ms-2 fs-5 font-weight-bold bold-500">{{i18nStore.t("app.suzuka.stella")}}</span>
        </a>
      </div>
      <button class="navbar-toggler btn btn-light p-0 m-2" style="width: 48px; height: 42px; z-index: 1;" type="button"
      data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse justify-content-center align-items-center" id="navbarSupportedContent">
      <!--
        <ul class="navbar-nav bg-white justify-content-center align-items-center fs-5">
          <li class="nav-item nav-item-fixed-width">
            <a class="nav-link btn btn-light px-2 mx-1 rounded-0 d-flex justify-content-center align-items-center"
              aria-current="page" href="/live">Live</a>
            </li>
            <li class="nav-item nav-item-fixed-width">
              <a class="nav-link btn btn-light px-2 mx-1 rounded-0 d-flex justify-content-center align-items-center"
                href="/">Intro</a>
            </li>
          </ul>
          -->
        <hr class="m-0" />
        <div class="d-flex align-items-center justify-content-center ms-auto me-2">
          <div class="dropdown fixed-width-dropdown my-2" style="width: 110px;">
            <a class="btn btn-white dropdown-toggle fixed-width-dropdown" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              <i class="bi bi-globe"></i> {{ i18nStore.t("app.lang") }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end text-center">
              <li><a class="dropdown-item" href="/ja/">日本語</a></li>
              <li><a class="dropdown-item" href="/en/">English</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div class="w-100" style="overflow-y: hidden; flex-grow: 1;">
    <RouterView />
  </div>
</template>

<style scoped>
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
</style>
