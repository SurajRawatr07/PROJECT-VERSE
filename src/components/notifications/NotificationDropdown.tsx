import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  Check, 
  Trash2, 
  ExternalLink, 
  MessageSquare, 
  Users, 
  CheckCircle2, 
  XCircle, 
  GitFork, 
  RefreshCw,
  Clock,
  ArrowRight
} from 'lucide-react';
import { StudentNotification, AppNotificationType } from '../../types';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: StudentNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  onViewNotificationDetail: (notif: StudentNotification) => void;
  onViewAllNotifications: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onViewNotificationDetail,
  onViewAllNotifications
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: AppNotificationType) => {
    switch (type) {
      case 'FACULTY_FEEDBACK':
        return <MessageSquare className="w-3.5 h-3.5 text-amber-600" />;
      case 'COLLABORATION_REQUEST':
        return <Users className="w-3.5 h-3.5 text-blue-600" />;
      case 'PROJECT_APPROVED':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      case 'PROJECT_REJECTED':
        return <XCircle className="w-3.5 h-3.5 text-rose-600" />;
      case 'REPOSITORY_UPDATE':
        return <GitFork className="w-3.5 h-3.5 text-purple-600" />;
      default:
        return <RefreshCw className="w-3.5 h-3.5 text-slate-700" />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={dropdownRef}
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 6, scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-black/12 shadow-2xl z-50 overflow-hidden text-[#111111]"
      >
        {/* Header */}
        <div className="p-3.5 sm:p-4 border-b border-black/8 flex items-center justify-between bg-[#FBFBFA]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#111111]">Notifications</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono-code font-bold bg-[#111111] text-white">
                {unreadCount} new
              </span>
            )}
          </div>

          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="text-[11px] font-mono-code text-[#4A4A4A] hover:text-[#111111] hover:underline cursor-pointer"
            >
              Mark all read
            </button>
          )}
        </div>

        {/* List */}
        <div className="max-h-80 overflow-y-auto divide-y divide-black/6">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-7 h-7 text-[#737373] mx-auto mb-2 opacity-50" />
              <p className="text-xs font-medium text-[#111111]">No notifications</p>
              <p className="text-[11px] text-[#737373] mt-0.5">You're completely caught up!</p>
            </div>
          ) : (
            notifications.slice(0, 5).map((notif) => (
              <div
                key={notif.id}
                className={`p-3 sm:p-3.5 flex items-start gap-3 transition-colors ${
                  !notif.read ? 'bg-[#F7F7F5]' : 'bg-white hover:bg-[#FBFBFA]'
                }`}
              >
                {/* Type Icon */}
                <div className="w-7 h-7 rounded-xl bg-white border border-black/8 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                  {getIcon(notif.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <p className={`text-xs truncate ${!notif.read ? 'font-bold text-[#111111]' : 'font-medium text-[#4A4A4A]'}`}>
                      {notif.title}
                    </p>
                    <span className="text-[10px] font-mono-code text-[#737373] shrink-0">
                      {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#4A4A4A] line-clamp-2 leading-relaxed">
                    {notif.message}
                  </p>

                  {/* Actions */}
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => {
                        onViewNotificationDetail(notif);
                        onClose();
                      }}
                      className="text-[11px] font-medium text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>{notif.type === 'FACULTY_FEEDBACK' ? 'View Feedback' : notif.type === 'COLLABORATION_REQUEST' ? 'Review Request' : 'View Details'}</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>

                    {!notif.read && (
                      <button
                        onClick={() => onMarkAsRead(notif.id)}
                        className="text-[10px] font-mono-code text-[#737373] hover:text-[#111111] cursor-pointer ml-auto"
                      >
                        Mark read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-[#FBFBFA] border-t border-black/8 text-center">
          <button
            onClick={() => {
              onViewAllNotifications();
              onClose();
            }}
            className="text-xs font-medium text-[#111111] hover:underline cursor-pointer w-full py-1"
          >
            Open Full Notification Center →
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
