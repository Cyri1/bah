
import { useStoryStore } from '../stores/StoryStores';
import { Filesystem, Directory } from '@capacitor/filesystem';

export async function useListInstalledPacks() {
    const storyStore = useStoryStore();
    const directory = Directory.Documents;

    storyStore.installedPacks = [];
    try {
      Filesystem.readdir({
        path: 'packs/',
        directory: directory,
      }).then((result) => {
        for (let file of result.files) {
          if (file.type == 'directory') {
            storyStore.installedPacks.push({'name': file.name})
          }
        }
      });
    } catch (err) {
      console.log('error reading main dir ' + err);
    }
    console.log(storyStore.installedPacks);
  }
  