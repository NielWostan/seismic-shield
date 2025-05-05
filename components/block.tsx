export const Block = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) => (
  <div className="flex flex-col gap-4 w-full">
    <strong className="text-xl">{label}</strong>
    <input
      type="text"
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block text-black w-full rounded-md bg-transparent py-3 px-3 placeholder:text-base-contrast/50 disabled:bg-black/10 disabled:cursor-not-allowed border-2"
    />
  </div>
);
