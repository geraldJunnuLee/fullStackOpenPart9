import { z } from "zod";

import { Gender, HealthCheckRating } from "./types";

const baseEntrySchema = z.object({
  id: z.string(),
  description: z.string().min(5, { message: 'Description must be at least 5 characters long' }),
  date: z.string().date(),
  specialist: z.string().min(5, { message: 'Specialist must be at least 5 characters long' }),
  diagnosisCodes: z.array(z.string()).optional()
});

const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating)
});

const dischargeSchema = z.object({
  date: z.string().date(),
  criteria: z.string().min(5, { message: 'Criteria must be at least 5 characters long' })
});

const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: dischargeSchema
});

const sickLeaveSchema = z.object({
  startDate: z.string(),
  endDate: z.string()
});

const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string().min(5, { message: 'Employer name must be at least 5 characters long' }),
  sickLeave: sickLeaveSchema.optional()
});

export const entrySchema = z.union([healthCheckEntrySchema, hospitalEntrySchema, occupationalHealthcareEntrySchema]);

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(entrySchema)
});

export const baseTypeSchema = z.object({
  type: z.literal('HealthCheck').or(z.literal('Hospital')).or(z.literal('OccupationalHealthcare'))
});

export const newHealthCheckEntrySchema = healthCheckEntrySchema.omit({ id: true });
export const newHospitalEntrySchema = hospitalEntrySchema.omit({ id: true });
export const newOccupationalHealthcareEntrySchema = occupationalHealthcareEntrySchema.omit({ id: true });

export const patientSchema = newPatientSchema.extend({
  id: z.string(),
});