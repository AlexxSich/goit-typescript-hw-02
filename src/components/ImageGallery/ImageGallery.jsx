import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ items, openModal }) {
  return (
    <ul className={css.gallery}>
      {items.map((item) => {
        console.log(item);
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
}
