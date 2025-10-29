import { spawn } from 'child_process';

// 执行命令的工具函数
export function runCommand(command: string, args: string[], options = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, options);
    let stdout = '';
    let stderr = '';

    process.stdout?.on('data', (data) => {
      stdout += data.toString('utf8');
    });

    process.stderr?.on('data', (data) => {
      stderr += data.toString('utf8');
    });

    process.on('close', (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(new Error(`Command failed with code ${code}: ${stderr}`));
      }
    });

    process.on('error', (error) => {
      reject(error);
    });
  });
}