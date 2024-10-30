export default function Input({
  type = "text",
  id,
  placeholder,
  onChange,
  value,
  maxLength,
  styles,
}) {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className={`${styles} box-border bg-transparent rounded-lg border-[1px] border-solid outline-none font-normal`}
      onChange={onChange}
      value={value}
      maxLength={maxLength}
    />
  );
}
