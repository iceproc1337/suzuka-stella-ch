<script setup>
import { useI18nStore } from "@/stores/i18n";
import chat from "@/assets/chat/lv5Sw-VtmzM-parsed.json";

const i18nStore = useI18nStore();
i18nStore.setLang("en");

let { onMounted, reactive } = Vue;
let pageReactive = reactive({ chatList: [] });
let parsedChat = chat.map((item) => {
  if (item.emotes) {
    for (let emote of item.emotes) {
      item.message = item.message.replaceAll(emote.name, `<img src="/${emote.url}">`);
    }
  }
  return item;
})
pageReactive.chatList.push(...parsedChat);

function setupVideoJsPlayer() {
  //Now setting up Player
  var player = videojs('player', {
    muted: true
  });
  player.ready(function () {
    var myPlayer = this;
    myPlayer.src({ type: 'video/youtube', src: 'https://www.youtube.com/watch?v=lv5Sw-VtmzM' });
    myPlayer.controlBar.progressControl.disable()
  });
  let isCurrentTimeLoaded = false;
  let startTime = new Date();
  startTime.setHours(0, 0);

  player.on('play', function () {
    var myPlayer = this;
    if (!isCurrentTimeLoaded) {
      isCurrentTimeLoaded = true;
      myPlayer.currentTime((new Date() - startTime) / 1000);
      myPlayer.muted(false);
    }
  });
  player.on('pause', function () {
    isCurrentTimeLoaded = false;
  });

  var Button = videojs.getComponent('Button');

  class NextButton extends Button {
    constructor(player, options) {
      super(player, options);
      // this.controlText("Exit Course");
      this.addClass('vjs-icon-next');
      this.addClass('material-symbols-outlined');
    }
    handleClick() {
      //console.log("clicked")
    }
  }

  class LiveButton extends Button {
    constructor(player, options) {
      super(player, options);
      this.controlText("Live");
      this.addClass('vjs-icon-live');
    }
  }

  class CurrentTimeButton extends Button {
    constructor(player, options) {
      super(player, options);
    }
    createEl(tag = 'button', props = {}, attributes = {}) {
      let el = super.createEl(tag, props, attributes);
      setInterval(function () {
        let currentTime = new Date();
        let hours = currentTime.getHours();
        let minutes = currentTime.getMinutes();
        let paddedHours = String(hours).padStart(2, '0');
        let paddedMinutes = String(minutes).padStart(2, '0');

        el.innerHTML = `${paddedHours}:${paddedMinutes}`;
      }, 1000);
      return el;
    }
  }

  class AutoPlayButton extends Button {
    constructor(player, options) {
      super(player, options);
      // this.controlText("Live");
      this.addClass('vjs-icon-autoplay');
      this.addClass('material-symbols-outlined');
    }
  }

  class CaptionButton extends Button {
    constructor(player, options) {
      super(player, options);
      // this.controlText("Live");
      this.addClass('vjs-icon-caption');
      this.addClass('material-symbols-outlined');
      this.disable();
    }
  }

  class SettingsButton extends Button {
    constructor(player, options) {
      super(player, options);
      // this.controlText("Live");
      this.addClass('vjs-icon-settings');
      this.addClass('material-symbols-outlined');
    }
  }
  class MiniPlayerButton extends Button {
    constructor(player, options) {
      super(player, options);
      // this.controlText("Live");
      this.addClass('vjs-icon-mini-player');
      this.addClass('material-symbols-outlined');
      this.disable();
    }
  }

  class TheaterButton extends Button {
    constructor(player, options) {
      super(player, options);
      // this.controlText("Live");
      this.addClass('vjs-icon-theater');
      this.addClass('material-symbols-outlined');
      this.disable();
    }
  }

  /*
  videojs.extend = function () {
    for (var i = 1; i < arguments.length; i++)
      for (var key in arguments[i])
        if (arguments[i].hasOwnProperty(key))
          arguments[0][key] = arguments[i][key];
    return arguments[0];
  }
  */

  videojs.registerComponent('nextButton', NextButton);
  player.getChild('controlBar').addChild('nextButton', {}, 1);
  videojs.registerComponent('liveButton', LiveButton);
  player.getChild('controlBar').addChild('LiveButton', {}, 6);
  videojs.registerComponent('currentTimeButton', CurrentTimeButton);
  player.getChild('controlBar').addChild('CurrentTimeButton', {}, 7);

  videojs.registerComponent('autoPlayButton', AutoPlayButton);
  player.getChild('controlBar').addChild('AutoPlayButton', {}, 12);
  videojs.registerComponent('captionButton', CaptionButton);
  player.getChild('controlBar').addChild('CaptionButton', {}, 13);
  videojs.registerComponent('settingsButton', SettingsButton);
  player.getChild('controlBar').addChild('SettingsButton', {}, 14);
  videojs.registerComponent('miniPlayerButton', MiniPlayerButton);
  player.getChild('controlBar').addChild('MiniPlayerButton', {}, 15);
  videojs.registerComponent('theaterButton', TheaterButton);
  player.getChild('controlBar').addChild('TheaterButton', {}, 16);
}

