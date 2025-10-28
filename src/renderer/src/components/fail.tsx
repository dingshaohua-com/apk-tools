import { Button } from './ui/button';
import { Package, AlertCircle } from 'lucide-react';

interface FailProps {
  message: string;
  onRedo: () => void;
}

export default function Fail(props: FailProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span className="text-sm font-medium text-red-700">{props.message}</span>
        </div>
      </div>

      {/* 选择文件按钮 */}
      {props.onRedo && (
        <div className="text-center">
          <Button onClick={props.onRedo} size="lg" className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Package className="w-5 h-5 mr-2" />
            重新尝试
          </Button>
        </div>
      )}
    </div>
  );
}
