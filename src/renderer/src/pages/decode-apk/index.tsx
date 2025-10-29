import { useState } from 'react';
import { match } from 'ts-pattern';
import { Folder } from 'lucide-react';
import Fail from '@renderer/components/fail';
import Tips from '@renderer/components/tips';
import { CommonState } from '@renderer/types';
import ALink from '@renderer/components/alink';
import Header from '@renderer/components/header';
import Loading from '@renderer/components/loading';
import Success from '@renderer/components/success';
import { Button } from '@renderer/components/ui/button';

export default function DecodeApk(): React.JSX.Element {
  const [state, setState] = useState<CommonState>({ type: 'idle' });

  const onSelectFile = async () => {
    try {
      const filePath = await electron.ipcRenderer.invoke('selectFile');
      if (!filePath) return;
      setState({ type: 'loading' });
      const res = await electron.ipcRenderer.invoke('decodeApk', filePath);
      console.log('成功啦', res);

      setState({ type: 'success', data: res });
    } catch (err) {
      setState({ type: 'error', message: '解包过程中出现错误，请重试' });
      console.error('Unpack error:', err);
    }
  };

  const openUnpackFolder = () => {
    if (state.type === 'success' && state.data) {
      electron.ipcRenderer.invoke('openFolder', state.data);
    }
  };

  return (
    <>
      <div className="h-screen">
        <Header title="APK 解包" />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-8">
          <div className="w-full max-w-2xl">
            {match(state)
              .with({ type: 'idle' }, () => (
                <>
                  <div className="text-center">
                    <Button onClick={onSelectFile} size="lg" theme="purpleToBlue" scale>
                      <Folder className="w-5 h-5 mr-2" />
                      选择 APK
                    </Button>
                  </div>
                  <Tips tips={['支持标准的 apk 文件', '解包需要点时间，请耐心等待']} />
                </>
              ))
              .with({ type: 'loading' }, () => <Loading title="正在解包中..." description="请稍候，正在解包 APK，一般20秒左右！" />)
              .with({ type: 'success' }, () => (
                <Success
                  title=" 🎉  解包成功！"
                  description={
                    <div className="text-sm text-gray-500">
                      <div>APK 文件已成功解包到本地目录，你可以去修改编辑它，</div>
                      <div>
                        若觉得系统自带记事本编辑不好用，推荐尝试
                        <ALink href="https://code.visualstudio.com">Vscode！</ALink>
                      </div>
                    </div>
                  }
                  onRedo={() => setState({ type: 'idle' })}
                  actions={
                    <Button theme="yellow" onClick={openUnpackFolder}>
                      <Folder className="w-4 h-4" /> 打开目录
                    </Button>
                  }
                />
              ))
              .with({ type: 'error' }, ({ message }) => <Fail message={message} onRedo={onSelectFile} />)
              .otherwise(() => null)}
          </div>
        </div>
      </div>
    </>
  );
}