function loadScriptTag(id, src, integrity) {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) return resolve(); // was already loaded
    var scriptTag = document.createElement("script");
    scriptTag.src = src;
    scriptTag.id = id;
    scriptTag.integrity = integrity;
    scriptTag.crossOrigin = "anonymous";
    document.getElementsByTagName('head')[0].appendChild(scriptTag);
    scriptTag.onload = function () {
      resolve(scriptTag);
    }
    scriptTag.onerror = function () {
      reject(scriptTag);
    }
  })
}

onMounted(async () => {
  await loadScriptTag("video-js", "https://cdn.jsdelivr.net/npm/video.js@8.3.0/dist/video.min.js", "sha384-xOapVKf0v5CoOk/hvZ+tHVNIqWcwtrCouwlUHwJMGHO2qJrUBfS1CoTpZ9mF0E/a");
  await loadScriptTag("video-js-youtube-plugin", "https://cdn.jsdelivr.net/npm/videojs-youtube@3.0.1/dist/Youtube.min.js", "sha384-vOLaPd6nUReyIgR5TDrMPqrdQXrd7z4zE0stQlGgWmFDX0KK+kogJnS+qpM8OXil");
  await loadScriptTag("clusterize-js", "https://cdn.jsdelivr.net/npm/clusterize.js@1.0.0/clusterize.min.js", "sha384-G2Jussyj3rfkM+IYpQIVTW3qlGESWsGHN3gZoQHY118v3f1nTjbvb+bJgU61l1fd");

  setupVideoJsPlayer();

  var clusterize = new Clusterize({
    scrollId: 'scrollArea',
    contentId: 'contentArea'
  });
});

let isLive = false;

</script>
<template>
  <!-- non-blocking, preload CSS -->
  <link rel="preload"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    crossorigin="anonymous" as="style" onload="this.onload=null;this.rel='stylesheet'" />
  <link rel="preload" href="https://cdn.jsdelivr.net/npm/video.js@8.3.0/dist/video-js.min.css"
    integrity="sha384-rJdeIq+yGjo4ePy/Dog4rMs9LQTqvsXqrp/WefvZFWARKUZoGEsUVL80LST7ciLO" crossorigin="anonymous" as="style"
    onload="this.onload=null;this.rel='stylesheet'" />
  <link rel="preload" href="https://cdn.jsdelivr.net/npm/clusterize.js@1.0.0/clusterize.css"
    integrity="sha384-rnqKTaBQU6DL5cu2Db0+Ce+56QvvU1oxEaqE2zd49VJR1aBcXZ2GwBsPw3jBtfVX" crossorigin="anonymous" as="style"
    onload="this.onload=null;this.rel='stylesheet'" />
  <!-- load CSS for users without javascript -->
  <noscript>
    <link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/video.js@8.3.0/dist/video-js.min.css"
      integrity="sha384-rJdeIq+yGjo4ePy/Dog4rMs9LQTqvsXqrp/WefvZFWARKUZoGEsUVL80LST7ciLO" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/clusterize.js@1.0.0/clusterize.css"
      integrity="sha384-rnqKTaBQU6DL5cu2Db0+Ce+56QvvU1oxEaqE2zd49VJR1aBcXZ2GwBsPw3jBtfVX" crossorigin="anonymous" />
  </noscript>

  <div class="container-fluid p-4">
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-3 row-cols-xl-3">
      <div class="col col-lg-8 col-xl-9">
        <div class="aspect-ratio-wrapper mb-3 position-relative">
          <video id="player" class="video-js vjs-big-play-centered vjs-theme-youtube" controls preload="auto"
            fluid="true">
          </video>
          <img v-if="!isLive" class="position-absolute h-100 w-100" src="https://i.ytimg.com/vi/lv5Sw-VtmzM/maxresdefault.jpg" style="top: 0; left: 0;" />
          <div v-if="!isLive"
            class="position-absolute d-flex justify-content-center align-items-center p-2 rounded-3 bg-dark text-white opacity-85"
            style="bottom: 10px; left: 10px;">
            <span class="material-symbols-outlined px-2 fs-3 ms-1">
              sensors
            </span>
            <div class="mx-2" style="min-width: 180px;">
              <div class="fs-7">36:28</div>
              <div class="fs-8">7月8日 晚上23:00</div>
            </div>
            <button class="btn btn-secondary d-flex align-items-center ps-2 me-1">
              <span class="material-symbols-outlined me-2">
                notifications
              </span>
              Notify me</button>
          </div>
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
          <div class="d-flex flex-shrink-0 justify-content-between p-1">
            <div class="dropdown">
              <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Live chat replay
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Live chat replay</a></li>
              </ul>
            </div>
            <div class="dropdown">
              <button class="btn btn-light rounded-5" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-three-dots-vertical"></i>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Toggle timestamp</a></li>
              </ul>
            </div>
          </div>
          <div class="superchat-row overflow-x-scroll flex-shrink-0 p-1">
            <button type="button" class="btn btn-primary rounded-pill py-1 ps-1 pe-2 ms-2">
              <img class="rounded-5 bg-white" src="@/assets/logo.svg" width="24" height="24"> AU$100.00
            </button>
            <button type="button" class="btn btn-primary rounded-pill py-1 ps-1 pe-2 ms-2">
              <img class="rounded-5 bg-white" src="@/assets/logo.svg" width="24" height="24"> AU$100.00
            </button>
          </div>
          <div id="scrollArea" class="clusterize-scroll chat-list flex-grow-1 overflow-y-scroll px-2"
            style="max-height: unset;">
            <div id="contentArea" class="clusterize-content">
              <div class="d-flex flex-row align-items-center ps-2 my-1"
                v-for="{ author, message } of pageReactive.chatList">
                <img class="rounded-5 bg-white me-2" :src="`/author/${author.id}.jpg`" width="24" height="24">
                <span style="word-break: break-all;">
                  <span class="text-black-50">{{ author.name }}</span>
                  <span v-html="message" class="chat-message ms-2"></span>
                </span>
              </div>
            </div>
            <!--
            <div class="d-flex flex-row align-items-center ps-2 my-1" v-for="chat of pageReactive.chatList">
              <img class="rounded-5 bg-white me-2" :src="`/author/${chat.author.id}.jpg`" width="24" height="24">
              <span class="text-black-50">{{ chat.author.name }}</span>
              <span class="ms-2">message</span>
            </div>
            -->
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

