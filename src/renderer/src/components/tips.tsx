interface TipsProps {
  tips: string[];
}

export default function Tips(props: TipsProps) {
  return (
    <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h4 className="text-sm font-medium text-blue-900 mb-2">温馨提示：</h4>
      <ul className="text-sm text-blue-800 space-y-1">
        {props.tips.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
