"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/:id', (req, res) => {
    const patient = patientService_1.default.getPatientById(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getPatientsWithoutSsn());
});
const newPatientParser = (req, _res, next) => {
    try {
        req.body = utils_1.newPatientSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};
router.post('/', newPatientParser, (req, res) => {
    const addedPatientEntry = patientService_1.default.addPatient(req.body);
    res.json(addedPatientEntry);
});
router.use(errorMiddleware);
exports.default = router;
