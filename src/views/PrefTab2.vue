<template>

  <ion-page>
    <ion-content class="ion-padding ion-margin-bottom">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto autem ut asperiores maxime hic consectetur quo repudiandae molestias dolorem fugiat.
    </ion-content>
  </ion-page>
</template>
  
<script setup>
import { onMounted } from "vue";
import {
  IonContent,
  IonPage,
} from "@ionic/vue";
import { Filesystem, Directory } from '@capacitor/filesystem';
import { useStoryStore } from '../stores/StoryStores';

const storyStore = useStoryStore();

onMounted(() => {
  listAvailablePacks()
});

async function listAvailablePacks() {
  const directory = Directory.Documents;
  storyStore.installedPacks = [];
  try {
    var downloadDirContent = await Filesystem.readdir({
      directory: directory,
    });
  } catch (err) {
    console.log('error reading main dir ' + err);
  }
  for (let file of downloadDirContent.files) {
    console.log(file);
  }
}
</script>
<style scoped>
ion-content {
    --background: #f1f0f0;
    --color: rgb(100, 100, 100);
}
</style>