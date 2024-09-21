import axios, { AxiosResponse } from 'axios';

const API_KEY = '6MMOaN_rcOWvLSrunt6lXQnJ38RzIEjOTXTbCtSyCOk';
const BASE_URL = 'https://api.unsplash.com';

interface Image {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
}

interface FetchImagesResponse {
  results: Image[];
}

export const fetchImages = async (
  query: string,
  page: number = 1,
  perPage: number = 20
): Promise<Image[]> => {
  try {
    const response: AxiosResponse<FetchImagesResponse> = await axios.get(`${BASE_URL}/search/photos`, {
      params: {
        query,
        page,
        per_page: perPage,
        client_id: API_KEY,
      },
    });
    console.log('Response data:', response.data);
    return response.data.results;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
};
