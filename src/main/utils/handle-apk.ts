import path from 'path';
import { ipcMain } from 'electron';
import { runJava } from '@main/utils/run-soft';
import apktoolJar from '@main/resources/apktool.jar?asset';

// 解包APK
ipcMain.handle('unpack-apk', async (_, filePath: string) => {
  // 使用path.parse解析路径，从而获取文件名（不含后缀）
  const { name: fileName, dir: fileDir } = path.parse(filePath);
  const unpackPath = path.join(fileDir, fileName); // 文件路径（目录）
  const params = ['-Dfile.encoding=UTF-8', '-jar', apktoolJar, 'd',  '-k', filePath, '-f', '-o', unpackPath];
  await runJava(params);
  return unpackPath;
});
