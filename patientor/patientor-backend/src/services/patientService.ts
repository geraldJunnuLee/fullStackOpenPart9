import { v4 as uuidv4 } from 'uuid';

import patientData from '../../data/patients';
import { Diagnosis, EntryWithoutId, NewPatient, NonSensitivePatient, Patient } from '../types';

const patients: Patient[] = patientData;

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

const addPatient = (newPatient: NewPatient): NonSensitivePatient => {
  const patient = {
    ...newPatient,
    entries: [],
    id: uuidv4(),
  };
  patients.push(patient);
  return patient;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const addEntry = (patientId: string, newPatientEntry: EntryWithoutId) => {
  const entry = {
    ...newPatientEntry,
    diagnosisCodes: parseDiagnosisCodes(newPatientEntry),
    id: uuidv4(),
  };
  const patient = patients.find((patient) => patient.id === patientId);
  if (patient) {
    const updatedPatient = {
      ...patient,
      entries: [...patient.entries, entry],
    };
    patients[patients.findIndex((patient) => patient.id === patientId)] = updatedPatient;
  }
  return entry;
};

export default { getNonSensitivePatients, getPatientById, addPatient, addEntry };