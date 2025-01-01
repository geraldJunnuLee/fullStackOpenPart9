import { Autocomplete, Box, Button, ButtonGroup, TextField, Typography } from '@mui/material';
import React, { SyntheticEvent } from 'react';

import { Diagnosis, EntryWithoutId } from '../../types';

interface HospitalEntryFormProps {
  diagnoses: Diagnosis[];
  onSubmit: (values: EntryWithoutId) => void;
}

const HospitalEntryForm: React.FC<HospitalEntryFormProps> = ({ diagnoses, onSubmit }) => {
      const [description, setDescription] = React.useState<string>('');
      const [date, setDate] = React.useState<string>('');
      const [specialist, setSpecialist] = React.useState<string>('');
      const [dischargeDate, setDischargeDate] = React.useState<string>('');
      const [dischargeCriteria, setDischargeCriteria] = React.useState<string>('');
      const [diagnosisCodes, setDiagnosisCodes] = React.useState<string[] | []>([]);

      const handleDiagnosisCodes = (event: SyntheticEvent, newValue: string[] | null) => {
            event.preventDefault();
            if (newValue) {
              setDiagnosisCodes(newValue);
            }
      };

      const addHospitalEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({
          type: "Hospital",
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
          },
        });
      };
  return (
    <Box sx={{border: "1px dashed", margin: "20px 0px", padding: "10px"}}>
      <form onSubmit={addHospitalEntry} style={{ display: "flex", flexDirection: "column"}}>
        <Typography variant="h5">New hospital entry</Typography>
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
        <Box marginTop="10px" display="flex" flexDirection="column">
        <Typography>Discharge</Typography>
        <TextField sx={{ marginLeft: "10px" }} label="date" type="date" variant="standard" value={dischargeDate} onChange={({ target }) => setDischargeDate(target.value)}/>
        <TextField sx={{ marginLeft: "10px" }} label="criteria" variant="standard" value={dischargeCriteria} onChange={({ target }) => setDischargeCriteria(target.value)}/>

        </Box>
        <ButtonGroup sx={{ justifyContent: "space-between", margin: "20px"}}>  
          <Button variant="contained" sx={{ backgroundColor: "red"}}>Cancel</Button>
          <Button variant="contained" type="submit">Add</Button>
        </ButtonGroup>
      </form>
    </Box>
  );
};

export default HospitalEntryForm;