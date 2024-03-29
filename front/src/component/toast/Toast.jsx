import { toast } from "react-toastify";

const ToastComponent = ({ comment }) => <div>{comment}</div>;

export const Toast = (comment) =>
  toast(<ToastComponent comment={comment} />, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    progress: false,
    closeOnClick: true,
    closeButton: true,
  });
