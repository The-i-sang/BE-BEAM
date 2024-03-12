import { useNavigate } from "react-router-dom";

export default function MobileMenu({ path, title, setSideBarOpen }) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(path);
        setSideBarOpen(false);
      }}
      className="cursor-pointer"
    >
      {title}
    </li>
  );
}
