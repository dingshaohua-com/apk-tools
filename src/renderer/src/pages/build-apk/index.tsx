import { useState } from 'react';
import { match } from 'ts-pattern';
import Fail from '@renderer/components/fail';
import Tips from '@renderer/components/tips';
import { CommonState } from '@renderer/types';
import { Package, Folder } from 'lucide-react';
import Header from '@renderer/components/header';
import Loading from '@renderer/components/loading';
import Success from '@renderer/components/success';
import CheckBox from '@renderer/components/checkbox';
import { getDirFromPath } from '@renderer/lib/common';
import { Button } from '@renderer/components/ui/button';

type StepState =
  | CommonState
  | {
      type: 'selectedDir';
      data: string;
    };

export default function BuildApk() {
  const [state, setState] = useState<StepState>({ type: 'idle' });
  const [useAapt1, setUseAapt1] = useState(false);

  const onSelectDir = async () => {
    const directoryPath = await electron.ipcRenderer.invoke('selectDir');
    directoryPath && setState({ type: 'selectedDir', data: directoryPath });
  };

  const onStartPack = async () => {
    if (state.type !== 'selectedDir') return;
    setState({ type: 'loading' });
    const result = await electron.ipcRenderer.invoke('buildApk', state.data);
    setState({ type: 'success', data: result || state.data });
  };

  const openOutputFolder = async () => state.type === 'success' && electron.ipcRenderer.invoke('openFolder', getDirFromPath(state.data));
  return (
    <div className="h-screen">
      <Header title="APK 重打包" />

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-8">
        <div className="w-full max-w-2xl">
          {match(state)
            .with({ type: 'idle' }, () => (
              <>
                <div className="text-center">
                  <Button onClick={onSelectDir} size="lg" theme="purpleToBlue" scale>
                    <Folder className="w-5 h-5 mr-2" />
                    选择解包目录
                  </Button>
                </div>
                <Tips tips={['请选择已解包的 APK 目录', '打包需要一些时间，请耐心等待']} />
              </>
            ))
            .with({ type: 'selectedDir' }, ({ data: directoryPath }) => (
              <>
                {/* 目录信息 */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900 font-medium mb-2">已选择目录：</p>
                  <p className="text-sm text-blue-800 font-mono break-all">{directoryPath}</p>

                  {/* aapt1 选项 */}
                  <div className="mt-4 p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <CheckBox value={useAapt1} onChange={setUseAapt1} label="使用 aapt1" description="针对一些软件（如高德），某些情况下可能更兼容" />
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => setState({ type: 'idle' })}>
                    <Folder className="w-4 h-4" />
                    重新选择
                  </Button>
                  <Button onClick={onStartPack} theme="greenToBlue">
                    <Package className="w-4 h-4" />
                    开始打包
                  </Button>
                </div>
              </>
            ))
            .with({ type: 'loading' }, () => <Loading title="正在打包中..." description="请稍候，正在重新打包 APK，一般需要30秒左右！" />)
            .with({ type: 'success' }, ({ data: outputPath }) => (
              <Success
                title=" 🎉  打包成功！"
                description={
                  <div className="mb-4 p-3 bg-green-100 rounded-lg">
                    <p className="text-sm text-green-900 font-medium mb-1">输出路径：</p>
                    <p className="text-sm text-green-800 font-mono break-all">{outputPath}</p>
                  </div>
                }
                onRedo={() => setState({ type: 'idle' })}
                actions={
                  <Button onClick={openOutputFolder} theme="yellow">
                    <Folder className="w-4 h-4" /> 打开输出目录
                  </Button>
                }
              />
            ))
            .with({ type: 'error' }, ({ message }) => <Fail message={message} onRedo={() => setState({ type: 'idle' })} />)
            .otherwise(() => null)}
        </div>
      </div>
    </div>
  );
}
