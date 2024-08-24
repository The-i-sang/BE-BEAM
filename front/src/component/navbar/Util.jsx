// Navbar의 icon menu 또는, profile 정보를 나타낼 때만 사용.

export default function Util({
  icon,
  text,
  children,
  onClick,
  basicStyle,
  smStyle,
  mdStyle,
  lgStyle,
  isHidden,
}) {
  return (
    <button
      type="button"
      className={`${basicStyle} ${smStyle} ${mdStyle} ${lgStyle} ${isHidden} cursor-pointer`}
      onClick={onClick}
    >
      {icon ?? text}
      {children}
    </button>
  );
}
