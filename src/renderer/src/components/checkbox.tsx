import { useControllableValue } from 'ahooks';

interface CheckboxProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description: string;
}

export default function Checkbox(props: CheckboxProps) {
  const [state, setState] = useControllableValue<boolean>(props, {
    defaultValue: false,
  });
  return (
    <div>
      <label className="flex items-center gap-3 cursor-pointer mb-2">
        <input type="checkbox" checked={state} onChange={(e) => setState(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
        <span className="text-sm text-gray-700 font-medium">使用 aapt1</span>
      </label>
      <p className="text-xs text-gray-500 ml-7">针对一些软件（如高德），某些情况下可能更兼容</p>
    </div>
  );
}
