import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { 
  AgentAuditLogTable, 
  PatientTable, 
  ClinicalTable, 
  StaffTable, 
  BillingTable 
} from './components/TableViews';
import { 
  MOCK_PATIENTS, 
  MOCK_CLINICAL, 
  MOCK_STAFF, 
  MOCK_BILLING, 
  MOCK_LOGS 
} from './constants';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            billingData={MOCK_BILLING} 
            patientData={MOCK_PATIENTS}
            logsData={MOCK_LOGS}
          />
        );
      case 'logs':
        return <AgentAuditLogTable data={MOCK_LOGS} />;
      case 'patients':
        return <PatientTable data={MOCK_PATIENTS} />;
      case 'clinical':
        return <ClinicalTable data={MOCK_CLINICAL} />;
      case 'staff':
        return <StaffTable data={MOCK_STAFF} />;
      case 'billing':
        return <BillingTable data={MOCK_BILLING} />;
      default:
        return <div>Select a module</div>;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}