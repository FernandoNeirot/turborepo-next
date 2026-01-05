import AlertModal from "./alert";

export const Modal = {
  Alert: AlertModal,
};

export type ModalType = {
  Alert: typeof AlertModal;
};

export type { AlertModalProps } from "./alert";

export default Modal;
