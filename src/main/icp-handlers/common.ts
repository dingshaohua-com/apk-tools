import { ipcMain, shell } from 'electron';

// 打开自带浏览器
ipcMain.handle('openLink', async (_, link: string) => {
 shell.openExternal(link);
});
