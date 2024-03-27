export default function Button({
  type,
  onClick,
  buttonText,
  disabled,
  basicStyle,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full p-3 box-border rounded-md text-center font-semibold text-[0.875rem] text-white transition-all duration-700 ${basicStyle} ${
        disabled
          ? "bg-[#d0d0d0] border-[#d0d0d0]"
          : "bg-[#f5aa15] border-[#f5aa15]"
      }`}
    >
      {buttonText}
    </button>
  );
}
