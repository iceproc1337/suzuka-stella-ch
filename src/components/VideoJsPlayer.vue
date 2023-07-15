<script setup>
import { loadScriptTag } from "@/assets/util.js"
import InlinePreloadCss from "./InlinePreloadCss.vue";

let { onMounted, reactive, watch } = Vue;
let props = defineProps({
    isPlaying: Boolean
})
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

    return player;
}

onMounted(async () => {
    await loadScriptTag("video-js", "https://cdn.jsdelivr.net/npm/video.js@8.3.0/dist/video.min.js", "sha384-xOapVKf0v5CoOk/hvZ+tHVNIqWcwtrCouwlUHwJMGHO2qJrUBfS1CoTpZ9mF0E/a");
    await loadScriptTag("video-js-youtube-plugin", "https://cdn.jsdelivr.net/npm/videojs-youtube@3.0.1/dist/Youtube.min.js", "sha384-vOLaPd6nUReyIgR5TDrMPqrdQXrd7z4zE0stQlGgWmFDX0KK+kogJnS+qpM8OXil");

    let player = setupVideoJsPlayer();
    pageReactive.player = player;
});

watch(() => props.isPlaying, (newIsPlaying, oldIsPlaying) => {
    if (newIsPlaying) {
        pageReactive.player.play();
    }
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
