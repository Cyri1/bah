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
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-flip";
import "@ionic/vue/css/ionic-swiper.css";
import { EffectFlip } from "swiper";
import { useCreateStoriesIndex } from '../composables/createStoriesIndex';

let activeSlides = ref([]);
let swiperVisible = ref(true);
const modules = [EffectFlip];
onMounted(() => {
  const jsonStories = useCreateStoriesIndex()
  jsonStories.then((result) => {
    createIndexSlides(result.value)
  })
});

function createIndexSlides(stories) {
  for (var story of stories) {
      console.log(story);
  }
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
