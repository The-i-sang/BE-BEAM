export default function TextArea({
  type,
  id,
  placeholder,
  onChange,
  value,
  styles,
}) {
  return (
    <textarea
      id={id}
      type={type}
      placeholder={placeholder}
      className={`${styles} w-full px-6 py-3 box-border rounded-lg border-[1px] border-solid outline-none placeholder:text-[0.9rem] font-normal text-[#2b2a2a] resize-none`}
      onChange={onChange}
      value={value}
      cols="30"
      rows="5"
    />
  );
}
