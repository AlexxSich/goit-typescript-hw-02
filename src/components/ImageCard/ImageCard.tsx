import css from "./ImageCard.module.css";

interface ImageCardProps {
  urlSm: string;
  urlReg: string;
  openModal: (
    alt: string,
    urlReg: string,
    likes: number,
    author: string
  ) => void;
  alt: string;
  likes: number;
  author: string;
}

export default function ImageCard({
  urlSm,
  urlReg,
  openModal,
  alt,
  likes,
  author,
}: ImageCardProps) {
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
