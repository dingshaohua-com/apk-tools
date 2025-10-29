import getFile from '@main/utils/get-file';
import { spawn, ChildProcess } from 'child_process';

const java = getFile('java');

/**
 * 通用地运行一个使用捆绑JRE的Java命令。
 *
 * @param args - 一个字符串数组，代表要传递给'java'可执行文件的所有参数。
 * @returns 当 Java 进程成功完成时 resolve，失败时 reject 的 Promise。
 */
export function runJava(args: string[] = []): Promise<void> {
  return new Promise((resolve, reject) => {
    const javaProcess: ChildProcess = spawn(java, args);
    javaProcess.stdout?.on('data', (data) => console.log(`[Java]: ${data.toString().trim()}`));
    javaProcess.stderr?.on('data', (data) => console.error(`[Java ERR]: ${data.toString().trim()}`));
    javaProcess.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Java process exited with code ${code}`));
    });
    javaProcess.on('error', (err) => reject(err));
  });
}

