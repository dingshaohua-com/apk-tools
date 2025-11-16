import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MenuItemProps } from '@renderer/types';
import { Button } from '@renderer/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@renderer/components/ui/dialog';
import { getMenuItems, getVariantStyles } from './helper';

const MenuItem = ({ icon, title, description, onClick, variant = 'default' }: MenuItemProps) => {
  return (
    <Button
      variant="outline"
      className={`
        cursor-pointer
        h-28 p-4 flex flex-col items-center justify-center gap-2
        transition-all duration-300 transform hover:scale-105 hover:shadow-xl
        rounded-xl group relative overflow-hidden
        hover:text-white
        ${getVariantStyles(variant)}
      `}
      onClick={onClick}
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-linear-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="text-xl transition-transform duration-300 group-hover:scale-110">{icon}</div>
        <div className="text-center">
          <div className="font-semibold text-sm leading-tight">{title}</div>
          <div className="text-xs opacity-75 mt-1 leading-tight">{description}</div>
        </div>
      </div>
    </Button>
  );
};

export default function Home(): React.JSX.Element {
  const navigate = useNavigate();
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);

  const handleAboutClick = () => {
    setAboutDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* 功能菜单 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {getMenuItems(navigate, handleAboutClick).map((item, index) => (
            <MenuItem key={index} icon={item.icon} title={item.title} description={item.description} variant={item.variant} onClick={item.onClick} />
          ))}
        </div>
      </div>

      {/* 关于对话框 */}
      <Dialog open={aboutDialogOpen} onOpenChange={setAboutDialogOpen}>
        <DialogContent>
          <DialogClose onClose={() => setAboutDialogOpen(false)} />
          <DialogHeader>
            <DialogTitle>关于</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center py-6">
            <p className="text-base text-gray-700 leading-relaxed">
              本软件为个人开发，精力有限请谅解！
            </p>
          </DialogDescription>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setAboutDialogOpen(false)} theme="purpleToBlue">
              知道了
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
