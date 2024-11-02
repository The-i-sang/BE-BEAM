import BasicModal from "../BasicModal";
import NextArrow from "../../slider/NextArrow";
import PrevArrow from "../../slider/PrevArrow";

export default function MeetingDetailImageModal({
  detailImageModal,
  setDetailImageModal,
  images,
  selectImageIndex,
  setSelectImageIndex,
}) {
  return (
    <BasicModal
      setModal={setDetailImageModal}
      wrapStyles={`${
        detailImageModal ? "opacity-100 z-[99]" : "opacity-0 z-[-99]"
      } sm:block 3sm:hidden`}
      height="h-[90vh]"
      styles="overflow-y-scroll"
    >
      <div className="flex items-center justify-center w-full h-full mt-20">
        <img
          className="object-cover w-full my-4 rounded-lg aspect-square"
          src={images?.[selectImageIndex]}
          alt="meetingImage"
        />
      </div>

      <PrevArrow
        styles="top-[60%] left-3"
        fontStyles="text-[4rem] text-white"
        onClick={() => setSelectImageIndex((prev) => prev - 1)}
        disabled={selectImageIndex === 0}
      />
      <NextArrow
        styles="top-[60%] right-3"
        fontStyles="text-[4rem] text-white"
        onClick={() => setSelectImageIndex((prev) => prev + 1)}
        disabled={images?.length - 1 === selectImageIndex}
      />
    </BasicModal>
  );
}