/* Change all text and icon colors in the player. */
.vjs-theme-youtube.video-js {
  font-size: 100%;
}

.vjs-theme-youtube.video-js .vjs-control-bar {
  background-color: rgba(0, 0, 0, 0.2);
}

.vjs-theme-youtube.video-js .vjs-button {
  width: 3.8em;
}

.vjs-theme-youtube.video-js .vjs-control-bar::before {
  content: "";
  display: block;
  position: absolute;
  top: -4px;
  height: 4px;
  width: calc(100% - 24px);
  margin-left: 12px;
  margin-right: 12px;
  background-color: red;
  z-index: 1;
}

/* Change the border of the big play button. */
.vjs-theme-youtube .vjs-big-play-button {}

/* Change the color of various "bars". */
.vjs-theme-youtube .vjs-volume-level,
.vjs-theme-youtube .vjs-play-progress,
.vjs-theme-youtube .vjs-slider-bar {}

/*
.vjs-theme-youtube .vjs-progress-control::before {
  content: '• Live';
  display: inline-block;
  width: 50px;
  justify-content: center;
  align-items: center;
  margin-right: 4px;
}
*/

.vjs-theme-youtube .vjs-progress-holder {
  display: none;
}

.vjs-theme-youtube .vjs-remaining-time {
  display: none;
}

.vjs-theme-youtube .vjs-playing {
  justify-content: center;
  align-items: center;
  display: flex;
}

.vjs-theme-youtube .vjs-playing .vjs-icon-placeholder::before {
  content: "■" !important;
  font-size: 2.4em;
  line-height: 0.8em;
}

.vjs-theme-youtube .vjs-icon-next::after {
  content: "skip_next";
  font-size: 1.8em;
}

.vjs-theme-youtube .vjs-icon-live::before {
  content: '•';
  position: absolute;
  top: 15px;
  left: 6px;
  color: red;
  font-size: 20px;
}

.vjs-theme-youtube .vjs-icon-live::after {
  content: "Live";
}

.vjs-theme-youtube .vjs-icon-autoplay::after {
  content: "toggle_on";
  font-size: 1.8em;
}

.vjs-theme-youtube .vjs-icon-caption::after {
  content: "subtitles";
  font-size: 1.8em;
  opacity: 0.5;
}

.vjs-theme-youtube .vjs-icon-settings::after {
  content: "settings";
  font-size: 1.8em;
}

.vjs-theme-youtube .vjs-icon-mini-player::after {
  content: "branding_watermark";
  font-size: 1.8em;
}

.vjs-theme-youtube .vjs-icon-theater::after {
  content: "aspect_ratio";
  font-size: 1.8em;
}

.chat-message img {
  height: 17px;
}

.fs-7 {
  font-size: 0.9em;
}

.fs-8 {
  font-size: 0.8em;
}

.opacity-85 {
  opacity: 85%;
}
</style>
