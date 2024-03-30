import {
  CheckboxContainer,
  HiddenCheckbox,
  Icon,
  StyledCheckbox2,
} from "../../../StyledComponents";

export default function PersonalCheckbox({ post, check, checkBtnEvent }) {
  return (
    <div className="w-[5%] flex items-center">
      <CheckboxContainer onClick={() => checkBtnEvent(post.pk)}>
        <HiddenCheckbox
          type="checkbox"
          id={`check-${post.pk}`}
          checked={
            check[check.findIndex((el) => el.title === `check-${post.pk}`)]
              .state
          }
        />
        <StyledCheckbox2
          checked={
            check[check.findIndex((el) => el.title === `check-${post.pk}`)]
              .state
          }
          onChange={() => checkBtnEvent(post.pk)}
        >
          <Icon viewBox="0 0 24 24" className="scale-75">
            <polyline points="20 6 9 17 4 12" />
          </Icon>
        </StyledCheckbox2>
      </CheckboxContainer>
    </div>
  );
}
