import { Rating } from "@mui/material";

export default function WriteRatingStar({
  onChange,
  value,
  ratingStyles,
  commentStyles,
}) {
  const ratingComment =
    value === 1
      ? "1점(너무 별로예요:()"
      : value === 2
      ? "2점(아쉬워요)"
      : value === 3
      ? "3점(그저 그래요)"
      : value === 4
      ? "4점(괜찮아요)"
      : value === 5
      ? "5점(최고예요:))"
      : "별점을 선택해주세요";

  return (
    <>
      <Rating value={value} onChange={onChange} sx={ratingStyles} />
      <p className={`${commentStyles} text-[#ff3c3c]`}>{ratingComment}</p>
    </>
  );
}
