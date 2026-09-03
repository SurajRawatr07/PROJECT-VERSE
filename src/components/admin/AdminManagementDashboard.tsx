import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldAlert,
  ShieldCheck,
  Building2,
  Users,
  FolderGit2,
  Activity,
  CheckCircle2,
  Search,
  Filter,
  RefreshCw,
  Lock,
  Unlock,
  Key,
  Database,
  Sliders,
  ExternalLink,
  ChevronRight
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

interface ManagedInstitution {
  id: string;
  name: string;
  code: string;
  nodeStatus: 'HEALTHY' | 'SYNCING' | 'FAULT';
  passportsIssued: number;
  lastConsensusSync: string;
}

const SAMPLE_USERS: ManagedUser[] = [
  { id: 'usr-1', name: 'Aarav Sharma', email: 'aarav.sharma@gehu.ac.in', role: 'STUDENT', institution: 'Graphic Era Hill University', status: 'ACTIVE', joinedAt: '2024-08-15' },
  { id: 'usr-2', name: 'Dr. Anil Sharma', email: 'anil.sharma@gehu.ac.in', role: 'FACULTY', institution: 'Graphic Era Hill University', status: 'ACTIVE', joinedAt: '2022-06-10' },
  { id: 'usr-3', name: 'Dr. Rajesh Kumar', email: 'rajesh.kumar@gehu.ac.in', role: 'HOD', institution: 'Graphic Era Hill University', status: 'ACTIVE', joinedAt: '2020-01-20' },
  { id: 'usr-4', name: 'Priya Patel', email: 'priya.patel@iitb.ac.in', role: 'STUDENT', institution: 'IIT Bombay', status: 'ACTIVE', joinedAt: '2024-09-01' },
  { id: 'usr-5', name: 'Dr. Ramesh Sundaram', email: 'r.sundaram@iitd.ac.in', role: 'FACULTY', institution: 'IIT Delhi', status: 'ACTIVE', joinedAt: '2021-03-12' },
  { id: 'usr-6', name: 'Rohan Mehra', email: 'rohan.mehra@bits-pilani.ac.in', role: 'STUDENT', institution: 'BITS Pilani', status: 'ACTIVE', joinedAt: '2023-08-20' }
];

const SAMPLE_INSTITUTIONS: ManagedInstitution[] = [
  { id: 'inst-1', name: 'Graphic Era Hill University', code: 'GEHU-DEHRADUN', nodeStatus: 'HEALTHY', passportsIssued: 48, lastConsensusSync: 'Just now' },
  { id: 'inst-2', name: 'Indian Institute of Technology Bombay', code: 'IIT-BOMBAY-01', nodeStatus: 'HEALTHY', passportsIssued: 124, lastConsensusSync: '2m ago' },
  { id: 'inst-3', name: 'Indian Institute of Technology Delhi', code: 'IIT-DELHI-02', nodeStatus: 'HEALTHY', passportsIssued: 98, lastConsensusSync: '5m ago' },
  { id: 'inst-4', name: 'Birla Institute of Technology and Science Pilani', code: 'BITS-PILANI', nodeStatus: 'HEALTHY', passportsIssued: 76, lastConsensusSync: '7m ago' },
  { id: 'inst-5', name: 'National Institute of Technology Karnataka', code: 'NITK-SURATHKAL', nodeStatus: 'HEALTHY', passportsIssued: 62, lastConsensusSync: '12m ago' }
];

const INITIAL_AUDIT_LOGS = [
  { id: 'log-1', timestamp: '05:14:22', event: 'HOD_SEAL_APPLIED', details: 'HOD Dr. Rajesh Kumar sealed PV-2025-GEHU-CS089.', severity: 'INFO' },
  { id: 'log-2', timestamp: '05:08:11', event: 'FEDERATED_SAML_SYNC', details: 'Consensus node GEHU-DEHRADUN validated 128 university federations.', severity: 'INFO' },
  { id: 'log-3', timestamp: '04:52:40', event: 'GIT_LINEAGE_COMMITTED', details: 'Batch lineage #34 committed to IPFS ledger for repo projectverse/aerosync.', severity: 'SUCCESS' },
  { id: 'log-4', timestamp: '04:31:05', event: 'FACULTY_REVIEW_RECORDED', details: 'Dr. Anil Sharma submitted rubric evaluation 9.4/10.', severity: 'INFO' },
  { id: 'log-5', timestamp: '03:19:54', event: 'DUPLICATION_CHECK_PASSED', details: 'Zero semantic collision detected in cross-college capstone vector database.', severity: 'SUCCESS' }
];

