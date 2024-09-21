import React from 'react';
import { Rings } from 'react-loader-spinner'; 
import css from './Loader.module.css';

const Loader: React.FC = () => (
  <div className={css.loader}>
    <Rings color="#00BFFF" height={80} width={80} />
  </div>
);

export default Loader;
