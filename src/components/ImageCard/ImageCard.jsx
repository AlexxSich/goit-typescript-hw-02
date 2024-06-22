import css from "./ImageCard.module.css";

export default function ImageCard({
  urlSm,
  urlReg,
  openModal,
  alt,
  likes,
  author,
}) {
  return (
    <>
      <div>
        <img
          className={css.galleryImg}
          onClick={() => openModal(alt, urlReg, likes, author)}
          src={urlSm}
          alt={alt}
        />
      </div>
    </>
  );
}
