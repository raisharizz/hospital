import React from 'react';
import { AgentAuditLog, PatientRegistration, ClinicalData, Staff, BillingFinance } from '../types';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

// --- Shared Table Components ---
const TableWrapper: React.FC<{ title: string; subtitle: string; children: React.ReactNode }> = ({ title, subtitle, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-600">
        {children}
      </table>
    </div>
  </div>
);

const Th: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <th className={`px-6 py-3 font-medium text-slate-500 uppercase tracking-wider text-xs bg-slate-50 border-b border-slate-100 whitespace-nowrap ${className || ''}`}>{children}</th>
);

const Td: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <td className={`px-6 py-4 border-b border-slate-100 whitespace-nowrap ${className || ''}`}>{children}</td>
);

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const styles: Record<string, string> = {
    Success: 'bg-green-50 text-green-700 border-green-200',
    Approved: 'bg-green-50 text-green-700 border-green-200',
    Failure: 'bg-red-50 text-red-700 border-red-200',
    Denied: 'bg-red-50 text-red-700 border-red-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    'Rawat Inap': 'bg-purple-50 text-purple-700 border-purple-200',
    'Rawat Jalan': 'bg-blue-50 text-blue-700 border-blue-200',
    UGD: 'bg-rose-50 text-rose-700 border-rose-200',
  };
  
  const defaultStyle = 'bg-slate-50 text-slate-700 border-slate-200';
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status] || defaultStyle}`}>
      {status}
    </span>
  );
};

// --- Specific Table Views ---

export const AgentAuditLogTable: React.FC<{ data: AgentAuditLog[] }> = ({ data }) => (
  <TableWrapper title="AGENT_AUDIT_LOG" subtitle="Internal Control & Delegation Trail">
    <thead>
      <tr>
        <Th>Log ID</Th>
        <Th>Timestamp</Th>
        <Th>Origin</Th>
        <Th>Request</Th>
        <Th>Delegated To</Th>
        <Th>Ref ID</Th>
        <Th>Status</Th>
      </tr>
    </thead>
    <tbody>
      {data.map((row) => (
        <tr key={row.log_id} className="hover:bg-slate-50">
          <Td className="font-mono text-slate-400">#{row.log_id}</Td>
          <Td>{new Date(row.timestamp).toLocaleString()}</Td>
          <Td>{row.request_origin}</Td>
          <Td className="max-w-xs truncate text-slate-800 font-medium">{row.user_request_text}</Td>
          <Td>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              {row.delegated_agent}
            </span>
          </Td>
          <Td className="font-mono">{row.transaction_id}</Td>
          <Td><StatusBadge status={row.delegation_status} /></Td>
        </tr>
      ))}
    </tbody>
  </TableWrapper>
);

export const PatientTable: React.FC<{ data: PatientRegistration[] }> = ({ data }) => (
  <TableWrapper title="PATIENT_REGISTRATION" subtitle="Administrative Front-Office Data">
    <thead>
      <tr>
        <Th>Patient ID</Th>
        <Th>NIK</Th>
        <Th>Full Name</Th>
        <Th>DOB</Th>
        <Th>Contact</Th>
        <Th>Reg. Date</Th>
        <Th>Type</Th>
      </tr>
    </thead>
    <tbody>
      {data.map((row) => (
        <tr key={row.patient_id} className="hover:bg-slate-50">
          <Td className="font-bold text-slate-700">{row.patient_id}</Td>
          <Td className="font-mono text-xs">{row.nik}</Td>
          <Td>{row.full_name}</Td>
          <Td>{row.date_of_birth}</Td>
          <Td>{row.contact_number}</Td>
          <Td>{row.registration_date}</Td>
          <Td><StatusBadge status={row.registration_type} /></Td>
        </tr>
      ))}
    </tbody>
  </TableWrapper>
);

export const ClinicalTable: React.FC<{ data: ClinicalData[] }> = ({ data }) => (
  <TableWrapper title="RME_CLINICAL_DATA" subtitle="Medical Records & Diagnosis (ICD)">
    <thead>
      <tr>
        <Th>Record ID</Th>
        <Th>Patient ID</Th>
        <Th>Encounter</Th>
        <Th>Date</Th>
        <Th>Diagnosis (ICD)</Th>
        <Th>Procedure (ICD)</Th>
        <Th>FHIR Store URI</Th>
        <Th>Integrity Hash</Th>
      </tr>
    </thead>
    <tbody>
      {data.map((row) => (
        <tr key={row.record_detail_id} className="hover:bg-slate-50">
          <Td>{row.record_detail_id}</Td>
          <Td className="font-medium">{row.patient_id}</Td>
          <Td>{row.encounter_id}</Td>
          <Td>{new Date(row.encounter_date).toLocaleDateString()}</Td>
          <Td><span className="bg-slate-100 px-2 py-1 rounded font-mono text-xs">{row.diagnosis_icd_code}</span></Td>
          <Td><span className="bg-slate-100 px-2 py-1 rounded font-mono text-xs">{row.procedure_icd_code || '-'}</span></Td>
          <Td className="text-blue-600 truncate max-w-[150px] text-xs underline cursor-pointer">{row.clinical_notes_uri}</Td>
          <Td className="font-mono text-xs text-slate-400">{row.data_integrity_hash}</Td>
        </tr>
      ))}
    </tbody>
  </TableWrapper>
);

export const StaffTable: React.FC<{ data: Staff[] }> = ({ data }) => (
  <TableWrapper title="STAFF_MANAGEMENT" subtitle="HR & Segregation of Duties">
    <thead>
      <tr>
        <Th>Staff ID</Th>
        <Th>Name</Th>
        <Th>Role</Th>
        <Th>Department</Th>
        <Th>Shift</Th>
        <Th>Status</Th>
      </tr>
    </thead>
    <tbody>
      {data.map((row) => (
        <tr key={row.staff_id} className="hover:bg-slate-50">
          <Td className="font-medium">{row.staff_id}</Td>
          <Td>{row.staff_name}</Td>
          <Td>{row.role_or_position}</Td>
          <Td>{row.department}</Td>
          <Td>{row.assigned_shift_schedule}</Td>
          <Td>
            <span className={`flex items-center gap-1 ${row.is_active ? 'text-green-600' : 'text-slate-400'}`}>
               {row.is_active ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
               {row.is_active ? 'Active' : 'Inactive'}
            </span>
          </Td>
        </tr>
      ))}
    </tbody>
  </TableWrapper>
);

export const BillingTable: React.FC<{ data: BillingFinance[] }> = ({ data }) => {
  const formatCurrency = (val: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(val);

  return (
    <TableWrapper title="BILLING_FINANCE" subtitle="Financial Accountability & ABC Costing">
      <thead>
        <tr>
          <Th>Bill ID</Th>
          <Th>Patient</Th>
          <Th>Encounter</Th>
          <Th>Insurance</Th>
          <Th className="text-right">Total Charge</Th>
          <Th className="text-right">Unit Cost (ABC)</Th>
          <Th className="text-right">Margin</Th>
          <Th>Status</Th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          const margin = row.total_charge - row.unit_cost_abc;
          return (
            <tr key={row.billing_id} className="hover:bg-slate-50">
              <Td className="font-mono">{row.billing_id}</Td>
              <Td>{row.patient_id}</Td>
              <Td className="text-xs">{row.encounter_id}</Td>
              <Td>{row.insurance_name}</Td>
              <Td className="text-right font-medium">{formatCurrency(row.total_charge)}</Td>
              <Td className="text-right text-slate-500">{formatCurrency(row.unit_cost_abc)}</Td>
              <Td className={`text-right font-bold ${margin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(margin)}
              </Td>
              <Td><StatusBadge status={row.claim_status} /></Td>
            </tr>
          );
        })}
      </tbody>
    </TableWrapper>
  );
};