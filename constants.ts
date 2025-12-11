import { AgentAuditLog, PatientRegistration, ClinicalData, Staff, BillingFinance, AgentType } from './types';

export const MOCK_PATIENTS: PatientRegistration[] = [
  { patient_id: 'P001', nik: '3201010101010001', full_name: 'Budi Santoso', date_of_birth: '1980-05-12', contact_number: '081234567890', registration_date: '2023-10-01', appointment_timestamp: '2023-10-27T09:00:00Z', registration_type: 'Rawat Jalan' },
  { patient_id: 'P002', nik: '3201010101010002', full_name: 'Siti Aminah', date_of_birth: '1992-11-20', contact_number: '081298765432', registration_date: '2023-10-05', appointment_timestamp: '2023-10-27T10:30:00Z', registration_type: 'Rawat Inap' },
  { patient_id: 'P003', nik: '3201010101010003', full_name: 'Ahmad Yani', date_of_birth: '1975-03-15', contact_number: '081345678901', registration_date: '2023-10-12', appointment_timestamp: '2023-10-28T08:00:00Z', registration_type: 'UGD' },
  { patient_id: 'P004', nik: '3201010101010004', full_name: 'Dewi Lestari', date_of_birth: '1988-07-07', contact_number: '081456789012', registration_date: '2023-10-20', appointment_timestamp: '2023-10-28T11:00:00Z', registration_type: 'Rawat Jalan' },
  { patient_id: 'P005', nik: '3201010101010005', full_name: 'Eko Prasetyo', date_of_birth: '1960-01-01', contact_number: '081567890123', registration_date: '2023-10-25', appointment_timestamp: '2023-10-29T14:00:00Z', registration_type: 'Rawat Inap' },
];

export const MOCK_STAFF: Staff[] = [
  { staff_id: 'S001', staff_name: 'Dr. Rina Melati', role_or_position: 'Dokter Spesialis Penyakit Dalam', department: 'Internal Medicine', assigned_shift_schedule: '08:00 - 16:00', contact_info: 'rina.melati@hospital.id', is_active: true },
  { staff_id: 'S002', staff_name: 'Ns. Joko Anwar', role_or_position: 'Kepala Perawat', department: 'Inpatient Ward', assigned_shift_schedule: '07:00 - 15:00', contact_info: 'joko.anwar@hospital.id', is_active: true },
  { staff_id: 'S003', staff_name: 'Bpk. Heri Finansyah', role_or_position: 'Billing Manager', department: 'Finance', assigned_shift_schedule: '09:00 - 17:00', contact_info: 'heri.fin@hospital.id', is_active: true },
];

export const MOCK_CLINICAL: ClinicalData[] = [
  { record_detail_id: 101, patient_id: 'P001', encounter_id: 'E-2023-001', encounter_date: '2023-10-27T09:15:00Z', diagnosis_icd_code: 'E11.9', procedure_icd_code: '89.7', clinical_notes_uri: 'gs://fhir-store/notes/E-2023-001.json', recorded_by_staff_id: 'S001', data_integrity_hash: 'a1b2c3d4' },
  { record_detail_id: 102, patient_id: 'P002', encounter_id: 'E-2023-002', encounter_date: '2023-10-27T11:00:00Z', diagnosis_icd_code: 'J18.9', procedure_icd_code: '93.96', clinical_notes_uri: 'gs://fhir-store/notes/E-2023-002.json', recorded_by_staff_id: 'S001', data_integrity_hash: 'e5f6g7h8' },
  { record_detail_id: 103, patient_id: 'P003', encounter_id: 'E-2023-003', encounter_date: '2023-10-28T08:10:00Z', diagnosis_icd_code: 'I10', procedure_icd_code: '89.52', clinical_notes_uri: 'gs://fhir-store/notes/E-2023-003.json', recorded_by_staff_id: 'S001', data_integrity_hash: 'i9j0k1l2' },
];

export const MOCK_BILLING: BillingFinance[] = [
  { billing_id: 5001, patient_id: 'P001', encounter_id: 'E-2023-001', service_date: '2023-10-27', total_charge: 750000.00, insurance_name: 'BPJS Kesehatan', claim_status: 'Approved', payment_received_date: '2023-10-30', unit_cost_abc: 680000.00 },
  { billing_id: 5002, patient_id: 'P002', encounter_id: 'E-2023-002', service_date: '2023-10-27', total_charge: 5400000.00, insurance_name: 'Prudential', claim_status: 'Pending', payment_received_date: null, unit_cost_abc: 4900000.00 },
  { billing_id: 5003, patient_id: 'P003', encounter_id: 'E-2023-003', service_date: '2023-10-28', total_charge: 120000.00, insurance_name: 'Self Pay', claim_status: 'Approved', payment_received_date: '2023-10-28', unit_cost_abc: 90000.00 },
];

export const MOCK_LOGS: AgentAuditLog[] = [
  { log_id: 1001, timestamp: '2023-10-27T08:00:05Z', request_origin: 'System Trigger', user_request_text: 'Daily Sync Patient Data', delegated_agent: AgentType.PATIENT, transaction_id: 'SYS-001', delegation_status: 'Success' },
  { log_id: 1002, timestamp: '2023-10-27T09:15:30Z', request_origin: 'Klinisi (Dr. Rina)', user_request_text: 'Update diagnosis for P001', delegated_agent: AgentType.MEDICAL, transaction_id: 'E-2023-001', delegation_status: 'Success' },
  { log_id: 1003, timestamp: '2023-10-27T09:45:00Z', request_origin: 'System Auto-Bill', user_request_text: 'Generate Invoice for E-2023-001', delegated_agent: AgentType.BILLING, transaction_id: '5001', delegation_status: 'Success' },
  { log_id: 1004, timestamp: '2023-10-27T12:00:00Z', request_origin: 'Admin HR', user_request_text: 'Verify shift attendance', delegated_agent: AgentType.STAFF, transaction_id: 'SHIFT-88', delegation_status: 'Failure' },
];
