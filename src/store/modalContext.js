import React, { useState } from 'react';

const defaultState = false;
const ModalContext = React.createContext(defaultState);
const defaultContent = { title: 'Hello', html: 'I am a message' };

const ModalProvider = props => {
  const [isOpen, setOpen] = useState(defaultState);
  const [messageObject, setMessageObject] = useState(defaultContent);
  const close = () => setOpen(false);
  const open = () => setOpen(true);
  const updateMessage = obj => {
    console.log('Update message:');
    console.log(obj);
    setMessageObject(obj);
  };
  return (
    <ModalContext.Provider
      value={{
        open: isOpen,
        message: messageObject,
        setMessage: updateMessage,
        closeModal: close, // expose external closeModel methos and pass to internal close method;
        openModal: open
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
export { ModalProvider };
