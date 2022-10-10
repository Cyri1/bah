import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export async function usePermissionsCheck() {
  var checkPermissionsSuccess = true;
  try {
    await Filesystem.writeFile({
      path: 'bah-check.txt',
      data: 'This is a permission check',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  } catch (err) {
    console.log('permission check'+err);
    checkPermissionsSuccess = false;
  }
  try {
    await Filesystem.readFile({
      path: 'bah-check.txt',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  } catch (err) {
    console.log('permission check'+err);
    checkPermissionsSuccess = false;
  }
  try {
    await Filesystem.deleteFile({
      path: 'bah-check.txt',
      directory: Directory.Documents,
    });
  } catch (err) {
    console.log('permission check'+err);
    checkPermissionsSuccess = false;
  }
  return checkPermissionsSuccess;
}
