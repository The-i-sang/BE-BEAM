import { useNavigate, useLocation } from "react-router-dom";

export default function Menu({ path, title }) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <li
      onClick={() => {
        navigate(path);
      }}
      className={`${
        path === pathName
          ? "text-white font-semibold before:opacity-100"
          : "before:opacity-0"
      } md:w-1/5 sm:w-[23%] py-2 before:absolute before:-inset-1 before:-skew-y-3 before:bg-orange-300 hover:before:opacity-100 relative inline-block cursor-pointer hover:font-semibold hover:text-white transition-all duration-700 before:transition-all before:duration-700`}
    >
      <span className="relative">{title}</span>
    </li>
  );
}
