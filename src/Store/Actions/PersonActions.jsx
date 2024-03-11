export { removePerson } from "../Reducers/PeopleSlice";
import axios from "../../Utils/Axios";
import { loadPerson } from "../Reducers/PeopleSlice";

export const asyncloadperson = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);

    let theUltimateDetails = {
      detail: detail.data,
      externalId: externalid.data,
      combinedCredits: combinedCredits.data,
      tvCredits: tvCredits.data,
      movieCredits: movieCredits.data,
    };
    dispatch(loadPerson(theUltimateDetails));
  } catch (error) {
    console.log("Error:", error);
  }
};
