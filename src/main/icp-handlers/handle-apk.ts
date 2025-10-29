import { ipcMain } from 'electron';
import { decodeApk } from '@main/utils/run-tools/run-apktool';

// 解包APK
ipcMain.handle('unpack-apk', async (_, filePath: string) => {
  return decodeApk({ filePath });
});
