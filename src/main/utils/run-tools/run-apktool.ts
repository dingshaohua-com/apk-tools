import path from 'path';
import { runJava } from '@main/utils/run-tools/run-java';
import apktoolJar from '@root/resources/apktool.jar?asset';

export function decodeApk(args: { filePath: string }) {
  // 使用path.parse解析路径，从而获取文件名（不含后缀）
  const { name: fileName, dir: fileDir } = path.parse(args.filePath);
  const unpackPath = path.join(fileDir, fileName); // 文件路径（目录）
  const params = ['-Dfile.encoding=UTF-8', '-jar', apktoolJar, 'd', '-k', args.filePath, '-f', '-o', unpackPath];
  return runJava(params);
}

export async function buildApk(args: { filePath: string, useAapt1?:boolean }) {
  const params = ['-Dfile.encoding=UTF-8', '-jar', apktoolJar, 'b', '--use-aapt1', args.filePath];
  console.log('开始打包APK...', params);

  await runJava(params);

  // 构建输出APK文件路径
  // apktool 默认会在输入目录的 dist 子目录中生成 APK 文件
  const { name: dirName } = path.parse(args.filePath);
  const outputApkPath = path.join(args.filePath, 'dist', `${dirName}.apk`);

  console.log('APK打包完成，输出路径:', outputApkPath);
  return outputApkPath;
}
