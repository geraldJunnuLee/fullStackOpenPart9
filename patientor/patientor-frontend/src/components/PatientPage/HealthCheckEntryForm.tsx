import { Autocomplete, Box, Button, ButtonGroup, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { SyntheticEvent } from 'react';

import { Diagnosis, EntryWithoutId } from '../../types';

interface HealthCheckEntryFormProps {
  diagnoses: Diagnosis[];
  onSubmit: (values: EntryWithoutId) => void;
}

const HealthCheckEntryForm: React.FC<HealthCheckEntryFormProps> = ({ diagnoses, onSubmit }) => {
    const [description, setDescription] = React.useState<string>('');
    const [date, setDate] = React.useState<string>('');
    const [specialist, setSpecialist] = React.useState<string>('');
    const [healthCheckRating, setHealthCheckRating] = React.useState<number>(0);
    const [diagnosisCodes, setDiagnosisCodes] = React.useState<string[] | []>([]);

    const handleDiagnosisCodes = (event: SyntheticEvent, newValue: string[] | null) => {
      event.preventDefault();
      if (newValue) {
        setDiagnosisCodes(newValue);
      }
    };

    const addHealthCheckEntry = (event: SyntheticEvent) => {
      event.preventDefault();
      onSubmit({
        type: "HealthCheck",
        description,
        date,
        specialist,
        healthCheckRating: Number(healthCheckRating),
        diagnosisCodes
        });
    };

  return (
    <Box sx={{border: "1px dashed", margin: "20px 0px", padding: "10px"}}>
      <form onSubmit={addHealthCheckEntry} style={{ display: "flex", flexDirection: "column"}}>
        <Typography variant="h5">New healthcheck entry</Typography>
        <TextField label="Description" variant="standard" value={description} onChange={({ target }) => setDescription(target.value)}/>
        <TextField label="Date" type="date" variant="standard" value={date} onChange={({ target }) => setDate(target.value)}/>
        <TextField label="Specialist" variant="standard" value={specialist} onChange={({ target }) => setSpecialist(target.value)}/>
        <FormControl>
        <FormLabel>Healthcheck rating</FormLabel>
          <RadioGroup value={healthCheckRating} onChange={({ target }) => setHealthCheckRating(Number(target.value))} sx={{ display: "flex", flexDirection: "row"}}>
            <FormControlLabel value="0" control={<Radio />} label="0" />
            <FormControlLabel value="1" control={<Radio />} label="1" />
            <FormControlLabel value="2" control={<Radio />} label="2" />
            <FormControlLabel value="3" control={<Radio />} label="3" />
          </RadioGroup>
        </FormControl>
        <Autocomplete
          multiple
          id="diagnosisCodes"
          options={diagnoses.map((diagnose) => diagnose.code)}
          value={diagnosisCodes}
          onChange={handleDiagnosisCodes}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Diagnosis codes"
            />
          )}
        />
        <ButtonGroup sx={{ justifyContent: "space-between", margin: "20px"}}>  
          <Button variant="contained" sx={{ backgroundColor: "red"}}>Cancel</Button>
          <Button variant="contained" type="submit">Add</Button>
        </ButtonGroup>
      </form>
    </Box>
  );
};

export default HealthCheckEntryForm;