
<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="download" href="download">
                    <ion-icon :icon="downloadOutline" />
                </ion-tab-button>

                <ion-tab-button tab="mystories" href="mystories">
                    <ion-icon :icon="libraryOutline" />
                </ion-tab-button>

                <ion-tab-button tab="sleepmode" href="sleepmode">
                    <ion-icon :icon="moonOutline" />
                </ion-tab-button>

                <ion-tab-button tab="settings" href="settings">
                    <ion-icon :icon="settingsOutline" />
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>
<script setup>
import {
    IonPage,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonRouterOutlet,
    IonIcon
} from "@ionic/vue";
import { downloadOutline, libraryOutline, settingsOutline, moonOutline } from "ionicons/icons";

</script>