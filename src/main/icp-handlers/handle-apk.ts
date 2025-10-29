import { ipcMain } from 'electron';
import { decodeApk, buildApk } from '@main/utils/run-tools/run-apktool';

// 反编译APK
ipcMain.handle('decodeApk', async (_, filePath: string) => {
  return decodeApk({ filePath });
});

// 打包APK
ipcMain.handle('buildApk', async (_, filePath: string, useAapt1: boolean=false) => {
  return buildApk({ filePath, useAapt1 });
});
