import React from 'react';
import { Button } from './ui/button';
import { CheckCircle, RotateCcw } from 'lucide-react';

interface SuccessProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  onRedo: () => void;
  actions: React.ReactNode;
}
export default function Success(props: SuccessProps) {
  return (
    <div className="mb-6 relative">
      <div className="p-6 bg-linear-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-800 flex items-center gap-2 ">{props.title}</h3>
            {typeof props.description === 'string' ? <p className="text-green-700 text-sm">{props.description}</p> : props.description}
          </div>
        </div>

        {props.actions && props.onRedo && (
          <div className="flex gap-3 flex-wrap mt-10">
            {props.onRedo && (
              <Button onClick={props.onRedo} theme="red">
                <RotateCcw className="w-4 h-4" />
                重新开始
              </Button>
            )}
            {props.actions && props.actions}
          </div>
        )}
      </div>
    </div>
  );
}
