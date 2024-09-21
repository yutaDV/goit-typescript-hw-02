import React from 'react';
import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => (
  <div className={css.loadMoreContainer}>
    <button className={css.loadMoreBtn} type="button" onClick={onClick}>
      Load more
    </button>
  </div>
);

export default LoadMoreBtn;
