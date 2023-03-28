import React, {
  createRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import styled from 'styled-components';

interface ToastProps {
  id: number;
  message: string;
  color: 'danger' | 'success';
  removeToast: (id: number) => void;
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  padding: 12px;
  box-sizing: border-box;
  z-index: 9999;
`;

const Message = styled.div<{ show: boolean; color: 'danger' | 'success' }>`
  background-color: ${({ color }) => {
    return color === "danger" ? '#e74c3c' : '#2ecc71';
  }};
  color: #fff;
  padding: 8px 20px;
  margin-bottom: 6px;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: #fff;
  border: none;
  font-size: 14px;
  cursor: pointer;
  margin-left: 8px;
`;

const ToastComponent: React.FC<ToastProps> = ({
  id,
  message,
  color,
  removeToast,
}) => {
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      removeToast(id);
    }, 10000);

    return () => clearTimeout(timer);
  }, [id, removeToast]);

  const handleCloseClick = () => {
    setShow(false);
    removeToast(id);
  };

  return (
    <Message show={show} color={color}>
      {message}
      <CloseButton onClick={handleCloseClick}>x</CloseButton>
    </Message>
  );
};

export const ToastRef = createRef<{
  addToast: (message: string, color: 'danger' | 'success') => void;
}>();

const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<
    { id: number; message: string; color: 'danger' | 'success' }[]
  >([]);

  const addToast = (message: string, color: 'danger' | 'success') => {
    if (toasts.length >= 3) {
      return;
    }

    const newToast = { id: Date.now(), message, color };
    setToasts([...toasts, newToast]);
  };

  const removeToast = (id: number) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  useImperativeHandle(ToastRef, () => ({ addToast }));

  return (
    <Container>
      {toasts.map((toast) => (
        <ToastComponent
          key={toast.id}
          id={toast.id}
          message={toast.message}
          color={toast.color}
          removeToast={removeToast}
        />
      ))}
    </Container>
  );
};

export default ToastContainer;
