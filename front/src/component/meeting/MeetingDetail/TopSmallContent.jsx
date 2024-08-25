export default function TopSmallContent({
  icon,
  title,
  styles,
  iconStyle,
  textStyle,
}) {
  return (
    <li
      className={`${styles} border-box border-solid flex items-center gap-x-4`}
    >
      <p className={`${iconStyle}`}>{icon}</p>
      <p className={`${textStyle}`}>{title}</p>
    </li>
  );
}
