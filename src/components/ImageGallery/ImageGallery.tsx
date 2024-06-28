import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";
import { FC } from "react";

interface Item {
  id: number;
  urls: { small: string; regular: string };
  description: string;
  likes: number;
  user: { name: string };
}

interface ImageGalleryProps {
  items: Item[];
  openModal: (
    alt: string,
    urlReg: string,
    likes: number,
    author: string
  ) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ items, openModal }) => {
  return (
    <ul className={css.gallery}>
      {items.map((item) => {
        return (
          <li className={css.galleryItem} key={item.id}>
            <ImageCard
              urlSm={item.urls.small}
              urlReg={item.urls.regular}
              alt={item.description}
              likes={item.likes}
              author={item.user.name}
              openModal={openModal}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
