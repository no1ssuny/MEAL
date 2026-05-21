import { useState, useMemo } from 'react';
import { BottomNav } from './components/BottomNav';
import { AppHeader } from './components/AppHeader';
import { HomeView } from './views/HomeView';
import { ScheduleView } from './views/ScheduleView';
import { NutritionView } from './views/NutritionView';
import { ProfileView } from './views/ProfileView';
import { generateMockData } from './data/mockData';
import { getTodayKST, getDefaultSelectedDate } from './utils/dateUtils';

type Tab = 'home' | 'schedule' | 'nutrition' | 'profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  
  const { meals, today, isWeekend, targetDate } = useMemo(() => {
    const todayDate = getTodayKST();
    const day = todayDate.getDay();
    const weekend = day === 0 || day === 6;
    const target = getDefaultSelectedDate(todayDate);
    
    return {
      meals: generateMockData(target),
      today: todayDate,
      isWeekend: weekend,
      targetDate: target
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-background relative flex flex-col justify-center items-center">
      <div className="w-full max-w-2xl bg-surface min-h-screen relative pb-6 shadow-sm border-x border-surface-variant/30">
        <AppHeader activeTab={activeTab} />
        
        <main className="w-full">
          {activeTab === 'home' && (
            <HomeView todayDate={today} meals={meals} isWeekend={isWeekend} targetDate={targetDate} />
          )}
          {activeTab === 'schedule' && (
            <ScheduleView todayDate={targetDate} meals={meals} />
          )}
          {activeTab === 'nutrition' && (
            <NutritionView todayDate={targetDate} meals={meals} />
          )}
          {activeTab === 'profile' && (
            <ProfileView />
          )}
        </main>
      </div>

      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
}
