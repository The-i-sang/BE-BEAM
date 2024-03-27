// Navbar의 icon menu 또는, profile 정보를 나타낼 때만 사용.

export default function Util({
  icon,
  onClick,
  basicStyle,
  smStyle,
  mdStyle,
  lgStyle,
  isHidden,
  profileImg,
  userNickname,
}) {
  return (
    <button
      type="button"
      className={`${basicStyle} ${smStyle} ${mdStyle} ${lgStyle} ${isHidden} cursor-pointer`}
      onClick={onClick}
    >
      {icon ? (
        icon
      ) : (
        <>
          <img
            className="lg:w-[40px] sm:w-[36px] w-[36px] aspect-square object-cover rounded-full"
            src={process.env.PUBLIC_URL + profileImg}
            alt="profile_img"
          />
          <p className="md:block sm:hidden hidden">{userNickname}</p>
        </>
      )}
    </button>
  );
}
