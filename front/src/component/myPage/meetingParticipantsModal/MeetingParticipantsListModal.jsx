import MeetingParticipantsModalTop from "./MeetingParticipantsModalTop";
import MeetingParticipantsModalContent from "./MeetingParticipantsModalContent";

export default function MeetingParticipantsListModal({
  modalOpen,
  setModalOpen,
  data,
}) {
  return (
    <div
      className={`${
        modalOpen ? "opacity-100 z-[99]" : "opacity-0 z-[-99]"
      } w-[80%] h-[96vh] p-6 box-border bg-white drop-shadow-xl border-[1px] border-solid border-[#ccc] rounded-2xl fixed top-[50%] left-[50%] ml-[-40%] mt-[-48vh] transition-all duration-1000`}
    >
      <MeetingParticipantsModalTop
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        data={data}
      />
      <MeetingParticipantsModalContent />
    </div>
  );
}
