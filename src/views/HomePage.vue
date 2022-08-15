<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-button
          class="preferences"
          icon-only
          color="warning"
          v-show="false"
          size="small"
        >
          <ion-icon :icon="settingsOutline" size="small"></ion-icon>
        </ion-button>
        <ion-row
          class="ion-align-items-center ion-justify-content-center main-row"
        >
          <ion-col class="ion-align-items-center ion-text-center" size="2">
            <ion-button
              class="big-buttons"
              @click="stop"
              icon-only
              color="warning"
              size="large"
            >
              <ion-icon :icon="home" size="large"></ion-icon>
            </ion-button>
            <button @click="click2" v-show="false" color="primary">
              log datas
            </button>
          </ion-col>
          <ion-col size="8">
            <swiper
              :loop="true"
              v-show="swiperVisible"
              :modules="modules"
              :effect="'flip'"
              @init="storeSwiperInstance"
              @slideChange="readAudioActiveSlide"
            >
              <swiper-slide v-for="(slide, index) in activeSlides" :key="index">
                <ion-img
                  part="image"
                  @click="
                    storeActiveStoryIndex(index), clickOk(slide.actionNode)
                  "
                  :src="convertPath(slide.image)"
                >
                </ion-img>
              </swiper-slide>
            </swiper>
          </ion-col>
          <ion-col size="2">
            <ion-button
              @click="pause"
              class="big-buttons"
              icon-only
              color="warning"
              size="large"
            >
              <ion-icon :icon="pauseSharp" size="large"></ion-icon>
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  IonImg,
  IonButton,
  IonContent,
  IonPage,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/vue";
import { IonIcon } from "@ionic/vue";
import { home } from "ionicons/icons";
import { pauseSharp } from "ionicons/icons";
import { settingsOutline } from "ionicons/icons";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Howl } from "howler";
import "swiper/css";
import "swiper/css/effect-flip";
import "@ionic/vue/css/ionic-swiper.css";
import { EffectFlip } from "swiper";
import { ScreenBrightness } from "@capacitor-community/screen-brightness";
import { AndroidPermissions } from "@awesome-cordova-plugins/android-permissions";
import { Dialog } from "@capacitor/dialog";

let jsonStories = ref([]);
let activeSlides = ref([]);
let homeButton = ref({});
let activeStoryIndex = ref(null);
let swiperVisible = ref(true);
let swipe = ref();
var readAudioHowl;
var activeAudioSlideHowl;
var activeAudioSlideSetHowl;
const directory = Directory.Documents;
const basePath = "/storage/emulated/0/";
const modules = [EffectFlip];

onMounted(() => {
  var permissions = AndroidPermissions;
  permissions.checkPermission(permissions.CAMERA).then(
                res => {
                  console.log(res);
                },
                err => {
                  console.log(err);
                }
            );

  ScreenBrightness.getBrightness().then((result) => {
    console.log(result);
  });

  window.screen.orientation.lock("landscape");
  window.plugins.insomnia.keepAwake();

  (async () => {
    try {
      //check if packs directory exists
      let mainDirContent = await Filesystem.readdir({
        path: "",
        directory: directory,
      });
      var createPacksDir = true;
      for (let dirName of mainDirContent.files) {
        if (dirName.name == "packs") {
          createPacksDir = false;
        }
      }
      if (createPacksDir) {
        console.log("creating packs dir");
        //create packs folder if it doesnt exists
        await Filesystem.mkdir({
          path: "packs/",
          directory: directory,
        });
      }
      //read packs directory
      let packsDirContent = await Filesystem.readdir({
        path: "packs/",
        directory: directory,
        encoding: Encoding.UTF8,
      });
      if (!packsDirContent.files.length) {
        Dialog.alert({
          title: "Aucune histoire",
          message: "Il n'y a pas d'histoire dans le dossier Documents/packs/",
        });
      } else {
        for (let storyDir of packsDirContent.files) {
          //create stories index with all story.json
          let readStoryJson = await Filesystem.readFile({
            path: "packs/" + storyDir.name + "/story.json",
            directory: directory,
            encoding: Encoding.UTF8,
          });
          let jsonStory = await JSON.parse(readStoryJson.data);
          jsonStory["name"] = storyDir.name;
          jsonStories.value.push(jsonStory);
          createStoriesIndex();
        }
      }
    } catch (err) {
      console.log(err);
    }
  })();
});
function click2() {
  console.log(jsonStories.value);
  console.log(activeSlides.value);
  console.log(homeButton.value);
  console.log(activeStoryIndex.value);
}
function stop() {
  if (readAudioHowl) {
    readAudioHowl.stop();
  }
  swiperVisible.value = true;
  createStoriesIndex();
  activeStoryIndex.value = null;
}

function pause() {
  return readAudioHowl.playing() ? readAudioHowl.pause() : readAudioHowl.play();
}
function storeSwiperInstance(swiper) {
  swipe.value = swiper;
}
function storeActiveStoryIndex(index) {
  if (activeStoryIndex.value === null) {
    // console.log('updating active story index to :');
    activeStoryIndex.value = index;
  } else {
    // console.log('dont update story index');
  }
}
function createStoriesIndex() {
  activeSlides.value = [];
  for (var story of jsonStories.value) {
    var storyName = story.name;
    for (var node of story.stageNodes) {
      if (node.squareOne) {
        var slide = {
          audio:
            basePath +
            directory +
            "/packs/" +
            storyName +
            "/assets/" +
            node.audio,
          image:
            basePath +
            directory +
            "/packs/" +
            storyName +
            "/assets/" +
            node.image,
          actionNode: node.okTransition.actionNode,
        };
        activeSlides.value.push(slide);
      }
    }
  }
  swipe.value.slideToLoop(0, 100, false);
  swipe.value.emit("slideChange");
}

