import React from "react";
import "../../styles/Layout.css";
import { isOpenAtom } from "../atom/modal"
import { useAtom } from "jotai";
import Modal from "./Modal"
  
const Sidebar = () => {
  const [, setIsOpen] = useAtom(isOpenAtom);
  
  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="sidebar">
      <Modal />
      <button
        onClick={handleClick}
      >
        Add a Subject
      </button>
    </div>
  );
}

export default Sidebar;