import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { AgentAuditLog, BillingFinance, PatientRegistration } from '../types';
import { DollarSign, Activity, AlertTriangle, CheckSquare } from 'lucide-react';

interface DashboardProps {
  billingData: BillingFinance[];
  patientData: PatientRegistration[];
  logsData: AgentAuditLog[];
}

const StatCard: React.FC<{ title: string; value: string; subtext?: string; icon: React.ReactNode; colorClass: string }> = ({ title, value, subtext, icon, colorClass }) => (
  <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      {subtext && <p className={`text-xs mt-2 font-medium ${colorClass}`}>{subtext}</p>}
    </div>
    <div className={`p-3 rounded-lg ${colorClass.replace('text-', 'bg-').replace('600', '100').replace('500', '100')} ${colorClass}`}>
      {icon}
    </div>
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ billingData, patientData, logsData }) => {
  // Calculations
  const totalRevenue = billingData.reduce((acc, curr) => acc + curr.total_charge, 0);
  const totalCost = billingData.reduce((acc, curr) => acc + curr.unit_cost_abc, 0);
  const profitMargin = ((totalRevenue - totalCost) / totalRevenue) * 100;
  const pendingClaims = billingData.filter(b => b.claim_status === 'Pending').length;
  const auditFailures = logsData.filter(l => l.delegation_status === 'Failure').length;

  const formatIDR = (val: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumSignificantDigits: 3 }).format(val);

  // Chart Data Prep
  const insuranceData = [
    { name: 'BPJS', value: billingData.filter(b => b.insurance_name.includes('BPJS')).length },
    { name: 'Private', value: billingData.filter(b => !b.insurance_name.includes('BPJS') && b.insurance_name !== 'Self Pay').length },
    { name: 'Self Pay', value: billingData.filter(b => b.insurance_name === 'Self Pay').length },
  ];

  const COLORS = ['#0d9488', '#6366f1', '#f43f5e'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={formatIDR(totalRevenue)} 
          subtext={`+${profitMargin.toFixed(1)}% Gross Margin`} 
          icon={<DollarSign size={24} />} 
          colorClass="text-emerald-600" 
        />
        <StatCard 
          title="Active Patients" 
          value={patientData.length.toString()} 
          subtext="Registered this month" 
          icon={<Activity size={24} />} 
          colorClass="text-blue-600" 
        />
        <StatCard 
          title="Pending Claims" 
          value={pendingClaims.toString()} 
          subtext="Requires Audit" 
          icon={<CheckSquare size={24} />} 
          colorClass="text-amber-600" 
        />
        <StatCard 
          title="Audit Alerts" 
          value={auditFailures.toString()} 
          subtext="Agent Delegation Failures" 
          icon={<AlertTriangle size={24} />} 
          colorClass="text-rose-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Financial Performance (Revenue vs Cost)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={billingData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="billing_id" tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip 
                  formatter={(value: number) => formatIDR(value)}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Bar name="Revenue" dataKey="total_charge" fill="#0d9488" radius={[4, 4, 0, 0]} />
                <Bar name="ABC Cost" dataKey="unit_cost_abc" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insurance Dist */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Payer Mix</h3>
          <div className="h-64 flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={insuranceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {insuranceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-xs font-medium text-slate-600 mt-2">
            {insuranceData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }}></span>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent AI Activity */}
      <div className="bg-slate-900 text-slate-200 rounded-xl p-6 shadow-md border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Activity className="text-teal-400 animate-pulse" size={20} />
            Live Agent Activity
          </h3>
          <span className="text-xs bg-slate-800 px-2 py-1 rounded border border-slate-700">Real-time Stream</span>
        </div>
        <div className="space-y-3">
          {logsData.slice(0, 3).map((log) => (
            <div key={log.log_id} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div className="w-16 text-xs text-slate-400 font-mono text-right">
                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="w-2 h-2 rounded-full bg-teal-500"></div>
              <div className="flex-1 text-sm">
                <span className="text-teal-300 font-medium">[{log.delegated_agent}]</span> processing <span className="text-white">"{log.user_request_text}"</span>
              </div>
              <div className="text-xs px-2 py-0.5 rounded bg-green-900/30 text-green-400 border border-green-800">
                {log.delegation_status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};