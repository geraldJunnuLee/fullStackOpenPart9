import React, { ChangeEvent, SyntheticEvent } from 'react';

import { NewDiaryEntry, Visibility, Weather } from '../types';

interface AddDiaryFormProps {
  onSubmit: (values: NewDiaryEntry) => void;
  error?: string;
}

interface VisibilityOption {
  value: Visibility;
  label: string;
}

interface weatherOption {
  value: Weather;
  label: string;
}

const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(v => ({
  value: v, label: v.toString()
}));

const weatherOptions: weatherOption[] = Object.values(Weather).map(w => ({
  value: w, label: w.toString()
}))

const AddDiaryForm: React.FC<AddDiaryFormProps> = ({ onSubmit, error }) => {
  const [date, setDate] = React.useState('');
  const [visibility, setVisibility] = React.useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = React.useState<Weather>(Weather.Sunny);
  const [comment, setComment] = React.useState('');

  const addDiary = async (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({ date, visibility, weather, comment });
  }

  const handleVisibilityChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const visibility = Object.values(Visibility).find(v => v.toString() === value);
      if (visibility) {
        setVisibility(visibility);
      }
    }
  }

  const handleWeatherChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const weather = Object.values(Weather).find(w => w.toString() === value);
      if (weather) {
        setWeather(event.target.value as Weather);
      }
    }
  }

  return (
    <div>
        <h2>Add new entry</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={addDiary}>
          <div>
            <label>date</label>
            <input type="date" onChange={({ target }) => setDate(target.value)}/>
          </div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
          <p style={{  marginRight: "10px"}}>visibility</p>
            {visibilityOptions.map(option => (
              <div key={option.label}>
              <label htmlFor={option.label}>{option.label}</label>
              <input type="radio" id={option.label} value={option.value} onChange={handleVisibilityChange} checked={visibility === option.value}/>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
            <p style={{  marginRight: "10px"}}>weather</p>
            {weatherOptions.map(option => (
              <div key={option.label}>
              <label htmlFor={option.label}>{option.label}</label>
              <input type="radio" id={option.label} value={option.value} onChange={handleWeatherChange} checked={weather === option.value}/>
              </div>
            ))}
          </div>
          <div>
            <label>comment</label>
            <input onChange={({ target }) => setComment(target.value)}/>
          </div>
          <button type="submit">add</button>
        </form>
      </div>
  );
};

export default AddDiaryForm;