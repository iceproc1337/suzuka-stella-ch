<script setup>
import { loadScriptTag } from "@/assets/util.js"
import InlinePreloadCss from "./InlinePreloadCss.vue";
import { onMounted, reactive, computed } from "vue";

let props = defineProps({
    startTime: { type: Date, required: true }
});

let startTime = computed(() => {
    return props.startTime;
});

let pageReactive = reactive({
    player: null
})

function setupVideoJsPlayer() {
    //Now setting up Player
    var player = videojs("player", {
        muted: true
    });

    player.ready(function () {
        var myPlayer = this;
        myPlayer.src({ type: 'video/youtube', src: 'https://www.youtube.com/watch?v=lv5Sw-VtmzM' });
        myPlayer.controlBar.progressControl.disable()
    });
    let isCurrentTimeLoaded = false;

    player.on('play', function () {
        var myPlayer = this;
        if (!isCurrentTimeLoaded) {
            isCurrentTimeLoaded = true;
            myPlayer.currentTime((new Date() - startTime.value) / 1000);
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

    return player;
}

onMounted(async () => {
    await loadScriptTag("video-js", "https://cdn.jsdelivr.net/npm/video.js@8.3.0/dist/video.min.js", "sha384-xOapVKf0v5CoOk/hvZ+tHVNIqWcwtrCouwlUHwJMGHO2qJrUBfS1CoTpZ9mF0E/a");
    await loadScriptTag("video-js-youtube-plugin", "https://cdn.jsdelivr.net/npm/videojs-youtube@3.0.1/dist/Youtube.min.js", "sha384-vOLaPd6nUReyIgR5TDrMPqrdQXrd7z4zE0stQlGgWmFDX0KK+kogJnS+qpM8OXil");

    let player = setupVideoJsPlayer();
    pageReactive.player = player;
});

function play() {
    pageReactive.player.play();
}

defineExpose({
    play
})

</script>

<template>
    <div>
        <InlinePreloadCss href="https://cdn.jsdelivr.net/npm/video.js@8.3.0/dist/video-js.min.css"
            integrity="sha384-rJdeIq+yGjo4ePy/Dog4rMs9LQTqvsXqrp/WefvZFWARKUZoGEsUVL80LST7ciLO"></InlinePreloadCss>
        <video id="player" class="video-js vjs-big-play-centered vjs-theme-youtube" controls preload="auto"
            fluid="true"></video>
    </div>
</template>

<style>
/* Change all text and icon colors in the player. */
.vjs-theme-youtube.video-js {
    font-size: 100%;
}

.vjs-theme-youtube.video-js .vjs-control-bar {
    background: linear-gradient(to top, #555, rgba(0, 0, 0, 0));
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
.vjs-theme-youtube .vjs-big-play-button {
    background-image: url("@/assets/img/youtube-button.png");
    background-repeat: no-repeat;
    background-position: 50%;
    border: none !important;
    background-color: unset !important;
    width: 100% !important;
    height: 100% !important;
    top: 0 !important;
    left: 0 !important;
    margin: 0 !important;
    opacity: 0.8 !important;
}

/* TODO: enable spinner if big-play-button is not visible */
.vjs-theme-youtube .vjs-loading-spinner {
    display: none !important;
}
.vjs-theme-youtube .vjs-big-play-button:hover {
    background-image: url("@/assets/img/youtube-button-active.png");
}
.vjs-theme-youtube .vjs-icon-placeholder {
    display: none;
}
.vjs-theme-youtube .vjs-control-text {
    display: none;
}

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
</style>
