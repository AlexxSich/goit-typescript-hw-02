import { useState, useEffect } from "react";

import { getImages } from "../../image-api";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import SearchBar from "../SearchBar/SearchBar";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { ToastContainer, toast } from "react-toastify";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

import css from "./App.module.css";
import "react-toastify/dist/ReactToastify.css";

export interface Image {
  id: number;
  urls: { small: string; regular: string };
  description: string;
  likes: number;
  user: { name: string };
}

// interface MyFetchedImages {
//   results?: Image[];
//   total?: number;
//   total_pages?: number;
// }

export default function App() {
  const notify = (): void => {
    toast.error("Try to put something in the input field");
  };
  const [images, setImages] = useState<Image[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [totalPages, setTotalPages] = useState<number>(1);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  interface SelectedImg {
    alt: string;
    urlReg: string;
    likes: number;
    author: string;
  }

  const selectedImgInitialValue = {
    alt: "",
    urlReg: "",
    likes: 0,
    author: "",
  };

  const [selectedImg, setSelectedImg] = useState<SelectedImg>(
    selectedImgInitialValue
  );

  function openModal(
    alt: string,
    urlReg: string,
    likes: number,
    author: string
  ) {
    setModalIsOpen(true);
    setSelectedImg({ alt, urlReg, likes, author });
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    if (searchQuery.trim() === "") {
      return;
    }

    async function fetchImg() {
      try {
        setIsLoading(true);
        setIsError(false);
        const fetchedImages = await getImages(searchQuery, page);

        if (fetchedImages.results) {
          setImages((prevImg) => [...prevImg, ...fetchedImages.results]);
        }
        setTotalPages(fetchedImages.total_pages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImg();
  }, [searchQuery, page]);

  const handleSearch = async (searchedImg: string) => {
    setSearchQuery(searchedImg);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = async () => {
    setPage(page + 1);
  };

  const isLastPage = page >= totalPages;

  return (
    <div className={css.pageContainer}>
      <header className={css.headerContainer}>
        <SearchBar onSearch={handleSearch} notify={notify} />
      </header>
      <div className={css.galleryContainer}>
        {isError && <ErrorMessage />}
        {images.length > 0 && (
          <ImageGallery items={images} openModal={openModal} />
        )}
        {images.length > 0 && !isLoading && !isLastPage && (
          <LoadMoreBtn handleLoadMore={handleLoadMore} />
        )}

        {images.length > 0 && isLastPage && (
          <p className={css.lastInfo}>Sorry, no more images...</p>
        )}
        {isLoading && <Loader />}
      </div>
      <ImageModal
        openModal={modalIsOpen}
        closeModal={closeModal}
        selectedImg={selectedImg}
      />
      <ToastContainer />
    </div>
  );
}
