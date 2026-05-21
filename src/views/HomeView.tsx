import React from 'react';
import { Meal } from '../types';
import { formatKoreanDate } from '../utils/dateUtils';
import { ThumbsUp, Heart, Sun, Moon } from 'lucide-react';

interface Props {
  todayDate: Date;
  meals: Meal[];
  isWeekend: boolean;
  targetDate: Date;
}

export function HomeView({ todayDate, meals, isWeekend, targetDate }: Props) {
  const lunch = meals.find((m) => m.mealType === '중식');
  const dinner = meals.find((m) => m.mealType === '석식');

  if (isWeekend) {
    return (
      <div className="px-container-padding pt-4 space-y-lg pb-32">
        <div className="bg-surface-container-low p-6 rounded-2xl text-center shadow-sm">
          <p className="text-on-surface-variant text-lg mb-2">오늘은 주말이라 급식 정보가 없습니다.</p>
          <p className="text-primary font-bold">다음 급식일({formatKoreanDate(targetDate)})의 식단을 보여드려요.</p>
        </div>
        {lunch?.imageUrl && (
          <HeroCard meal={lunch} date={targetDate} isNextMeal={true} />
        )}
        {lunch && <MealCard meal={lunch} type="중식" icon={<Sun className="w-5 h-5" />} />}
        {dinner && <MealCard meal={dinner} type="석식" icon={<Moon className="w-5 h-5" />} />}
      </div>
    );
  }

  return (
    <div className="px-container-padding pt-4 space-y-lg pb-32">
      {lunch?.imageUrl && (
        <HeroCard meal={lunch} date={todayDate} isNextMeal={false} />
      )}
      {lunch && <MealCard meal={lunch} type="중식" icon={<Sun className="w-5 h-5" />} />}
      {dinner && <MealCard meal={dinner} type="석식" icon={<Moon className="w-5 h-5" />} />}
    </div>
  );
}

function HeroCard({ meal, date, isNextMeal }: { meal: Meal; date: Date, isNextMeal: boolean }) {
  return (
    <section className="relative group cursor-pointer active:scale-[0.98] transition-transform duration-300">
      <div className="relative w-full h-[320px] rounded-[24px] overflow-hidden shadow-[0px_8px_30px_rgba(79,111,0,0.12)]">
        <img 
          src={meal.imageUrl} 
          alt={meal.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-secondary-container text-on-secondary-container px-3 py-1.5 rounded-full text-[14px] font-semibold flex items-center gap-1.5 shadow-sm">
            <ThumbsUp className="w-4 h-4 fill-current" />
            오늘의 추천 급식
          </span>
          {isNextMeal && (
             <span className="bg-primary text-on-primary px-3 py-1.5 rounded-full text-[14px] font-semibold flex items-center shadow-sm">
               다음 급식일
             </span>
          )}
        </div>
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white active:scale-90 transition-transform">
          <Heart className="w-5 h-5 fill-white" />
        </button>
        <div className="absolute bottom-6 left-6 text-white w-full pr-6">
          <p className="text-[14px] font-medium opacity-90 mb-1">{formatKoreanDate(date)}</p>
          <h2 className="text-[32px] font-bold leading-tight mb-3 tracking-tight">{meal.title}</h2>
          <span className="bg-on-primary-container text-primary-container px-3 py-1 rounded-full text-[14px] font-semibold inline-block">
            {meal.totalCalories} kcal
          </span>
        </div>
      </div>
    </section>
  );
}

function MealCard({ meal, type, icon }: { meal: Meal; type: string; icon: React.ReactNode }) {
  const isDinner = type === '석식';
  
  return (
    <section className="space-y-card-gap">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isDinner ? 'bg-tertiary-container/30 text-tertiary' : 'bg-primary-container/20 text-primary'
          }`}>
            {icon}
          </div>
          <h3 className="text-[20px] font-bold">{type}</h3>
        </div>
        <span className="text-on-surface-variant text-[14px] font-bold">{meal.totalCalories} kcal</span>
      </div>
      
      <div className="bg-surface-container-lowest p-6 rounded-2xl meal-card-shadow border border-surface-container-high/50">
        <ul className="space-y-4 mb-6">
          {meal.dishes.map((dish, i) => (
            <li key={i} className="flex items-center justify-between group">
              <span className={`text-[16px] text-on-surface font-medium transition-colors ${
                isDinner ? 'group-hover:text-tertiary' : 'group-hover:text-primary'
              }`}>
                {dish.name}
              </span>
              <div className="flex gap-1">
                {dish.allergens.map((alg, j) => (
                  <span key={j} className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[10px] font-bold tracking-wide">
                    {alg}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
        
        <div className="pt-4 border-t border-surface-container-high flex flex-wrap gap-1.5 items-center">
          <span className="text-[11px] font-bold text-on-surface-variant/60 mr-1">알레르기:</span>
          {Array.from(new Set(meal.dishes.flatMap(d => d.allergens))).map((alg, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant text-[12px] font-medium">
              {alg}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
