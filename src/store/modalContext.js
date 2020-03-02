import React, { useState } from 'react';

const defaultState = false;
const ModalContext = React.createContext(defaultState);

const ModalProvider = props => {
  const [isOpen, setOpen] = useState(defaultState);

  const close = () => setOpen(false);
  const open = () => setOpen(true);

  return (
    <ModalContext.Provider
      value={{
        open: isOpen,
        closeModal: close,
        openModal: open
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
export { ModalProvider };
