import { Home, Calendar, Calculator, User } from 'lucide-react';
import { cn } from '../utils/cn';

interface Props {
  activeTab: 'home' | 'schedule' | 'nutrition' | 'profile';
  onChange: (tab: 'home' | 'schedule' | 'nutrition' | 'profile') => void;
}

export function BottomNav({ activeTab, onChange }: Props) {
  const tabs = [
    { id: 'home', icon: Home, label: '홈' },
    { id: 'schedule', icon: Calendar, label: '식단표' },
    { id: 'nutrition', icon: Calculator, label: '영양계산' },
    { id: 'profile', icon: User, label: '프로필' },
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center">
      <nav className="w-full max-w-2xl flex justify-around items-center px-4 pb-4 pt-2 bg-surface shadow-[0px_-4px_20px_rgba(79,111,0,0.05)] rounded-t-[24px]">
        {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 active:scale-95",
              isActive 
                ? "bg-primary-container text-on-primary-container font-bold px-4 py-1.5"
                : "text-on-surface-variant hover:bg-surface-container-highest"
            )}
          >
            <Icon 
              className={cn("w-6 h-6 mb-1 transition-all", isActive && "fill-current")} 
              strokeWidth={isActive ? 2.5 : 2} 
            />
            <span className="text-[12px] font-medium leading-[16px]">{tab.label}</span>
          </button>
        );
      })}
      </nav>
    </div>
  );
}
