import React, { useState } from 'react';
import Modal from 'react-modal';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { fetchImages } from './services/api.ts';
import css from './App.module.css';
import { Image } from './types'; 

type FetchImagesResult = Image[];

Modal.setAppElement('#root');

const App: React.FC = () => {
  const [images, setImages] = useState<FetchImagesResult>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<Image | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>(''); 

  const handleSearch = async (newQuery: string) => {
    setIsLoading(true);
    setError(null);
    setPage(1);
    setQuery(newQuery); 
    try {
      const data = await fetchImages(newQuery);
      setImages(data as FetchImagesResult); // Приведення типу
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const newPage = page + 1;
      const data = await fetchImages(query, newPage);
      if (data.length === 0) {
        setError('No more images found.');
        return;
      }
      setImages((prevImages) => [...prevImages, ...data as FetchImagesResult]); 
      setPage(newPage);
    } catch (err) {
      setError('Failed to load more images');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (image: Image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      <ImageGallery
        images={images}
        isLoading={isLoading}
        error={error}
        onLoadMore={handleLoadMore}
        onImageClick={openModal}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
          content: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            border: 'none',
            background: 'transparent',
          },
        }}
      >
        {modalImage && (
          <img
            src={modalImage.urls.regular}
            alt={modalImage.alt_description}
          />
        )}
      </Modal>
    </div>
  );
};

export default App;
