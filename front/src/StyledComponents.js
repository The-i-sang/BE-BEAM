import styled from "styled-components";
import { ToastContainer } from "react-toastify";

export const StyledToastContainer = styled(ToastContainer).attrs({})`
  @media (max-width: 768px) {
    width: 90% !important;
    max-width: none !important;
    transform: translateX(-50%) !important;
    left: 50% !important;
    bottom: 1em !important;
  }

  .Toastify__toast--default {
    background-color: #100e10 !important;
    color: white !important;
    font-size: 14px !important;
  }

  .Toastify__close-button {
    color: white !important;
    opacity: 0.8 !important;
  }

  .Toastify__progress-bar {
    background: #d93c30 !important;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  vertical-align: middle;
`;

export const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const StyledCheckbox = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  background: ${(props) => (props.checked ? "black" : "white")};
  border-radius: 50%;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px gold;
  }

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

export const StyledCheckbox2 = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid #ccc;
  background: ${(props) => (props.checked ? "black" : "white")};
  border-radius: 16%;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px gold;
  }

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

export const StyledLabel = styled.label`
  font-size: 0.8rem;
  color: #333;
  .term {
    color: #6ca9ff;
  }
`;
