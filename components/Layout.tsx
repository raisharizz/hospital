import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  CreditCard, 
  ShieldCheck, 
  Activity,
  UserCog
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'logs', label: 'Agent Audit Logs', icon: ShieldCheck },
    { id: 'patients', label: 'Patient Registration', icon: Users },
    { id: 'clinical', label: 'RME Clinical Data', icon: Stethoscope },
    { id: 'staff', label: 'Staff Management', icon: UserCog },
    { id: 'billing', label: 'Billing & Finance', icon: CreditCard },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-xl z-20">
        <div className="p-6 border-b border-slate-700 flex items-center gap-3">
          <Activity className="h-8 w-8 text-teal-400" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">MedSynergy AIS</h1>
            <p className="text-xs text-slate-400 font-mono">Vertex AI Powered</p>
          </div>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 
                  ${isActive 
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/20' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700 bg-slate-800/50">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            BigQuery Connector: Active
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Vertex Agents: Online
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-700">
            {menuItems.find(m => m.id === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-4">
             <div className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
               Environment: Google Cloud
             </div>
             <div className="h-8 w-8 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-slate-600 font-bold text-xs">
               PF
             </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};