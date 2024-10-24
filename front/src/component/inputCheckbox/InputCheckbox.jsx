export default function InputCheckbox({
  datas,
  texts,
  isChecked,
  isCheckedList,
  name,
  onChange,
  styles,
  labelStyles,
  enableStyles,
}) {
  return (
    <div className={`${styles} gap-x-2`}>
      {datas.map((data, idx) => (
        <div key={idx}>
          <input
            className="sr-only"
            type="checkbox"
            id={data}
            name={name}
            value={data}
            onChange={onChange}
            checked={isCheckedList?.includes(data) || data === isChecked}
          />

          <label
            className={`${
              isCheckedList?.includes(data) || data === isChecked
                ? enableStyles
                : "text-[#383838]"
            } ${labelStyles} py-3 cursor-pointer rounded-lg border-[1px] border-solid border-[#ccc] transition-all duration-700 flex justify-center items`}
            htmlFor={data}
          >
            {texts ? texts[idx] : data}
          </label>
        </div>
      ))}
    </div>
  );
}
