import { useEffect, useState } from "react";
import axios from "axios";

import AddDiaryForm from "./components/AddDiaryForm";
import DiaryListPage from "./components/DiaryListPage";
import diaryService from "./services/diaries";
import { Diary, NewDiaryEntry, NonSensitiveDiaryEntry } from "./types";

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchDiaryList = async () => {
      const diaries = await diaryService.getAllDiaries();
      setDiaries(diaries);
    };
    void fetchDiaryList();
  }, []);

   const submitNewDiary = async (values: NewDiaryEntry) => {
      try {
        const diary = await diaryService.createDiary(values) as Diary;
        setDiaries(diaries.concat(diary));
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data.replace('Something went wrong. Error: ', '');
            console.error(message);
            setError(message);
          } else {
            setError("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    }
  
  return (
    <div>
      <AddDiaryForm onSubmit={submitNewDiary} error={error}/>
      <DiaryListPage diaries={diaries} />
    </div>
  )
}

export default App
