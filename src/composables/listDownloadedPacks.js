import { useStoryStore } from '../stores/StoryStores';
import { Filesystem } from '@capacitor/filesystem';

export async function useListDownloadedPacks() {
  const storyStore = useStoryStore();

  storyStore.downloadedPacks = [];
  const pathDl = '/sdcard/Download/';
  const pathMega = '/sdcard/Download/MEGA Downloads/';

  Filesystem.readdir({
    path: pathDl,
  })
    .then((result) => {
      for (let file of result.files) {
        if (file.name.includes('.zip')) {
          storyStore.downloadedPacks.push({ path: pathDl, name: file.name });
        }
      }
    })
    .catch((err) => {
      console.log('error reading /sdcard/Download/ dir ' + err);
    });

  Filesystem.readdir({
    path: pathMega,
  })
    .then((result) => {
      for (let file of result.files) {
        if (file.name.includes('.zip')) {
          storyStore.downloadedPacks.push({ path: pathMega, name: file.name });
        }
      }
    })
    .catch((err) => {
      console.log('error reading /sdcard/Download/MEGA Downloads/ dir ' + err);
    });
}
