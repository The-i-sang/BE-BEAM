import { formatDateAndTime } from "../../../common";

export default function MeetingDetailSmallContent({
  icon,
  subTitle,
  des,
  desList,
}) {
  return (
    <li className="mb-4 flex gap-x-2 text-[1.8rem]">
      {icon}

      <div className="text-text-light-60 dark:text-text-dark-10 sm:text-[1rem] text-[0.875rem]">
        <p className="mb-2 sm:text-[1.12rem] text-[0.9rem] text-text-light-90 dark:text-text-dark-default font-semibold">
          {subTitle}
        </p>

        <p>{des}</p>

        <ul>
          {desList?.map((data, idx) => (
            <li key={idx} className="mb-1">
              {`${formatDateAndTime(data.schedule)} · ${data.content}`}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