function clickOk(actionNodeID) {
  var nextStagesNodes = getNextStageNodes(actionNodeID);
  // return [0: {audio: xxx.mp3, controlSettings: {wheel:..., autoplay: true/false}, homeTransition, image, okTransition: {actionNode: xxx-xxx-xxx, optionIndex: 0}, }]
  console.log(nextStagesNodes);
  if (
    nextStagesNodes[0].controlSettings.autoplay &&
    !nextStagesNodes[0].controlSettings.pause
  ) {
    console.log("clickok : 1");
    // if audio but no image means its audio of slide set
    readAudioActiveSlideSet(
      basePath +
        directory +
        "/packs/" +
        jsonStories.value[activeStoryIndex.value].name +
        "/assets/" +
        nextStagesNodes[0].audio
    );

    clickOk(nextStagesNodes[0].okTransition.actionNode);
  } else if (
    nextStagesNodes.length > 0 &&
    nextStagesNodes[0].controlSettings.ok
  ) {
    console.log("clickok : 2");
    console.log("dont read any audio, display new set of slides");
    activeSlides.value = [];
    for (var node of nextStagesNodes) {
      var slide = {
        audio:
          basePath +
          directory +
          "/packs/" +
          jsonStories.value[activeStoryIndex.value].name +
          "/assets/" +
          node.audio,
        image:
          basePath +
          directory +
          "/packs/" +
          jsonStories.value[activeStoryIndex.value].name +
          "/assets/" +
          node.image,
        actionNode: node.okTransition.actionNode,
      };
      homeButton.value = { homeTransition: node.homeTransition };
      activeSlides.value.push(slide);
    }
    swipe.value.slideToLoop(0, 1, false);
    if (!activeAudioSlideSetHowl.playing()) {
      swipe.value.emit("slideChange");
    }
  } else if (
    nextStagesNodes[0].controlSettings.autoplay &&
    nextStagesNodes[0].controlSettings.pause
  ) {
    // if autoplay = true AND pause = true, it means that node is audio of selected story
    console.log("clickok : 3");
    swiperVisible.value = false;
    readAudio(
      basePath +
        directory +
        "/packs/" +
        jsonStories.value[activeStoryIndex.value].name +
        "/assets/" +
        nextStagesNodes[0].audio
    );
  }
}
function getNextStageNodes(actionNodeID) {
  // console.log("searching :");
  // console.log(actionNodeID);
  // console.log("in :");
  // console.log(jsonStories.value[activeStoryIndex.value].actionNodes);
  for (var actionNode of jsonStories.value[activeStoryIndex.value]
    .actionNodes) {
    if (actionNode.id === actionNodeID) {
      var nextStageIds = actionNode.options;
      var nextStagesNodes = createArrayOfNodesIds(nextStageIds);
      // console.log('node found, next stage array :');
      // console.log(nextStageIds);
    }
  }
  return nextStagesNodes;
}
function createArrayOfNodesIds(nextStageIds) {
  var stageNodeIds = [];
  for (var stageOption of nextStageIds) {
    for (var stageNode of jsonStories.value[activeStoryIndex.value]
      .stageNodes) {
      if (stageNode.uuid === stageOption) {
        stageNodeIds.push(stageNode);
      }
    }
  }
  return stageNodeIds;
  // return [0: "id-id-id-id-id", ...]
}

function convertPath(path) {
  return Capacitor.convertFileSrc(path);
}

var slideSetPlaying;
function readAudioActiveSlide(swiper) {
  console.log("read audio active slide");
  if (slideSetPlaying) {
    return;
  }
  if (activeAudioSlideHowl) {
    activeAudioSlideHowl.stop();
  }
  activeAudioSlideHowl = new Howl({
    src: [convertPath(activeSlides.value[swiper.realIndex].audio)],
  });
  activeAudioSlideHowl.play();
}

function readAudioActiveSlideSet(audioFilePath) {
  console.log("read audio active slide set");
  slideSetPlaying = 1;
  if (activeAudioSlideSetHowl) {
    activeAudioSlideSetHowl.stop();
  }
  activeAudioSlideSetHowl = new Howl({
    src: [convertPath(audioFilePath)],
    onend: function () {
      slideSetPlaying = 0;
      swipe.value.emit("slideChange");
    },
  });
  activeAudioSlideSetHowl.play();
}

function readAudio(audioFilePath) {
  readAudioHowl = new Howl({
    html5: true,
    src: [convertPath(audioFilePath)],
    onend: function () {
      swiperVisible.value = true;
    },
  });
  readAudioHowl.play();
}
</script>

<style>
ion-content {
  --background: #0ec6d2;
}

.main-row {
  height: 100vh;
}
.preferences {
  position: absolute;
  top: 10px;
  right: 10px;
  --border-radius: 50%;
  --padding-start: 5px;
  --padding-end: 5px;
  --padding-bottom: 5px;
  --padding-top: 5px;
}

.big-buttons {
  transform: translateY(-50%);
  --border-radius: 50%;
  --padding-start: 35px;
  --padding-end: 35px;
  --padding-bottom: 45px;
  --padding-top: 45px;
}

ion-img::part(image) {
  filter: blur(1px);
  box-shadow: inset 0 0 0 1000px rgb(108, 255, 230);
}
</style>
