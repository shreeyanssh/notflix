export { removeTv } from "../Reducers/TvSlice";
import axios from "../../Utils/Axios";
import { loadTv } from "../Reducers/TvSlice";

export const asyncloadtv = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const translations = await axios.get(`/tv/${id}/translations`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
    let theUltimateDetails = {
      detail: detail.data,
      externalId: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map(t=>t.english_name),
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchProviders: watchproviders.data.results.IN,
    };
    dispatch(loadTv(theUltimateDetails));
  } catch (error) {
    console.log("Error:", error);
  }
};
