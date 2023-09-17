import { useStoryStore } from '../stores/StoryStores';
import { alertController } from '@ionic/vue';
import { Preferences } from '@capacitor/preferences';

export function usePopup() {
  const storyStore = useStoryStore();

  var isChecked;
  Preferences.get({ key: 'popupId' })
    .then((result) => {
      if (result.value == storyStore.popup.id) {
        isChecked = true;
      }
    })
    .then(() => {
      if (!isChecked && storyStore.popup.isActive) {
        Preferences.set({
          key: 'popupId',
          value: storyStore.popup.id,
        });
        (async () => {
          const alert = await alertController.create({
            header: 'Message :',
            message: storyStore.popup.message,
            buttons: ['OK'],
            cssClass: 'alert-size',
          });
          await alert.present();
        })();
      }
    });
}
