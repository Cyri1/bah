<template>

  <ion-page>
    <ion-content class="ion-padding ion-margin-bottom" color="light">
      <ion-title color="danger">Under construction</ion-title>
      <ion-item v-for="(file, index) in storyStore.installedPacks" color="light" :key="index">
        <ion-label>{{file.name}}</ion-label>
        <ion-button slot="end">
          <ion-icon slot="icon-only" :icon="trashOutline"></ion-icon>
        </ion-button>
        <ion-button slot="end">
          <ion-icon slot="icon-only" :icon="bookmarkOutline"></ion-icon>
        </ion-button>
      </ion-item>
    </ion-content>
  </ion-page>
</template>
  
<script setup>
import { onMounted } from "vue";
import {
  IonContent,
  IonPage,
  IonItem,
  IonButton,
  IonLabel,
  IonIcon,
  IonTitle,
} from "@ionic/vue";
import { useListInstalledPacks } from '../composables/listInstalledPacks';
import { trashOutline, bookmarkOutline } from "ionicons/icons";
import { useStoryStore } from '../stores/StoryStores';

const storyStore = useStoryStore();
onMounted(() => {
  useListInstalledPacks()
});


</script>
