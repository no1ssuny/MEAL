import React, { useState } from 'react';
import { Meal } from '../types';
import { getWeekDates, getWeekOfMonth, formatDateKey, getDefaultSelectedDate } from '../utils/dateUtils';
import { Sun, Moon, Info, AlertTriangle } from 'lucide-react';
import { cn } from '../utils/cn';

interface Props {
  meals: Meal[];
  todayDate: Date;
}

export function ScheduleView({ meals, todayDate }: Props) {
  const defaultDate = getDefaultSelectedDate(todayDate);
  const [selectedDateKey, setSelectedDateKey] = useState(formatDateKey(defaultDate));
  
  const weekDates = getWeekDates(todayDate);
  const weekInfo = getWeekOfMonth(todayDate);
  
  const selectedMeals = meals.filter(m => m.dateKey === selectedDateKey);
  const lunch = selectedMeals.find(m => m.mealType === '중식');
  const dinner = selectedMeals.find(m => m.mealType === '석식');

  return (
    <div className="px-container-padding mt-sm pb-32">
      <section className="mb-lg">
        <div className="flex flex-col gap-1">
          <span className="text-primary text-[14px] font-bold">주간 식단</span>
          <h2 className="text-on-surface text-[32px] font-bold">{weekInfo.month}월 {weekInfo.week}주차</h2>
        </div>
      </section>

      <section className="mb-lg overflow-x-auto no-scrollbar py-2">
        <div className="flex gap-3 min-w-max">
          {weekDates.map(date => {
            const key = formatDateKey(date);
            const isSelected = key === selectedDateKey;
            const days = ['일','월','화','수','목','금','토'];
            
            return (
              <button 
                key={key}
                onClick={() => setSelectedDateKey(key)}
                className={cn(
                  "flex flex-col items-center justify-center w-14 h-20 rounded-lg transition-transform active:scale-95",
                  isSelected 
                    ? "bg-primary-container text-on-primary-container shadow-md"
                    : "bg-surface-variant text-on-surface-variant hover:bg-surface-container-highest"
                )}
              >
                <span className="text-[12px] font-medium mb-1">{days[date.getDay()]}</span>
                <span className="text-[20px] font-bold">{date.getDate()}</span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="space-y-card-gap">
        {lunch && <ScheduleMealCard meal={lunch} type="중식" icon={<Sun className="w-6 h-6" />} />}
        {dinner && <ScheduleMealCard meal={dinner} type="석식" icon={<Moon className="w-6 h-6" />} />}
      </div>
    </div>
  );
}

function ScheduleMealCard({ meal, type, icon }: { meal: Meal; type: string; icon: React.ReactNode }) {
  const isDinner = type === '석식';
  const targetProtein = 60;
  const rate = Math.min(100, Math.round(((meal.nutrition?.protein || 0) / targetProtein) * 100));

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-6 meal-card-shadow border border-outline-variant/10">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", isDinner ? "bg-surface-variant text-on-surface-variant" : "bg-secondary-container text-on-secondary-container")}>
            {icon}
          </div>
          <div>
            <h3 className="text-[20px] font-bold text-on-surface">{type}</h3>
            <span className="inline-block bg-tertiary-fixed text-on-tertiary-fixed text-[12px] font-medium px-2 py-0.5 rounded-full mt-1">
              {meal.totalCalories} kcal
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <span className="text-[12px] font-bold text-on-surface-variant block mb-1">단백질 달성률</span>
          <div className="flex items-center gap-2">
           <div className="w-24 h-2 bg-outline-variant rounded-full overflow-hidden">
             <div className={cn("h-full", isDinner ? "bg-secondary" : "bg-primary-container")} style={{ width: `${rate}%` }}></div>
           </div>
           <span className={cn("text-[14px] font-bold", isDinner ? "text-secondary" : "text-primary")}>{rate}%</span>
          </div>
        </div>
      </div>
      
      <ul className="space-y-2 mb-2">
        {meal.dishes.map((dish, i) => (
          <li key={i} className="flex items-center justify-between py-3 border-b border-surface-variant/30 last:border-0 last:pb-0">
            <span className="text-[16px] font-medium">{dish.name}</span>
            {dish.allergens.length > 0 && (
              <div className="flex gap-1">
                {dish.allergens.map((alg, j) => (
                  <span key={j} className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1",
                    alg.includes('돼지') ? "bg-secondary-container/50 text-secondary" : "bg-surface-container text-on-surface-variant"
                  )}>
                    {alg.includes('돼지') ? <AlertTriangle className="w-3 h-3" /> : <Info className="w-3 h-3" />}
                    {alg}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
