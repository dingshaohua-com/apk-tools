import { ipcMain } from 'electron';
import { runApkSigner } from '@main/utils/run-tools/run-apksigner';
import { decodeApk, buildApk } from '@main/utils/run-tools/run-apktool';

// 反编译APK
ipcMain.handle('decodeApk', async (_, filePath: string) => {
  return decodeApk({ filePath });
});

// 打包APK
ipcMain.handle('buildApk', async (_, filePath: string, useAapt1: boolean = false) => {
  return buildApk({ filePath, useAapt1 });
});

// 重签APK（直接对apk文件签名，不需要接包）
ipcMain.handle('signApk', async (_, filePath: string, certType: string) => {
  console.log(filePath, certType);
  
  const res = await runApkSigner({ filePath, certType });
  console.log('签名成功', res);
  return res;
});
