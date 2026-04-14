import { motion } from 'motion/react';
import {
  ArrowLeft,
  Package,
  Ruler,
  Sparkles,
  Home as HomeIcon,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';

const stats = [
  { label: 'Rooms Created', value: '12', icon: HomeIcon },
  { label: 'Products Tried', value: '47', icon: Package },
  { label: 'Purchases', value: '8', icon: Sparkles },
];

const settingsSections = [
  {
    title: 'My Activity',
    items: [
      { label: 'My Orders', icon: Package, path: '/orders' },
      { label: 'Measurement Preferences', icon: Ruler, subtitle: 'Metric (cm)', path: '/settings/measurements' },
      { label: 'AR Quality', icon: Sparkles, subtitle: 'High Fidelity', path: '/settings/ar-quality' },
    ],
  },
  {
    title: 'General',
    items: [
      { label: 'Notifications', icon: Bell, path: '/settings/notifications' },
      { label: 'Help & Support', icon: HelpCircle, path: '/help' },
    ],
  },
];

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gradient-to-b from-slate-50 to-white overflow-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </button>
            <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
          </div>
        </div>
      </div>

      <div className="px-4 pt-6 space-y-6">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#185FA5] to-[#1a6bb8] rounded-3xl p-6 text-white relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-black/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-3xl">
              👤
            </div>
            <div>
              <h2 className="text-2xl font-bold">Alex Morgan</h2>
              <p className="text-white/80">alex.morgan@email.com</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-slate-200 p-4 text-center"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-slate-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#185FA5]" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Settings sections */}
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + sectionIndex * 0.1 }}
            className="space-y-3"
          >
            <h3 className="text-sm font-semibold text-slate-500 px-2">{section.title}</h3>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    className="w-full px-4 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-slate-700" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-slate-900">{item.label}</div>
                      {item.subtitle && (
                        <div className="text-sm text-slate-500">{item.subtitle}</div>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Sign out */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </motion.button>

        <div className="text-center text-xs text-slate-400 pb-4">
          AR Preview App v1.0.0
        </div>
      </div>

      <BottomNav active="profile" />
    </div>
  );
}