export const AdminManagementDashboard: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'users' | 'institutions' | 'audit'>('users');
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [users, setUsers] = useState<ManagedUser[]>(SAMPLE_USERS);
  const [institutions, setInstitutions] = useState<ManagedInstitution[]>(SAMPLE_INSTITUTIONS);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const toggleUserStatus = (userId: string, name: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
        setActionNotice(`Account status for ${name} changed to ${nextStatus}.`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
    setTimeout(() => setActionNotice(null), 3000);
  };

  const filteredUsers = users.filter(u => {
    const matchesQuery = 
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.institution.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesQuery && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {actionNotice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs sm:text-sm font-medium flex items-center gap-2 shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>{actionNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Network Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-black/8 shadow-xs">
          <span className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">Federated Universities</span>
          <p className="text-2xl font-bold text-[#111111] mt-1">{institutions.length + 123}</p>
          <span className="text-[11px] text-emerald-700 font-medium">100% SAML SSO Sync</span>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-black/8 shadow-xs">
          <span className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">Total Ledger Passports</span>
          <p className="text-2xl font-bold text-[#111111] mt-1">4,920</p>
          <span className="text-[11px] text-[#4A4A4A]">Cryptographically Sealed</span>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-black/8 shadow-xs">
          <span className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">Consensus Node Health</span>
          <p className="text-2xl font-bold text-emerald-700 mt-1">99.99%</p>
          <span className="text-[11px] text-[#737373]">Zero cryptographic faults</span>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-black/8 shadow-xs">
          <span className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">Active Accounts</span>
          <p className="text-2xl font-bold text-[#111111] mt-1">{users.length * 480}</p>
          <span className="text-[11px] text-[#4A4A4A]">RBAC Multi-Signal Guard</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-black/8 gap-2 sm:gap-6">
        <button
          onClick={() => setActiveSubTab('users')}
          className={`pb-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeSubTab === 'users'
              ? 'border-[#111111] text-[#111111]'
              : 'border-transparent text-[#737373] hover:text-[#111111]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User & RBAC Management ({users.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab('institutions')}
          className={`pb-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeSubTab === 'institutions'
              ? 'border-[#111111] text-[#111111]'
              : 'border-transparent text-[#737373] hover:text-[#111111]'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Institutional Nodes ({institutions.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab('audit')}
          className={`pb-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeSubTab === 'audit'
              ? 'border-[#111111] text-[#111111]'
              : 'border-transparent text-[#737373] hover:text-[#111111]'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Immutable Audit Logs</span>
        </button>
      </div>

      {/* SUB-TAB 1: User Management */}
      {activeSubTab === 'users' && (
        <div className="bg-white rounded-2xl border border-black/8 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-black/8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search user name, institutional email, or university..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#FBFBFA] border border-black/10 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-black/30 text-[#111111]"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 bg-[#FBFBFA] border border-black/10 rounded-xl text-xs font-semibold text-[#111111] w-full sm:w-auto"
            >
              <option value="ALL">All Roles</option>
              <option value="STUDENT">Students</option>
              <option value="FACULTY">Faculty</option>
              <option value="HOD">HODs</option>
              <option value="ADMIN">Admins</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FBFBFA] border-b border-black/8 text-[#737373] font-mono-code uppercase text-[10px]">
                <tr>
                  <th className="px-6 py-3 font-semibold">User Identity</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                  <th className="px-4 py-3 font-semibold">Affiliated University</th>
                  <th className="px-4 py-3 font-semibold">Account State</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/6">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-[#FBFBFA] transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <span className="font-semibold text-[#111111] text-sm block">{u.name}</span>
                        <span className="text-[11px] text-[#737373] font-mono-code">{u.email}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-md bg-[#F7F7F5] border border-black/5 text-[#111111] font-semibold">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-[#4A4A4A]">
                      {u.institution}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-[10px] font-mono-code px-2 py-0.5 rounded-full font-medium ${
                        u.status === 'ACTIVE' 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => toggleUserStatus(u.id, u.name)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                          u.status === 'ACTIVE'
                            ? 'bg-[#F7F7F5] hover:bg-rose-50 text-[#737373] hover:text-rose-700 border-black/8'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        {u.status === 'ACTIVE' ? 'Suspend Access' : 'Reactivate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Institutional Nodes */}
      {activeSubTab === 'institutions' && (
        <div className="bg-white rounded-2xl border border-black/8 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-black/8 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#111111]">
              Federated Institutional Anchors & Consensus Nodes
            </h3>
            <span className="text-xs font-mono-code text-emerald-700 font-semibold">
              All 128 Nodes Online
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FBFBFA] border-b border-black/8 text-[#737373] font-mono-code uppercase text-[10px]">
                <tr>
                  <th className="px-6 py-3 font-semibold">University</th>
                  <th className="px-4 py-3 font-semibold">Node Code</th>
                  <th className="px-4 py-3 font-semibold">Health Status</th>
                  <th className="px-4 py-3 font-semibold">Passports Anchored</th>
                  <th className="px-6 py-3 font-semibold text-right">Last Consensus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/6">
                {institutions.map((inst) => (
                  <tr key={inst.id} className="hover:bg-[#FBFBFA] transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-semibold text-[#111111] text-sm block">{inst.name}</span>
                    </td>
                    <td className="px-4 py-4 font-mono-code text-[#737373]">
                      {inst.code}
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>HEALTHY</span>
                      </span>
                    </td>
                    <td className="px-4 py-4 font-mono-code font-bold text-[#111111]">
                      {inst.passportsIssued}
                    </td>
                    <td className="px-6 py-4 text-right font-mono-code text-[#737373]">
                      {inst.lastConsensusSync}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Live Audit Logs */}
      {activeSubTab === 'audit' && (
        <div className="bg-white rounded-2xl p-6 border border-black/8 font-mono-code text-xs shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-black/8">
            <div>
              <h3 className="text-sm font-semibold text-[#111111]">Live Immutable Cryptographic Audit Stream</h3>
              <p className="text-[11px] text-[#737373] mt-0.5">Anchored across federated college nodes with zero rollback guarantee.</p>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
              LIVE TELEMETRY
            </span>
          </div>

          <div className="space-y-2.5">
            {INITIAL_AUDIT_LOGS.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-[#FBFBFA] border border-black/6 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700 font-semibold">[{log.timestamp}]</span>
                  <span className="text-[#111111] font-bold bg-[#EBEBE8] px-1.5 py-0.5 rounded text-[10px]">
                    {log.event}
                  </span>
                  <span className="text-[#4A4A4A]">{log.details}</span>
                </div>
                <span className="text-[10px] text-[#737373] shrink-0 self-end sm:self-auto">
                  Signer: ROOT-KEY-01
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
