import { Favorite, LocalHospital, MedicalServices, Work } from '@mui/icons-material/';
import { Box, List, ListItem } from '@mui/material';
import React from 'react';

import { Diagnosis, Entry, HealthCheckRating } from '../../types';

interface EntryDetailsProps {
  diagnoses: Diagnosis[];
  entry: Entry;
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ diagnoses, entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const getHealthCheckIconColor = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.CriticalRisk:
        return "red";
      case HealthCheckRating.HighRisk:
        return "orange";
      case HealthCheckRating.LowRisk:
        return "yellow";
      case HealthCheckRating.Healthy:
        return "green";
      default:
        return assertNever(rating);
    }
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <Box>
          <Box sx={{ border: "1px solid", borderColor: "gray.300", margin: "10px 0px", padding: "10px"}}>
            <Box>{entry.date} <LocalHospital /></Box>
            <Box>{entry.description}</Box>
            <Box>diagnose by {entry.specialist}</Box>
            <Box>discharge: {entry.discharge.date} {entry.discharge.criteria}</Box>
            <List sx={{ listStyleType: 'disc', marginLeft: "20px" }}>
              {entry.diagnosisCodes && entry.diagnosisCodes.map(code => {
                const diagnosis = diagnoses.find(d => d.code === code);
                return <ListItem key={code} sx={{ display: "list-item"}}>{diagnosis?.code} {diagnosis?.name}</ListItem>;
                }
              )}
            </List>
          </Box>
        </Box>
      );
    case "HealthCheck":
      const healthCheckIconColor = getHealthCheckIconColor(entry.healthCheckRating);
      return (
        <Box sx={{ border: "1px solid", borderColor: "gray.300", margin: "10px 0px", padding: "10px"}}>
          <Box>{entry.date} <MedicalServices /></Box>
          <Box>{entry.description}</Box>
          <Favorite sx={{ color: `${healthCheckIconColor}` }} />
          <Box>diagnose by {entry.specialist}</Box>
          <List sx={{ listStyleType: 'disc', marginLeft: "20px" }}>
            {entry.diagnosisCodes && entry.diagnosisCodes.map(code => {
                const diagnosis = diagnoses.find(d => d.code === code);
                return <ListItem key={code} sx={{ display: "list-item"}}>{diagnosis?.code} {diagnosis?.name}</ListItem>;
                }
              )}
          </List>
        </Box>
      );
    case "OccupationalHealthcare":
      return (
        <Box sx={{ border: "1px solid", borderColor: "gray.300", margin: "10px 0px", padding: "10px"}}>
          <Box>{entry.date} <Work /> {entry.employerName}</Box>
          <Box>{entry.description}</Box>
          <Box>diagnose by {entry.specialist}</Box>
          {entry.sickLeave && (
            <Box>sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</Box>
          )}
          <List sx={{ listStyleType: 'disc', marginLeft: "20px" }}>
          {entry.diagnosisCodes && entry.diagnosisCodes.map(code => {
              const diagnosis = diagnoses.find(d => d.code === code);
              return <ListItem key={code} sx={{ display: "list-item"}}>{diagnosis?.code} {diagnosis?.name}</ListItem>;
              }
            )}
          </List>
        </Box>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;