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

export default function App() {
  const notify = () => toast.error("Try to put something in the input field");

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");

  function openModal(alt, urlReg, likes, author) {
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
        setImages((prevImg) => [...prevImg, ...fetchedImages.results]);
        setTotalPages(fetchedImages.total_pages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImg();
  }, [searchQuery, page]);

  const handleSearch = async (searchedImg) => {
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
