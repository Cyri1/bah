import { Filesystem } from '@capacitor/filesystem';
import { useStoryStore } from '../stores/StoryStores';

export async function useCreateNomedia() {
  const storyStore = useStoryStore();
  try {
    await Filesystem.writeFile({
      path: storyStore.storagePath+'/.nomedia',
      data: ''
    });
  } catch (err) {
    console.log('create .nomedia ' + err);
  }
}
