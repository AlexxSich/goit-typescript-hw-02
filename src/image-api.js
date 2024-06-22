import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

export const getImages = async (searchedImg, currentPage) => {
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
