import path from 'path';
import getFile from '@main/utils/get-file';
import { getJks } from '@main/utils/get-jks';
import { runCommand } from '@main/utils/run-tools/run-command';

const apksigner = getFile('apksigner');

export async function runApkSigner(args: { filePath: string; certType: string }): Promise<string> {
  // apksigner sign --ks $tempDir/cert.jks --ks-key-alias "cert" --ks-pass pass:123456789 --v1-signing-enabled true --v2-signing-enabled true --v3-signing-enabled false --out $newApkFilePath $filePath
  // 使用path.parse解析路径
  const pathObj = path.parse(args.filePath);
  // 文件名（不含后缀）
  const fileNameWithoutExt = pathObj.name;
  // 文件路径（目录）
  const directory = pathObj.dir;
  // 构建输出文件的完整路径
  const outputApkPath = path.join(directory, `${fileNameWithoutExt}-signed.apk`);
  await runCommand(
    apksigner,
    [
      'sign',
      '--ks',
      getJks(args.certType).path,
      '--ks-key-alias',
      'cert',
      '--ks-pass',
      'pass:123456789',
      '--v1-signing-enabled',
      'true',
      '--v2-signing-enabled',
      'true',
      '--v3-signing-enabled',
      'false',
      '--out',
      outputApkPath,
      args.filePath, // 输入的APK文件
    ],
    { shell: true },
  );
  return outputApkPath;
}
