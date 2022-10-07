
<template>
    <ion-page>
        <ion-tabs>
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-back-button default-href="../home"></ion-back-button>
                    </ion-buttons>
                    <ion-title>Préférences :</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="tab1" href="tab1">
                    <ion-label>Store Externe</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="tab2" href="tab2">
                    <ion-label>Histoires enregistrées</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="tab3" href="tab3">
                    <ion-label>Préférences</ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>
<script setup>
import { onMounted } from "vue";
import {
    IonPage,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonLabel,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonRouterOutlet,
} from "@ionic/vue";

onMounted(() => {
    window.screen.orientation.lock("portrait");
});

</script>
  
<style scoped>
ion-toolbar {
    --background: #f1f0f0;
    --color: rgb(100, 100, 100);
}
ion-content {
  --background: #f8f8f8;
}
</style>