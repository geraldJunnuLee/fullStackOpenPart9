"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const patients = patients_1.default;
const getNonSensitivePatients = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const getPatientById = (id) => {
    const patient = patients.find((patient) => patient.id === id);
    return patient;
};
const addPatient = (newPatientEntry) => {
    const newPatient = Object.assign(Object.assign({}, newPatientEntry), { id: (0, uuid_1.v4)() });
    patients.push(newPatient);
    return newPatient;
};
exports.default = { getPatientsWithoutSsn: getNonSensitivePatients, getPatientById, addPatient };
