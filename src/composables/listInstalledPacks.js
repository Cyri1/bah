
import { useStoryStore } from '../stores/StoryStores';
import { Filesystem } from '@capacitor/filesystem';

export async function useListInstalledPacks() {
    const storyStore = useStoryStore();

    storyStore.installedPacks = [];
    try {
      Filesystem.readdir({
        path: storyStore.storagePath,
      }).then((result) => {
        for (let file of result.files) {
          if (file.type == 'directory') {
            storyStore.installedPacks.push({'name': file.name})
          }
        }
      });
    } catch (err) {
      console.log('error reading packs dir ' + err);
    }
  }
  