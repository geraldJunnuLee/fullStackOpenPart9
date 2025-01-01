import express, { NextFunction, Response, Request } from 'express';
import { z } from 'zod';

import patientService from '../services/patientService';
import { Entry, EntryWithoutId, NewPatient, NonSensitivePatient, Patient } from '../types';
import { newPatientSchema, baseTypeSchema, newHealthCheckEntrySchema, newHospitalEntrySchema, newOccupationalHealthcareEntrySchema } from '../utils';

const router = express.Router();

router.get('/:id', (req: Request, res: Response<Patient>) => {
  const patient = patientService.getPatientById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.body = newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const baseTypeValidation = baseTypeSchema.parse(req.body);
    if (baseTypeValidation.type === 'HealthCheck') {;
      req.body = newHealthCheckEntrySchema.parse(req.body);
    } else if (baseTypeValidation.type === 'Hospital') {
      req.body = newHospitalEntrySchema.parse(req.body);
    } else if (baseTypeValidation.type === 'OccupationalHealthcare') {
      req.body = newOccupationalHealthcareEntrySchema.parse(req.body);
    }
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post("/:id/entries", newEntryParser, (req: Request<{id: string},unknown, EntryWithoutId>, res: Response<Entry>) => {
  if (req.params && req.params.id) {
    const userId = req.params.id;
    const addedEntry = patientService.addEntry(userId, req.body);
    res.json(addedEntry);
  }
});

router.post('/', newPatientParser, (req :Request<unknown, unknown, NewPatient>, res: Response<NonSensitivePatient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
});


router.use(errorMiddleware);

export default router;