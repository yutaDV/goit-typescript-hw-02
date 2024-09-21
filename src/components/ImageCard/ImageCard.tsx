import React from 'react';
import { Image } from '../../types'; 
import css from './ImageCard.module.css';

interface ImageCardProps {
  image: Image;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => (
  <div onClick={onClick}>
    <img
      className={css.ImageCard}
      src={image.urls.small}
      alt={image.alt_description}
    />
  </div>
);

export default ImageCard;

