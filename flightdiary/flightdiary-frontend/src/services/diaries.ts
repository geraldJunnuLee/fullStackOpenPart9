import axios from "axios";

import { apiBaseUrl } from "../constants";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

const getAllDiaries = async () => {
  const { data } = await axios.get<NonSensitiveDiaryEntry[]>(
    `${apiBaseUrl}/diaries`
  );

  return data;
};

const createDiary = async (object: NewDiaryEntry) => {
  const { data } = await axios.post<NewDiaryEntry>(
    `${apiBaseUrl}/diaries`,
    object
  );

  return data;
};

export default {
  getAllDiaries, createDiary
};