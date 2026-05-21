import { UtensilsCrossed, Bell, Calendar as CalendarIcon, Settings, Calculator } from 'lucide-react';

interface Props {
  activeTab: 'home' | 'schedule' | 'nutrition' | 'profile';
}

export function AppHeader({ activeTab }: Props) {
  const rightIcon = {
    home: <Bell className="w-6 h-6 text-on-surface-variant" />,
    schedule: <CalendarIcon className="w-6 h-6 text-on-surface-variant" />,
    nutrition: <Calculator className="w-6 h-6 text-on-surface-variant" />,
    profile: <Settings className="w-6 h-6 text-on-surface-variant" />,
  }[activeTab];

  return (
    <header className="bg-background sticky top-0 z-40 flex items-center justify-between px-container-padding py-sm w-full">
      <div className="flex items-center gap-2">
        <UtensilsCrossed className="w-7 h-7 text-primary" strokeWidth={2.5} />
        <h1 className="text-[24px] font-bold text-primary tracking-tight">미소고등학교 급식</h1>
      </div>
      <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors active:scale-95">
        {rightIcon}
      </button>
    </header>
  );
}
