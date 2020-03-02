import React from 'react';

const defaultState = {
  open: true
};

const ModalContext = React.createContext(defaultState);

class ModalProvider extends React.Component {
  state = {
    open: true
  };

  close = () => {
    this.setState({ open: false });
  };

  open = () => {
    this.setState({ open: true });
  };

  render() {
    const { children } = this.props;
    const { open } = this.state;
    return (
      <ModalContext.Provider
        value={{
          open,
          closeModal: this.close,
          openModal: this.open
        }}
      >
        {children}
      </ModalContext.Provider>
    );
  }
}

export default ModalContext;

export { ModalProvider };
