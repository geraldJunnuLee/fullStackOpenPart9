import axios from "axios";
import { Entry, EntryWithoutId, Patient, PatientFormValues, PatientWithoutSsn } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<PatientWithoutSsn[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const createPatient = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createPatientEntry = async (id: string, object: EntryWithoutId) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
};

export default {
  getAll, getOne, create: createPatient, createPatientEntry
};

