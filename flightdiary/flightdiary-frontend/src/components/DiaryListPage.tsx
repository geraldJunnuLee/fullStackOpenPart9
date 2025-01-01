import React from 'react'
import { NonSensitiveDiaryEntry } from '../types';

interface DiaryListPageProps {
  diaries: NonSensitiveDiaryEntry[];
}

const DiaryListPage: React.FC<DiaryListPageProps> = ({ diaries }) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((diary, i) => (
        <div key={i}>
          <h5>{diary.date}</h5>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default DiaryListPage;