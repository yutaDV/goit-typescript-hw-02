// types.ts
export interface Image {
  id: string;
  urls: {
    small: string;
    regular: string; // Додаємо regular для сумісності
  };
  alt_description: string;
}
