import loadingImg from '@renderer/assets/imgs/loading.gif';
import React from 'react';

export default function Loading(props: { title: string; description: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <img src={loadingImg} alt="Loading" className="w-32 h-32 object-contain" />
      <div>
        <h3 className="text-xl font-semibold text-gray-900">{props.title}</h3>
        <p className="text-gray-400 text-sm">{props.description}</p>
      </div>
    </div>
  );
}
