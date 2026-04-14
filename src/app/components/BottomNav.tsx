import { Home, Search, Camera, Heart, User } from 'lucide-react';
import { useNavigate } from 'react-router';

interface BottomNavProps {
  active: 'home' | 'search' | 'ar' | 'wishlist' | 'profile';
}

export default function BottomNav({ active }: BottomNavProps) {
  const navigate = useNavigate();

  const items = [
    { id: 'home', icon: Home, label: 'Home', path: '/home' },
    { id: 'search', icon: Search, label: 'Search', path: '/home' },
    { id: 'ar', icon: Camera, label: 'AR', path: '/ar/1' },
    { id: 'wishlist', icon: Heart, label: 'Saved', path: '/wishlist' },
    { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-slate-200/50">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            const isAR = item.id === 'ar';

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-all ${
                  isAR
                    ? 'bg-[#185FA5] text-white scale-110 -mt-4 shadow-lg shadow-[#185FA5]/50'
                    : isActive
                    ? 'text-[#185FA5]'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Icon className={`${isAR ? 'w-6 h-6' : 'w-5 h-5'}`} />
                <span className={`text-[10px] font-medium ${isAR ? 'hidden' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
