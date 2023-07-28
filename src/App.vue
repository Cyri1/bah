<template>
  <ion-app>
    <ion-router-outlet></ion-router-outlet>
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';


(async function () {
  const deviceId = await Device.getId();
  const deviceInfo = await Device.getInfo();
  const appInfo = await App.getInfo();

  let data = {
    deviceId: deviceId.identifier,
    sdk: deviceInfo.androidSDKVersion,
    isVirtual: deviceInfo.isVirtual,
    manufacturer: deviceInfo.manufacturer,
    model: deviceInfo.model,
    name: deviceInfo.name,
    os: deviceInfo.operatingSystem,
    osVersion: deviceInfo.osVersion,
    webViewVersion: deviceInfo.webViewVersion,
    appBuild: appInfo.build,
    appVersion: appInfo.version
  };

  const options = {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data)
  }

  try {
    const fetchResponse = await fetch(`https://hostmyscripts.000webhostapp.com/stats.php`, options);
    await fetchResponse;
  } catch (e) {
    console.log(e);
  }
})();

</script>