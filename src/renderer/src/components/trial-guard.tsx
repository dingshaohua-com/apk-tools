import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { isTrialExpired } from '@renderer/utils/trial';
import qqImg from '@renderer/assets/imgs/qq.jpg';

interface TrialGuardProps {
  children: React.ReactNode;
}

/**
 * 试用期守卫组件
 * 如果试用期已过期，显示提示对话框并阻止使用
 */
export default function TrialGuard({ children }: TrialGuardProps) {
  const [trialExpiredDialogOpen, setTrialExpiredDialogOpen] = useState(false);

  useEffect(() => {
    if (isTrialExpired()) {
      setTrialExpiredDialogOpen(true);
    }
  }, []);

  const handleQuit = () => {
    if (window.electron?.ipcRenderer) {
      window.electron.ipcRenderer.invoke('quit-app');
    }
  };

  // 如果试用期已过期，只显示对话框，不显示子组件
  if (trialExpiredDialogOpen) {
    return (
      <Dialog open={trialExpiredDialogOpen} onOpenChange={() => {}}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-red-600 text-xl">⚠️ 试用期已到期</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center py-2">
            <div className="space-y-4">
              <p className=" text-gray-800 font-medium">
                此版本试用期已到，请到QQ群或QQ频道获取最新版本！
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                  <img src={qqImg} alt="" />
              </div>
            </div>
          </DialogDescription>
          <div className="flex justify-center mt-4">
            <Button 
              onClick={handleQuit} 
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              退出应用
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return <>{children}</>;
}

