import { NavLink } from "react-router-dom";

export const renderNavlink = (to, text, additionalClasses = "") => {
  <li key={to}>
    <NavLink
      to={to}
      className={`text-gray-700 px-2 py-1 hover:text-blue-500 ${additionalClasses}`}
    >
      {text}
    </NavLink>
  </li>;
};
