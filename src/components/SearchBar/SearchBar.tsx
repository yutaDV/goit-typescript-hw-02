import React from 'react';
import { useState, ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

// Тип для пропсів
interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  // Типізуємо стан як рядок
  const [query, setQuery] = useState<string>('');

  // Обробник зміни введення, типізуємо як ChangeEvent для input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Обробник надсилання форми, типізуємо як FormEvent
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Please enter a search query.');
      return;
    }
    onSubmit(query); // Передаємо рядок з запитом в onSubmit
    setQuery(''); // Очищаємо поле введення
  };

  return (
    <header className={css.searchBoxContainer}>
      <form onSubmit={handleSubmit}>
        <div className={css.formContainer}>
          <button className={css.formBtm} type="submit">🔍</button>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={css.formInput}
          />
        </div>
      </form>
    </header>
  );
};

export default SearchBar;
