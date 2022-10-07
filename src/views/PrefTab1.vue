<template>
  <ion-page>
    <ion-content class="ion-padding ion-margin-bottom">
      <ion-loading :is-open="storyStore.isLoading" message="Installation en cours...">
      </ion-loading>
      <ion-toast :is-open="storyStore.isDone" message="Pack installé" :duration="2500"
        @didDismiss="storyStore.isDone = false" :position="middle"></ion-toast>
      <button @click="debug" v-show="false" color="primary">
        log datas
      </button>
      <button @click="test" v-show="false" color="primary">
        filter
      </button>
      <ion-button id="open-modal" @click="listInstalledPacks" expand="block">Installer un pack téléchargé</ion-button>
      <ion-modal ref="modal" trigger="open-modal">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-back-button default-href="#" @click="cancel"></ion-back-button>
            </ion-buttons>
            <ion-title>Liste des fichiers</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item v-for="(file, index) in storyStore.downloadedPacks" :key="index">
            <ion-label>{{file}}</ion-label>
            <ion-button @click="showLoading, installPack(file)">Installer</ion-button>
          </ion-item>
        </ion-content>
      </ion-modal>
      <DataTable class="display compact nomargin" :columns="columns" :data="storyStore.unofficialStore"
        :options="{ pagingType:'simple', dom:'<p<t>i>', autoWidth:false }" ref="table">
        <thead>
          <tr>
            <th></th>
            <th>Titre</th>
            <th>Age</th>
            <th>
              <ion-icon :icon="downloadOutline"></ion-icon>
            </th>
          </tr>
        </thead>
      </DataTable>
    </ion-content>
  </ion-page>
</template>
  
<script setup>
import {
  IonPage,
  IonContent,
  IonPage,
  IonToast,
  IonIcon,
  IonButton,
  IonBackButton,
  IonButtons,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonLoading,
} from "@ionic/vue";
import { onMounted } from "vue";
import { downloadOutline } from "ionicons/icons";
import { useStoryStore } from '../stores/StoryStores';
import DataTable from 'datatables.net-vue3';
import { Filesystem } from '@capacitor/filesystem';

const storyStore = useStoryStore();
storyStore.loadUnofficialStoreData()
const columns = [
  {
    data: 'smallThumbUrl',
    render: function (data) {
      return '<img src="' + data + '"></img>';
    }
  },
  {
    data: 'title',
  },
  {
    data: 'age',
  },
  {
    data: 'downloadUrl',
    render: function (data) {
      return '<ion-button download="story" href="' + data + '">Dl</ion-button>';
    }
  }
];

onMounted(() => {
  listAvailablePacks()
});

function debug() {
  console.log(storyStore.columnDefs)
  console.log(storyStore.unofficialStore)
}


function cancel() {
  document.querySelector('ion-modal').dismiss(null, 'cancel');
}
function installPack(file) {
  storyStore.isLoading = true
  window.zip.unzip('/sdcard/Download/' + file, '/sdcard/Documents/packs/' + file + '/',
    function () {
      storyStore.fillStoriesIndex()
      console.log(storyStore.stories)
      storyStore.isLoading = false
      storyStore.isDone = true
    }
  );
}

async function listAvailablePacks() {
  storyStore.downloadedPacks = [];
  try {
    Filesystem.readdir({
      path: '/sdcard/Download/',
    }).then((result) => {
      for (let file of result.files) {
        if (file.name.includes('.zip')) {
          storyStore.downloadedPacks.push(file.name)
        }
      }
      console.log(storyStore.downloadedPacks);
    })  ;
  } catch (err) {
    console.log('error reading main dir ' + err);
  }
}

</script>
  
<style scoped>
@import 'datatables.net-dt';
ion-content {
  --background: #f8f8f8;
  --color:black;
}

</style>