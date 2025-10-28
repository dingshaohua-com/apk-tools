import { Button } from './ui/button';
import { ArrowLeft, Package } from 'lucide-react';

interface HeaderProps {
    title: string
}

export default function Header(props: HeaderProps) {
  const handleBackToHome = () => {
    window.location.hash = '/';
  };
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBackToHome} className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              <h1 className="text-lg font-semibold text-gray-900">{props.title}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
