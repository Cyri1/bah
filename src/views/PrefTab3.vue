<template>
  <ion-page>
    <ion-content class="ion-padding ion-margin-bottom">
      <ion-title color="danger">Under construction</ion-title>
      <ion-item>
        <ion-label position="floating">Mot de passe contributeur :</ion-label>
        <ion-input placeholder="Entrer le mot de passe"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Choix du thème :</ion-label>
        <ion-select placeholder="Make a Selection">
          <ion-select-option value="">Lunii</ion-select-option>
          <ion-select-option value="nes">Spiderman</ion-select-option>
          <ion-select-option value="n64">Reine des neiges</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label>Option XXX</ion-label>
        <ion-toggle slot="end"></ion-toggle>
      </ion-item>
      <ion-button>Enregistrer</ion-button>
    </ion-content>
  </ion-page>
</template>
  
<script setup>
import {
  IonContent,
  IonPage,
  IonTitle,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonToggle,
  IonInput,
  IonButton,
} from "@ionic/vue";

</script>
  
<style scoped>
ion-content {
  --background: #f8f8f8;
  --color: black;
}
</style>