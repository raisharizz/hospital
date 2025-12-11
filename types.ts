// Enum for Agent Types reflecting the delegation logic
export enum AgentType {
  MAIN = 'Manage Hospital Operations',
  PATIENT = 'Patient Management Subagent',
  MEDICAL = 'Medical Records Subagent',
  STAFF = 'Staff Management Subagent',
  BILLING = 'Billing And Insurance Subagent',
}

// 1. AGENT_AUDIT_LOG
export interface AgentAuditLog {
  log_id: number;
  timestamp: string; // ISO string for TS
  request_origin: string;
  user_request_text: string;
  delegated_agent: string;
  transaction_id: string;
  delegation_status: 'Success' | 'Failure' | 'Pending';
}

// 2. PATIENT_REGISTRATION
export interface PatientRegistration {
  patient_id: string;
  nik: string;
  full_name: string;
  date_of_birth: string;
  contact_number: string;
  registration_date: string;
  appointment_timestamp: string;
  registration_type: 'Rawat Jalan' | 'Rawat Inap' | 'UGD';
}

// 3. RME_CLINICAL_DATA
export interface ClinicalData {
  record_detail_id: number;
  patient_id: string;
  encounter_id: string;
  encounter_date: string;
  diagnosis_icd_code: string;
  procedure_icd_code: string;
  clinical_notes_uri: string;
  recorded_by_staff_id: string;
  data_integrity_hash: string;
}

// 4. STAFF_MANAGEMENT
export interface Staff {
  staff_id: string;
  staff_name: string;
  role_or_position: string;
  department: string;
  assigned_shift_schedule: string;
  contact_info: string;
  is_active: boolean;
}

// 5. BILLING_FINANCE
export interface BillingFinance {
  billing_id: number;
  patient_id: string;
  encounter_id: string;
  service_date: string;
  total_charge: number;
  insurance_name: string;
  claim_status: 'Pending' | 'Approved' | 'Denied';
  payment_received_date: string | null;
  unit_cost_abc: number;
}
