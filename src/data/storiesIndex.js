import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { useStoryStore } from '../stores/StoryStores';

export async function storiesIndex() {
  const storyStore = useStoryStore();

  var jsonStories = [];
  var errors = [];
  var path = storyStore.storagePath;
  console.log(path);

  if (path === '/sdcard/Documents/packs/') {
    try {
      var mainDirContent = await Filesystem.readdir({
        path: '',
        directory: Directory.Documents,
      });
    } catch (err) {
      errors.push('Impossible de lire le dossier Documents');
      console.log('error reading main dir ' + err);
    }
    //check if packs directory exists
  
    var createPacksDir = true;
    for (let dirName of mainDirContent.files) {
      if (dirName.name == 'packs') {
        createPacksDir = false;
      }
    }
    if (createPacksDir) {
      console.log('creating packs dir');
      //create packs folder if it doesnt exists
      try {
        await Filesystem.mkdir({
          path: 'packs/',
          directory: Directory.Documents,
        });
      } catch (err) {
        errors.push('Impossible de créer le dossier "packs"');
        console.log('error creating packs dir ' + err);
      }
    }
  }
  //read packs directory
  try {
    var packsDirContent = await Filesystem.readdir({
      path: path
    });
  } catch (err) {
    errors.push('Impossible de lire le contenu du dossier ' + path);
    console.log('error reading packs dir ' + err);
  }
  if (!packsDirContent?.files.length) {
    errors.push(
      'Aucune histoire enregistrée dans le dossier ' + path
    );
    console.log("pas d'histoire");
  } else if (packsDirContent?.files.length) {
    for (let storyDir of packsDirContent.files) {
      //create stories index with all story.json
      if (storyDir.type == 'directory') {
        try {
          var readStoryJson = await Filesystem.readFile({
            path:
              'file:///' +
              path +
              storyDir.name +
              '/story.json',
            encoding: Encoding.UTF8,
          });
        } catch (err) {
          errors.push(
            'Impossible de lire le fichier story.json de l\'histoire "' +
              storyDir.name +
              '"'
          );
          console.log('error reading story.json ' + err);
        }

        try {
          var jsonStory = await JSON.parse(readStoryJson.data);
          jsonStory['name'] = storyDir.name;
          if (!storyStore.unfavoriteStories?.includes(storyDir.name)) {
            // remove unfav
            jsonStories.push(jsonStory);
          }
        } catch (err) {
          errors.push(
            'Le fichier story.json de l\'histoire "' +
              storyDir.name +
              '" n\' est pas valide'
          );
          console.log('error parsing json ' + err);
        }
      }
    }
  }
  if (errors.length) {
    return { errors: true, data: errors };
  } else {
    return { errors: false, data: jsonStories };
  }
}
