// 없앨 컴포넌트. Button만 버튼 컴포넌트로 사용할 예정.

export default function SnsBtn({
  onClick,
  buttonText,
  icon,
  btnStyles,
  IconStyles,
}) {
  return (
    <button
      onClick={onClick}
      className={`${btnStyles} box-border font-bold flex items-center justify-center gap-x-2 transition-all duration-700`}
    >
      <div className={`${IconStyles}`}>{icon}</div>
      {buttonText}
    </button>
  );
}
