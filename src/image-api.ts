import axios from "axios";

export interface Image {
  id: number;
  urls: { small: string; regular: string };
  description: string;
  likes: number;
  user: { name: string };
}

interface ResponseData {
  results?: Image[];
  total?: number;
  total_pages?: number;
}

axios.defaults.baseURL = "https://api.unsplash.com/";

export const getImages = async (
  searchedImg: string,
  currentPage: number
): Promise<ResponseData> => {
  const response = await axios.get("/search/photos", {
    params: {
      client_id: "gFVz3ix39gJEWLMdqQyTGpTMV_K1GLGK6zMC2-LWxWw",
      query: searchedImg,
      page: currentPage,
      per_page: 12,
    },
  });
  return response.data;
};
