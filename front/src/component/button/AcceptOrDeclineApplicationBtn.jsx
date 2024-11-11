// 없앨 컴포넌트. Button만 버튼 컴포넌트로 사용할 예정.

export default function AcceptOrDeclineApplicationBtn({
  btnText,
  onClick,
  basicStyle,
}) {
  return (
    <button
      onClick={onClick}
      className={`${basicStyle} px-4 py-1 box-border border-[1px] border-solid rounded-sm`}
    >
      {btnText}
    </button>
  );
}
