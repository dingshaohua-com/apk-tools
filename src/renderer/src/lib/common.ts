/**
 * 从完整的文件路径url中获取文件所在的目录（文件夹路径）
 * @param path
 * @returns
 */
export const getDirFromPath = (path: string) => {
  // const have = path.includes('.apk');
  // return path.includes('.apk') ? path.substring(0, Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'))) : path
  const haveFile = /\.\w+$/.test(path);
  const outputDir = haveFile ? path.substring(0, Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'))) : path;
  return outputDir;
};
