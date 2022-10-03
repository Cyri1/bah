<template>
  <ion-page>

    <ion-content class="ion-padding ion-margin-bottom">
      <button @click="debug" v-show="true" color="primary">
        log datas
      </button>
      <button @click="test" v-show="true" color="primary">
        filter
      </button>
      <ag-grid-vue class="ag-theme-alpine" style="height: 100%" :columnDefs="storyStore.columnDefs"
        :rowData="storyStore.unofficialStore" :rowClassRules="rowClassRules" :defaultColDef="defaultColDef"
        :suppressMovableColumns="true" :rowHeight="25" @cell-clicked="cellWasClicked" @grid-ready="onGridReady">
      </ag-grid-vue>
    </ion-content>
  </ion-page>
</template>
  
<script setup>
import {
  IonContent,
  IonPage,
} from "@ionic/vue";
import { useStoryStore } from '../stores/StoryStores';
import { AgGridVue } from "ag-grid-vue3";  // the AG Grid Vue Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const storyStore = useStoryStore();
storyStore.loadUnofficialStoreData()

function debug() {
  console.log(storyStore.columnDefs)
  console.log(storyStore.unofficialStore)
}

function test() {
  console.log(storyStore.agGrid);
  storyStore.agGrid.api.setFilterModel({
    age: {
      filterType: 'number',
      type: 'lessThan',
      filter: 3
    }
  })
}
function onGridReady(instance) {
  storyStore.agGrid = instance
}



</script>
  
<style scoped>
.ag-theme-alpine {
  --ag-grid-size: 10px;
  --ag-list-item-height: 40px;
}

.rag-green {
  background-color: aquamarine;
}

.rag-red {
  background-color: indianred;
}
</style>