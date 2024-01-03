<script setup>
import { onMounted, reactive, computed, watch, ref, nextTick } from 'vue';
import { useI18nStore } from "@/stores/i18n";
import { loadScriptTag } from "@/assets/util.js"
import VideoJsPlayer from "../components/VideoJsPlayer.vue";
import InlinePreloadCss from "../components/InlinePreloadCss.vue";

import chat from "@/assets/chat/lv5Sw-VtmzM-parsed.json";

const i18nStore = useI18nStore();
i18nStore.setLang("en");

let pageReactive = reactive({
  chatList: [],
  dateNow: new Date()
});
let playerRef = ref(null);
let scrollAreaRef = ref(null);
let clusterize = null;

let parsedChat = chat.map((item) => {
  if (item.emotes) {
    for (let emote of item.emotes) {
      item.message = item.message.replaceAll(emote.name, `<img src="/${emote.url}">`);
    }
  }
  return item;
})

let isScrollLocked = true;
onMounted(() => {
  (async () => {
    await loadScriptTag("clusterize-js", "https://cdn.jsdelivr.net/npm/clusterize.js@1.0.0/clusterize.min.js", "sha384-G2Jussyj3rfkM+IYpQIVTW3qlGESWsGHN3gZoQHY118v3f1nTjbvb+bJgU61l1fd");
    /*
        clusterize = new Clusterize({
          scrollId: 'scrollArea',
          contentId: 'contentArea'
        });
        */
  })();

  let dateNowInterval = setInterval(function () {
    pageReactive.dateNow = new Date();

    let scrollArea = scrollAreaRef.value;
    if (scrollArea.scrollTop == scrollArea.scrollHeight - scrollArea.offsetHeight) {
      isScrollLocked = true;
      console.log("Set isScrollLocked = true")
    } else {
      isScrollLocked = false;
    }
  }.bind(this), 1000);

  setScrollAreaToBottom();
});

let schedule = [
  {
    id: "lv5Sw-VtmzM",
    actualStartTime: new Date("2021-02-06T11:01:29Z")
  }
];

schedule[0].actualStartTime = new Date("2023-07-17T09:02:29Z")

let intlDateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: 'long', timeStyle: 'medium' });

let lastChatIndex = 0;
let lastChatTimestamp = 0;
function calcChatList() {
  let differenceInDate = new Date() - nextVideo.actualStartTime;

  for (let i = lastChatIndex; i < chat.length; i++) {
    if (chat[i].t < differenceInDate) {
      pageReactive.chatList.push(chat.slice(lastChatIndex, i));
      lastChatIndex = i;
      lastChatTimestamp = chat[i].t;
      break;
    }
  }
}

const nextVideo = computed(() => {
  return schedule[0];
});

const nextVideoStartTime = computed(() => {
  return nextVideo.value.actualStartTime;
});

const isLiveStarted = computed(() => {
  return pageReactive.dateNow - nextVideoStartTime.value > 0;
});

const currentPlayTime = computed(() => {
  return pageReactive.dateNow - nextVideoStartTime.value;
})

const currentChatIndex = computed(() => {
  return chat.findIndex((chatObj) => chatObj.timestamp > currentPlayTime.value);
})

const timeToStartLabel = computed(() => {
  let differenceInDate = nextVideoStartTime.value - pageReactive.dateNow;
  let differenceInDays = parseInt(Math.floor(differenceInDate / (1000 * 60 * 60 * 24)));
  if (differenceInDays >= 1) {
    return `Live in ${differenceInDays} days`
  } else {
    let differenceInHours = parseInt(Math.floor(differenceInDate / (1000 * 60 * 60)));
    if (differenceInHours >= 1) {
      return `Live in ${differenceInHours} hours`
    } else {
      let differenceInMinutes = parseInt(Math.floor(differenceInDate / (1000 * 60)));
      if (differenceInMinutes >= 1) {
        return `Live in ${differenceInMinutes} minutes`
      } else {
        let differenceInSeconds = parseInt(Math.floor(differenceInDate / (1000)));
        if (differenceInSeconds >= 1) {
          return `Live in ${differenceInSeconds} seconds`
        }
      }
    }
  }
})

const exactStartTimeLabel = computed(() => {
  return intlDateFormatter.format(nextVideoStartTime.value);
});


watch(isLiveStarted, async (newIsLiveStarted, oldIsLiveStarted) => {
  let player = playerRef.value;
  if (newIsLiveStarted) {
    player.play();
  }
})

function setScrollAreaToBottom() {
  let scrollArea = scrollAreaRef.value;
  scrollArea.scrollTop = scrollArea.scrollHeight;
}

watch(currentChatIndex, (newCurrentChatIndex) => {
  pageReactive.chatList.splice(0, pageReactive.chatList.length);
  if (newCurrentChatIndex > -1) {
    let chatSlice = chat.slice(Math.max(0, newCurrentChatIndex - 40), newCurrentChatIndex);
    for (let i = 0; i < chatSlice.length; i++) {
      pageReactive.chatList.push(chatSlice[i]);
    }
  }

  /// clusterize.refresh(true);
  if (isScrollLocked) {
    nextTick(() => {
      setScrollAreaToBottom();
    });
  }
});

window.setScrollAreaToBottom = setScrollAreaToBottom;

</script>
<template>
  <!-- non-blocking, preload CSS -->
  <InlinePreloadCss
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
  </InlinePreloadCss>
  <InlinePreloadCss href="https://cdn.jsdelivr.net/npm/clusterize.js@1.0.0/clusterize.css"
    integrity="sha384-rnqKTaBQU6DL5cu2Db0+Ce+56QvvU1oxEaqE2zd49VJR1aBcXZ2GwBsPw3jBtfVX"></InlinePreloadCss>
  <div class="container-fluid p-4">
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-3 row-cols-xl-3">
      <div class="col col-lg-8 col-xl-9">
        <div class="aspect-ratio-wrapper mb-3 position-relative">
          <VideoJsPlayer ref="playerRef" :startTime="nextVideoStartTime"></VideoJsPlayer>
          <img v-if="!isLiveStarted" class="position-absolute h-100 w-100"
            src="https://i.ytimg.com/vi/lv5Sw-VtmzM/maxresdefault.jpg" style="top: 0; left: 0;" />
          <div v-if="!isLiveStarted"
            class="position-absolute d-flex justify-content-center align-items-center p-2 rounded-3 bg-dark text-white opacity-85"
            style="bottom: 10px; left: 10px;">
            <span class="material-symbols-outlined px-2 fs-3 ms-1">
              sensors
            </span>
            <div class="mx-2" style="min-width: 180px;">
              <div class="fs-7">{{ timeToStartLabel }}</div>
              <div class="fs-8">{{ exactStartTimeLabel }}</div>
            </div>
            <button class="btn btn-secondary d-flex align-items-center ms-4 ps-2 me-1">
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
        <div class="d-flex flex-column rounded" style="height: 640px;">
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
          <div ref="scrollAreaRef" id="scrollArea" class="clusterize-scroll chat-list flex-grow-1 overflow-y-scroll px-2"
            style="max-height: unset;">
            <div id="contentArea" class="clusterize-content">
              <!-- v-for="{ author, message } of chat.slice(Math.max(0, currentChatIndex - 40), currentChatIndex)" -->
              <div class="d-flex flex-row align-items-center ps-2 my-1"
                v-for="({ author, message, index }) in pageReactive.chatList" :key="`chat-index-${index}`">
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
