import React from "react";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useAtom } from "jotai";
import { isOpenAtom } from "../atom/aboutusmodal"

import "../../styles/Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const AboutUsModal = () => {
	const [isOpen, setIsOpen] = useAtom(isOpenAtom);

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="dialog"
        onClose={closeModal}
      >
        <div className="fragment">
          <span
            className="span"
            aria-hidden="true"
          >
            &#8203;
          </span>
        
          <div className="modal">
            <Dialog.Title
              as="div"
              className="modal-title"
            >
              About Us
              <button 
                className="close-button"
                onClick={closeModal}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className="close-icon"
                  size="lg"
                />
              </button>
            </Dialog.Title>

            {/* MODAL BODY */}
            <div className="modal-body">
              <strong>Created by</strong>
              <ul>
                <li>
                  Kyle Edward Aquino
                </li>
                <li>
                  Elcid Cruzado
                </li>
                <li>
                  Rene Jotham Culaway
                </li>
                <li>
                  Jezreel Mae Estares
                </li>
                <li>
                  John Mel Ramos
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AboutUsModal;