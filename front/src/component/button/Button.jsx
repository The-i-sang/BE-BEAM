export default function Button({
  type = "button",
  onClick,
  buttonText,
  icon,
  disabled = false,
  basicStyle,
  styles,
  enableStyles,
  children,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${basicStyle} ${styles} ${
        disabled ? "bg-[#d0d0d0] border-[#d0d0d0]" : enableStyles
      } rounded-lg`}
    >
      {buttonText ?? icon}
      {children}
    </button>
  );
}
