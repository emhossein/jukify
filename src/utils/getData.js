import axios from "axios";

export const getTTH = async (apiKey) => {
  const response = await axios.get(
    `https://one-api.ir/spotify/?token=${apiKey}&action=playlists&id=37i9dQZF1DXcBWIGoYBM5M`
  );
  console.log("fetched TTH");
  return response.data;
};
