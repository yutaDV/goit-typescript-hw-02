import React from 'react';
import { Image } from '../../types'; 
import ImageCard from '../ImageCard/ImageCard';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import css from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: Image[];
  isLoading: boolean;
  error: string | null;
  onLoadMore: () => void;
  onImageClick: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  isLoading,
  error,
  onLoadMore,
  onImageClick,
}) => {
  if (error) return <ErrorMessage message={error} />;
  if (isLoading) return <Loader />;

  return (
    <div>
      {images.length > 0 && (
        <ul className={css.galleryContainer}>
          {images.map((image) => (
            <li className={css.galleryItem} key={image.id}>
              <ImageCard image={image} onClick={() => onImageClick(image)} />
            </li>
          ))}
        </ul>
      )}
      {images.length > 0 && <LoadMoreBtn onClick={onLoadMore} />}
    </div>
  );
};

export default ImageGallery;
