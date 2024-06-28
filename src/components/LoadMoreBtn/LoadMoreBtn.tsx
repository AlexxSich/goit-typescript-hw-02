import css from "./LoadMoreBtn.module.css";
import { FC } from "react";

interface LoadMoreBtnProps {
  handleLoadMore: () => void;
}

const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ handleLoadMore }) => {
  return (
    <button className={css.loadMoreBtn} onClick={handleLoadMore}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
