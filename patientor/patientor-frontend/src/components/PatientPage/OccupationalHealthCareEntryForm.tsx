import { Autocomplete, Box, Button, ButtonGroup, TextField, Typography } from '@mui/material';
import React, { SyntheticEvent } from 'react';

import { Diagnosis, EntryWithoutId } from '../../types';

interface OccupationalHealthCareEntryFormProps {
  diagnoses: Diagnosis[];
  onSubmit: (values: EntryWithoutId) => void;
}

const OccupationalHealthCareEntryForm: React.FC<OccupationalHealthCareEntryFormProps> = ({ diagnoses, onSubmit}) => {
      const [description, setDescription] = React.useState<string>('');
      const [date, setDate] = React.useState<string>('');
      const [specialist, setSpecialist] = React.useState<string>('');
      const [employerName, setEmployerName] = React.useState<string>('');
      const [sickLeaveStartDate, setSickLeaveStartDate] = React.useState<string>("");
      const [sickLeaveEndDate, setSickLeaveEndDate] = React.useState<string>("");
      const [diagnosisCodes, setDiagnosisCodes] = React.useState<string[] | []>([]);

      const handleDiagnosisCodes = (event: SyntheticEvent, newValue: string[] | null) => {
        event.preventDefault();
        if (newValue) {
          setDiagnosisCodes(newValue);
        }
      };

      const addOccupationalHealthCareEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        const sickLeave = sickLeaveStartDate && sickLeaveEndDate ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate } : undefined;
        onSubmit({
          type: "OccupationalHealthcare",
          description,
          date,
          specialist,
          employerName,
          diagnosisCodes,
          sickLeave
        });
      };
  return (
    <Box sx={{border: "1px dashed", margin: "20px 0px", padding: "10px"}}>
      <form onSubmit={addOccupationalHealthCareEntry} style={{ display: "flex", flexDirection: "column"}}>
        <Typography variant="h5">New occupational healthcare entry</Typography>
        <TextField label="Description" variant="standard" value={description} onChange={({ target }) => setDescription(target.value)}/>
        <TextField label="Date" type="date" variant="standard" value={date} onChange={({ target }) => setDate(target.value)}/>
        <TextField label="Specialist" variant="standard" value={specialist} onChange={({ target }) => setSpecialist(target.value)}/>
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
        <TextField label="Employer name" variant="standard" value={employerName} onChange={({ target }) => setEmployerName(target.value)}/>
        <Box marginTop="10px" display="flex" flexDirection="column">
          <Typography>Sickleave</Typography>
          <TextField sx={{ marginLeft: "10px" }} type="date" label="Start" variant="standard" value={sickLeaveStartDate} onChange={({ target }) => setSickLeaveStartDate(target.value)}/>
          <TextField sx={{ marginLeft: "10px" }} type="date" label="End" variant="standard" value={sickLeaveEndDate} onChange={({ target }) => setSickLeaveEndDate(target.value)}/>
        </Box>
        <ButtonGroup sx={{ justifyContent: "space-between", margin: "20px"}}>  
          <Button variant="contained" sx={{ backgroundColor: "red"}}>Cancel</Button>
          <Button variant="contained" type="submit">Add</Button>
        </ButtonGroup>
      </form>
    </Box>
  );
};

export default OccupationalHealthCareEntryForm;