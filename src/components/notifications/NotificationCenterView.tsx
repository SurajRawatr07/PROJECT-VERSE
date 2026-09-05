import React, { useState } from 'react';
import { 
  Bell, 
  Check, 
  Trash2, 
  MessageSquare, 
  Users, 
  CheckCircle2, 
  XCircle, 
  GitFork, 
  RefreshCw,
  Filter,
  CheckCheck
} from 'lucide-react';
import { StudentNotification, AppNotificationType } from '../../types';

interface NotificationCenterViewProps {
  notifications: StudentNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  onSelectNotification: (notif: StudentNotification) => void;
}

export const NotificationCenterView: React.FC<NotificationCenterViewProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onSelectNotification
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [onlyUnread, setOnlyUnread] = useState<boolean>(false);

  const filtered = notifications.filter(n => {
    if (onlyUnread && n.read) return false;
    if (filterType === 'ALL') return true;
    if (filterType === 'FEEDBACK') return n.type === 'FACULTY_FEEDBACK';
    if (filterType === 'COLLAB') return n.type === 'COLLABORATION_REQUEST' || n.type === 'PROPOSAL';
    if (filterType === 'PROJECT') return n.type.startsWith('PROJECT_') || n.type === 'REVIEW_UPDATED' || n.type === 'REPOSITORY_UPDATE';
    return true;
  });

  const getIcon = (type: AppNotificationType) => {
    switch (type) {
      case 'FACULTY_FEEDBACK':
        return <MessageSquare className="w-4 h-4 text-amber-600" />;
      case 'COLLABORATION_REQUEST':
        return <Users className="w-4 h-4 text-blue-600" />;
      case 'PROJECT_APPROVED':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'PROJECT_REJECTED':
        return <XCircle className="w-4 h-4 text-rose-600" />;
      case 'REPOSITORY_UPDATE':
        return <GitFork className="w-4 h-4 text-purple-600" />;
      default:
        return <RefreshCw className="w-4 h-4 text-slate-700" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 sm:p-6 bg-white rounded-2xl border border-black/8 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#111111]">
              Student Notification Center
            </h2>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-mono-code font-bold bg-[#111111] text-white">
                {unreadCount} unread
              </span>
            )}
          </div>
          <p className="text-xs text-[#4A4A4A] mt-1">
            Real-time feed of faculty reviews, collaboration proposals, and project milestones.
          </p>
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="px-3 py-1.5 rounded-xl bg-[#F7F7F5] hover:bg-[#ECECE9] border border-black/10 text-xs font-medium text-[#111111] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark All as Read</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-1 border-b border-black/8">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'ALL', label: 'All Notifications' },
            { id: 'FEEDBACK', label: 'Faculty Feedback' },
            { id: 'COLLAB', label: 'Collaboration' },
            { id: 'PROJECT', label: 'Project Status' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                filterType === tab.id
                  ? 'bg-[#111111] text-white font-medium'
                  : 'bg-[#F7F7F5] text-[#4A4A4A] hover:text-[#111111]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-xs text-[#4A4A4A] cursor-pointer">
          <input
            type="checkbox"
            checked={onlyUnread}
            onChange={(e) => setOnlyUnread(e.target.checked)}
            className="rounded text-[#111111] focus:ring-0"
          />
          <span>Show Unread Only</span>
        </label>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-black/8 p-8">
            <Bell className="w-10 h-10 text-[#737373] mx-auto mb-3 opacity-40" />
            <h3 className="text-sm font-bold text-[#111111]">No Notifications</h3>
            <p className="text-xs text-[#737373] mt-1 max-w-sm mx-auto">
              {onlyUnread
                ? "You have marked all notifications as read."
                : "Your notifications stream will update when mentors review code or peers submit collaboration requests."}
            </p>
          </div>
        ) : (
          filtered.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                !notif.read
                  ? 'bg-white border-black/20 shadow-xs ring-1 ring-black/5'
                  : 'bg-[#FBFBFA] border-black/8 hover:border-black/15'
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-white border border-black/10 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                  {getIcon(notif.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className={`text-xs sm:text-sm ${!notif.read ? 'font-bold text-[#111111]' : 'font-bold text-[#333333]'}`}>
                      {notif.title}
                    </h4>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                    )}
                    {notif.projectTitle && (
                      <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-md bg-[#F0F0EE] text-[#4A4A4A] truncate max-w-[200px]">
                        {notif.projectTitle}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#4A4A4A] leading-relaxed">
                    {notif.message}
                  </p>

                  <div className="flex items-center gap-3 mt-2 text-[11px] font-mono-code text-[#737373]">
                    <span>{new Date(notif.createdAt).toLocaleDateString()} at {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {notif.facultyName && (
                      <span>• By {notif.facultyName}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => onSelectNotification(notif)}
                  className="px-3 py-1.5 rounded-xl bg-[#111111] hover:bg-black text-white text-xs font-medium cursor-pointer transition-colors"
                >
                  View Details
                </button>

                {!notif.read && (
                  <button
                    onClick={() => onMarkAsRead(notif.id)}
                    className="p-2 rounded-xl bg-[#F5F5F3] hover:bg-[#EBEBE8] text-[#4A4A4A] hover:text-[#111111] transition-colors cursor-pointer"
                    title="Mark as Read"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={() => onDeleteNotification(notif.id)}
                  className="p-2 rounded-xl bg-[#F5F5F3] hover:bg-rose-50 text-[#737373] hover:text-rose-600 transition-colors cursor-pointer"
                  title="Delete Notification"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
