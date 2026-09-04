import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  Users,
  Building2,
  Activity,
  Search,
  ShieldCheck,
  FolderGit2
} from 'lucide-react';

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'FACULTY' | 'HOD' | 'ADMIN';
  institution: string;
  status: 'ACTIVE' | 'SUSPENDED';
  joinedAt: string;
}

const SAMPLE_USERS: ManagedUser[] = [
  { id: 'usr-1', name: 'Aarav Sharma', email: 'aarav.sharma@gehu.ac.in', role: 'STUDENT', institution: 'Graphic Era Hill University', status: 'ACTIVE', joinedAt: '2024-08-15' },
  { id: 'usr-2', name: 'Dr. Anil Sharma', email: 'anil.sharma@gehu.ac.in', role: 'FACULTY', institution: 'Graphic Era Hill University', status: 'ACTIVE', joinedAt: '2022-06-10' },
  { id: 'usr-3', name: 'Dr. Rajesh Kumar', email: 'rajesh.kumar@gehu.ac.in', role: 'HOD', institution: 'Graphic Era Hill University', status: 'ACTIVE', joinedAt: '2020-01-20' },
  { id: 'usr-4', name: 'Priya Patel', email: 'priya.patel@iitb.ac.in', role: 'STUDENT', institution: 'IIT Bombay', status: 'ACTIVE', joinedAt: '2024-09-01' },
  { id: 'usr-5', name: 'Dr. Ramesh Sundaram', email: 'r.sundaram@iitd.ac.in', role: 'FACULTY', institution: 'IIT Delhi', status: 'ACTIVE', joinedAt: '2021-03-12' },
  { id: 'usr-6', name: 'Rohan Mehra', email: 'rohan.mehra@bits-pilani.ac.in', role: 'STUDENT', institution: 'BITS Pilani', status: 'ACTIVE', joinedAt: '2023-08-20' }
];

export const AdminManagementDashboard: React.FC = () => {
  const [userSearch, setUserSearch] = useState('');
  const [users, setUsers] = useState<ManagedUser[]>(SAMPLE_USERS);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const toggleUserStatus = (userId: string, name: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
        setActionNotice(`Status for ${name} changed to ${nextStatus}.`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
    setTimeout(() => setActionNotice(null), 3000);
  };

  const filteredUsers = users.filter(u => {
    return u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.institution.toLowerCase().includes(userSearch.toLowerCase());
  });

  // Admin stats explicitly matching requirements
  const stats = [
    { label: 'Total Projects', value: '2,840', note: 'All academic repositories' },
    { label: 'Verified Projects', value: '2,190', note: 'Cryptographically sealed' },
    { label: 'Colleges Onboarded', value: '128', note: 'Active institutions' },
    { label: 'System Health', value: '99.9%', note: 'Zero consensus errors' }
  ];

  return (
    <div className="space-y-6 font-serif">
      {/* Toast Notification */}
      <AnimatePresence>
        {actionNotice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header: Platform Overview */}
      <div className="border-b border-black/8 pb-4">
        <h1 className="text-[26px] sm:text-[32px] font-bold text-[#111111] uppercase tracking-tight">
          Platform Overview
        </h1>
        <p className="text-[14px] sm:text-[15px] text-[#4A4A4A] mt-1">
          Network telemetry, institutional node synchronization, and account governance.
        </p>
      </div>

      {/* 4 Stats Cards: Total Projects • Verified Projects • Colleges Onboarded • System Health */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st, idx) => (
          <div key={idx} className="card-white p-5 border border-black/8">
            <span className="text-xs font-bold text-[#737373] uppercase tracking-wider block">
              {st.label}
            </span>
            <p className="text-[32px] font-bold text-[#111111] leading-none my-2">
              {st.value}
            </p>
            <span className="text-xs text-[#737373]">
              {st.note}
            </span>
          </div>
        ))}
      </div>

      {/* User & Access Management */}
      <div className="card-white p-6 border border-black/8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-black/6">
          <h2 className="text-[18px] font-bold text-[#111111]">
            Managed Institutional Accounts ({filteredUsers.length})
          </h2>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Search user or college..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-[#FBFBFA] border border-black/10 text-[#111111] font-serif focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredUsers.map((u) => (
            <div
              key={u.id}
              className="p-4 rounded-xl bg-[#FBFBFA] border border-black/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-black/5 text-[#4A4A4A] font-medium">
                    {u.role}
                  </span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                    u.status === 'ACTIVE' 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}>
                    {u.status}
                  </span>
                </div>
                <h3 className="text-[15px] font-bold text-[#111111] mt-1">
                  {u.name}
                </h3>
                <p className="text-xs text-[#737373]">
                  {u.email} • {u.institution}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <button
                  onClick={() => toggleUserStatus(u.id, u.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                    u.status === 'ACTIVE'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  {u.status === 'ACTIVE' ? 'Suspend' : 'Reactivate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminManagementDashboard;
