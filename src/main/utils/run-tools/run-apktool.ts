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
