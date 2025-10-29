import { useState } from 'react';
import { match } from 'ts-pattern';
import Fail from '@renderer/components/fail';
import Tips from '@renderer/components/tips';
import { CommonState } from '@renderer/types';
import { Package, Folder } from 'lucide-react';
import Header from '@renderer/components/header';
import Loading from '@renderer/components/loading';
import Success from '@renderer/components/success';
import { Button } from '@renderer/components/ui/button';

export default function BuildApk() {
  const [state, setState] = useState<CommonState>({ type: 'idle' });

  const onSelectDirectory = async () => {
    const directoryPath = await electron.ipcRenderer.invoke('select-dir');
    directoryPath && setState({ type: 'success', data: directoryPath });
  };

  const onStartPack = async () => {
    if (state.type !== 'success') return;
    setState({ type: 'loading' });
    const result = await electron.ipcRenderer.invoke('build-apk', state.data);
    setState({ type: 'success', data: result || state.data });
  };

  const openOutputFolder = async () => {
    if (state.type === 'success') {
      const outputPath = state.data;
      const outputDir = outputPath.includes('.apk') ? outputPath.substring(0, Math.max(outputPath.lastIndexOf('/'), outputPath.lastIndexOf('\\'))) : outputPath;
      electron.ipcRenderer.invoke('open-folder', outputDir).catch((err) => console.error('Failed to open folder:', err));
    }
  };

  const handleReset = () => setState({ type: 'idle' });

  return (
    <div className="h-screen">
      <Header title="APK 重打包" />

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-8">
        <div className="w-full max-w-2xl">
          {match(state)
            .with({ type: 'idle' }, () => (
              <>
                <div className="text-center">
                  <Button onClick={onSelectDirectory} size="lg" className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <Folder className="w-5 h-5 mr-2" />
                    选择解包目录
                  </Button>
                </div>
                <Tips tips={['请选择已解包的 APK 目录', '打包需要一些时间，请耐心等待']} />
              </>
            ))
            .with({ type: 'success' }, ({ data: directoryPath }) => (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {/* 目录信息 */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900 font-medium mb-2">已选择目录：</p>
                  <p className="text-sm text-blue-800 font-mono break-all">{directoryPath}</p>
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-3 justify-center">
                  <Button onClick={onSelectDirectory} variant="outline" className="flex items-center gap-2">
                    <Folder className="w-4 h-4" />
                    重新选择
                  </Button>
                  <Button onClick={onStartPack} className="bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    开始打包
                  </Button>
                </div>
              </div>
            ))
            .with({ type: 'loading' }, () => <Loading title="正在打包中..." description="请稍候，正在重新打包 APK，一般需要30秒左右！" />)
            //  .with({ type: 'success' }, ({ outputPath }) => (
            //                <Success
            //                  title=" 🎉  打包成功！"
            //                  description={
            //                    <div className="mb-4 p-3 bg-green-100 rounded-lg">
            //                      <p className="text-sm text-green-900 font-medium mb-1">输出路径：</p>
            //                      <p className="text-sm text-green-800 font-mono break-all">{outputPath}</p>
            //                    </div>
            //                  }
            //                  onRedo={() => setState({ type: 'idle' })}
            //                  actions={
            //                    <Button onClick={openOutputFolder} size="sm" className="cursor-pointer bg-yellow-600 hover:bg-yellow-700 text-white flex items-center gap-2">
            //                      <Folder className="w-4 h-4" /> 打开输出目录
            //                    </Button>
            //                  }
            //                />
            //              ))
            .with({ type: 'error' }, ({ message }) => <Fail message={message} onRedo={handleReset} />)
            .otherwise(() => null)}
        </div>
      </div>
    </div>
  );
}
