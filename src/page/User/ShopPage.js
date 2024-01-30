import React from "react";
import { useSelector } from "react-redux";

export default function ShopPage() {
  let user = useSelector((state) => state.userSLice.user);
  console.log("🙂 ~ ShopPage ~ user:", user)
  return <div className="pt-28">ShopPage</div>;
}
