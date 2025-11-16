import { ipcMain, shell, app } from 'electron';

// 打开自带浏览器
ipcMain.handle('openLink', async (_, link: string) => {
 shell.openExternal(link);
});

// 退出应用
ipcMain.handle('quit-app', async () => {
  app.quit();
});
