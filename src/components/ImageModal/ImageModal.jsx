import ReactModal from "react-modal";

import css from "./ImageModal.module.css";

export default function ImageModal({
  openModal,
  closeModal,
  selectedImg: { alt, urlReg, likes, author },
}) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "1px solid #fafafa",
      padding: "0",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.85)",
    },
  };
  ReactModal.setAppElement("#root");

  return (
    <ReactModal
      isOpen={openModal}
      preventScroll={true}
      onRequestClose={closeModal}
      style={customStyles}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      <div className={css.modalItem}>
        <img className={css.biggerImg} src={urlReg} alt={alt} />
        <p>Author: {author}</p>
        <p>Likes: {likes}</p>
      </div>
    </ReactModal>
  );
}
