import { useState } from 'react';
import { match } from 'ts-pattern';
import Fail from '@renderer/components/fail';
import Tips from '@renderer/components/tips';
import { CommonState } from '@renderer/types';
import Header from '@renderer/components/header';
import Loading from '@renderer/components/loading';
import Success from '@renderer/components/success';
import { getDirFromPath } from '@renderer/lib/common';
import { Button } from '@renderer/components/ui/button';
import { FileCheck, RotateCcw, Folder } from 'lucide-react';

type SignState = CommonState | { type: 'file-selected'; data: string };

const certTypeOptions = [
  { label: '梧桐 OS', value: 'tinnove', describe: 'CS75等车型' },
  { label: '飞鱼 OS', value: 'iFlyAuto', describe: '长安UNI-V等车型' },
  { label: 'Deepal OS', value: 'deepal', describe: '深蓝G318等车型' },
  { label: '启源 OS', value: 'qiyuan', describe: 'a07启源等车型' },
];

export default function SignApk() {
  const [state, setState] = useState<SignState>({ type: 'idle' });
  const [certType, setCertType] = useState(certTypeOptions[0].value);

  const onSelectFile = async () => {
    try {
      const filePath = await electron.ipcRenderer.invoke('selectFile');
      filePath && setState({ type: 'file-selected', data: filePath });
    } catch (err) {
      setState({ type: 'error', message: '选择文件失败，请重试' + JSON.stringify(err) });
    }
  };

  const onStartSign = async () => {
    try {
      if (state.type !== 'file-selected') return;
      setState({ type: 'loading' });
      const signedApkPath = await electron.ipcRenderer.invoke('signApk', state.data, certType);
      setState({ type: 'success', data: signedApkPath });
    } catch (err) {
      setState({ type: 'error', message: '签名过程中出现错误，请重试' + JSON.stringify(err) });
    }
  };

  const openSignedFolder = async () => {
    if (state.type === 'success' && state.data) {
      const folderPath = getDirFromPath(state.data);
      electron.ipcRenderer.invoke('openFolder', folderPath);
    }
  };

  const handleReset = () => {
    setState({ type: 'idle' });
    setCertType('');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <Header title="APK 签名" />

      {/* 主要内容区域 */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-8">
        <div className="w-full max-w-2xl">
          {match(state)
            .with({ type: 'idle' }, () => (
              <>
                {/* 选择文件按钮 */}
                <div className="text-center">
                  <Button onClick={onSelectFile} size="lg" theme="purpleToBlue" scale>
                    <Folder className="w-5 h-5 mr-2" />
                    选择 APK
                  </Button>
                </div>
                <Tips tips={['支持标准的 apk 文件', '签名后的文件将保存在原文件同目录下']} />
              </>
            ))
            .with({ type: 'file-selected' }, ({ data: filePath }) => (
              <>
                {/* 文件信息 */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900 font-medium mb-2">已选择文件：</p>
                  <p className="text-sm text-blue-800 font-mono break-all">{filePath}</p>
                </div>

                {/* 车型选择 */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 mb-3 block">选择签名密钥：</label>
                  <select value={certType} onChange={(e) => setCertType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    {certTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-3">
                  <Button onClick={handleReset}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    重新选择
                  </Button>
                  <Button onClick={onStartSign} disabled={!certType} theme="greenToBlue">
                    <FileCheck className="w-4 h-4 mr-2" />
                    开始签名
                  </Button>
                </div>
              </>
            ))
            .with({ type: 'loading' }, () => <Loading title="正在签名中..." description="请稍候，正在签名 APK，一般20秒左右！" />)
            .with({ type: 'success' }, ({ data: signedApkPath }) => (
              <Success
                title=" 🎉 签名成功！"
                onRedo={handleReset}
                description={
                  <div className="bg-white/70 p-3 rounded-lg border border-green-200 mb-4">
                    <p className="text-sm text-green-800 font-mono break-all">📁 {signedApkPath}</p>
                  </div>
                }
                actions={
                  <Button theme="yellow" onClick={openSignedFolder}>
                    <Folder className="w-4 h-4" /> 打开目录
                  </Button>
                }
              />
            ))
            .with({ type: 'error' }, ({ message }) => <Fail message={message} onRedo={handleReset} />)
            .otherwise(() => null)}
        </div>
      </div>
    </div>
  );
}
