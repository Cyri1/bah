<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button class="ion-margin-start" default-href="../home"></ion-back-button>
        </ion-buttons>
        <ion-title>Télécharger et installer un pack :</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding ion-margin-bottom" color="light">
      <ion-loading :is-open="storyStore.isLoading" message="Installation en cours...">
      </ion-loading>
      <ion-toast :is-open="storyStore.isDone" message="Pack installé" :duration="2500"
        @didDismiss="storyStore.isDone = false" position="middle"></ion-toast>
      <ion-button id="open-modal" @click="useListDownloadedPacks" expand="block">Installer un pack téléchargé</ion-button>
      <ion-modal ref="modal" trigger="open-modal">
        <ion-header>
          <ion-toolbar color="light">
            <ion-buttons slot="start">
              <ion-back-button class="ion-margin-start" default-href="#" @click="cancel"></ion-back-button>
            </ion-buttons>
            <ion-title>Liste des fichiers</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" color="light">
          <ion-item v-for="(file, index) in storyStore.downloadedPacks" color="light" :key="index">
            <ion-label>{{ file.name }}</ion-label>
            <ion-button @click="showLoading, installPack(file)">Installer</ion-button>
          </ion-item>
        </ion-content>
      </ion-modal>
      <DataTable class="display compact nomargin" :columns="columns" :data="storyStore.unofficialStore" :options="options" ref="table">
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
  IonContent,
  IonButtons,
  IonBackButton,
  IonPage,
  IonToast,
  IonIcon,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonLoading,
} from "@ionic/vue";
import { onMounted, ref } from "vue";
import { downloadOutline } from "ionicons/icons";
import { useStoryStore } from '../stores/StoryStores';
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
DataTable.use(DataTablesLib);

import { useListDownloadedPacks } from '../composables/listDownloadedPacks';

const storyStore = useStoryStore();
const modal = ref();

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
    render: function (data) {
      return data.replace(/_./g, ' ');
    }
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

const options = {
  pagingType: 'simple',
  dom: '<pf<t>i>',
  autoWidth: false,
  columnDefs: [
    { width: '20%', targets: 0 },
    { width: '50%', targets: 1 },
    { width: '15%', targets: 2 },
    { width: '15%', targets: 3 }
  ]
}

onMounted(() => {
  useListDownloadedPacks()
});


function cancel() {
  modal.value.$el.dismiss(null, 'cancel')
}

function installPack(file) {
  storyStore.isLoading = true
  window.zip.unzip(file.path + file.name, storyStore.storagePath + file.name.replace(/[&/\\[\]#,`$~%.'":*?<>{}]/g, ' ') + '/',
    function () {
      storyStore.isLoading = false
      storyStore.isDone = true
    }
  );
}

</script>
  
<style scoped>
@import 'datatables.net-dt';
</style>