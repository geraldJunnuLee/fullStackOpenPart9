import { Female, Male, QuestionMark } from '@mui/icons-material/';
import { Box, Skeleton, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import patientService from '../../services/patients';
import { Diagnosis, EntryWithoutId, Gender, Patient } from '../../types';
import EntryDetails from './EntryDetails';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import HospitalEntryForm from './HospitalEntryForm';
import OccupationalHealthCareEntryForm from './OccupationalHealthCareEntryForm';

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

const PatientPage: React.FC<PatientPageProps> = ({ diagnoses }) => {
  const [patient, setPatient] = React.useState<Patient>();
  const [error, setError] = React.useState<string>();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      if (!id) return;
      const response = await patientService.getOne(id);
      setPatient(response);
    };
      void fetchPatientDetails();
  }, [id]);

  const submitNewEntry = async (values: EntryWithoutId) => {
    if (!id) return;
      try {
        const patientEntry = await patientService.createPatientEntry(id, values);
        if (patient) {
          setPatient({
            ...patient,
            entries: [...patient.entries, patientEntry]
          });
        }
        if (error) setError(undefined);
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          if (error?.response?.data && typeof error?.response?.data === "string") {
            const message = error.response.data.replace('Something went wrong. Error: ', '');
            console.error(message);
            setError(message);
          } else if (error?.response?.data?.error && Array.isArray(error?.response?.data?.error)) {
            if (error.response.data.error[0].received) {
              const message = `Value of ${error.response.data.error[0].path[0]} incorrect: ${error.response.data.error[0].received}`;
              console.error(message);
              setError(message);
            } else {
              const message = `Value of ${error.response.data.error[0].path[0]} incorrect: ${error.response.data.error[0].message}`;
              console.error(message);
              setError(message);
            }
          } else {
            setError("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", error);
          setError("Unknown error");
        }
      }
  };
  
  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <Male />;
      case Gender.Female:
        return <Female />;
      default:
        return <QuestionMark />;
    }
  };

  const patientGenderIcon = patient && getGenderIcon(patient?.gender);

  if (!patient) return <Skeleton variant="rectangular" width={500} height={150} />;

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Typography variant="h4" marginRight="10px">{patient?.name}</Typography>
        {patientGenderIcon}
      </Box>
      <Typography marginRight="5px">ssh: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      {error && <Typography sx={{ color: "red"}}>{error}</Typography>}
      <HealthCheckEntryForm  diagnoses={diagnoses} onSubmit={submitNewEntry} />
      <HospitalEntryForm diagnoses={diagnoses} onSubmit={submitNewEntry }/>
      <OccupationalHealthCareEntryForm diagnoses={diagnoses} onSubmit={submitNewEntry}/>
      <Typography variant='h5'>entries</Typography>
      {patient.entries.map((entry, index) => (
        <EntryDetails key={index} diagnoses={diagnoses} entry={entry} />
      ))}
    </Box>
  );
};

export default PatientPage;