import {
  CheckboxContainer,
  HiddenCheckbox,
  Icon,
  StyledCheckbox2,
} from "../../../StyledComponents";

export default function AllCheckbox({ allCheck, allBtnEvent }) {
  return (
    <div className="w-[5%] flex items-center">
      <CheckboxContainer onClick={allBtnEvent}>
        <HiddenCheckbox type="checkbox" id="all-check" checked={allCheck} />
        <StyledCheckbox2 checked={allCheck} onChange={allBtnEvent}>
          <Icon viewBox="0 0 24 24" className="scale-75">
            <polyline points="20 6 9 17 4 12" />
          </Icon>
        </StyledCheckbox2>
      </CheckboxContainer>
    </div>
  );
}
