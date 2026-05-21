import { useState } from 'react';
import { Meal } from '../types';
import { getDefaultSelectedDate, formatDateKey } from '../utils/dateUtils';
import { cn } from '../utils/cn';
import { Check, Save } from 'lucide-react';

interface Props {
  meals: Meal[];
  todayDate: Date;
}

export function NutritionView({ meals, todayDate }: Props) {
  const targetDate = getDefaultSelectedDate(todayDate);
  const targetDateKey = formatDateKey(targetDate);
  
  const defaultMeal = meals.find(m => m.dateKey === targetDateKey && m.mealType === '중식');
  
  const [selectedDishes, setSelectedDishes] = useState<string[]>(
    defaultMeal ? defaultMeal.dishes.map(d => d.name) : []
  );
  const [filter, setFilter] = useState('전체');

  if (!defaultMeal) return <div className="p-4">현재 제공되는 식단이 없습니다.</div>;

  const currentCalories = defaultMeal.dishes
    .filter(d => selectedDishes.includes(d.name))
    .reduce((sum, d) => sum + (d.calories || 0), 0);

  const currentCarbs = defaultMeal.dishes
    .filter(d => selectedDishes.includes(d.name))
    .reduce((sum, d) => sum + (d.nutrition?.carbs || 0), 0);

  const currentProtein = defaultMeal.dishes
    .filter(d => selectedDishes.includes(d.name))
    .reduce((sum, d) => sum + (d.nutrition?.protein || 0), 0);

  const currentFat = defaultMeal.dishes
    .filter(d => selectedDishes.includes(d.name))
    .reduce((sum, d) => sum + (d.nutrition?.fat || 0), 0);

  const toggleDish = (name: string) => {
    setSelectedDishes(prev => 
      prev.includes(name) ? prev.filter(d => d !== name) : [...prev, name]
    );
  };

  const categories = ['전체', '밥류', '국/찌개', '반찬', '디저트'];
  
  const getCategory = (name: string) => {
    if (name.includes('밥')) return '밥류';
    if (name.includes('국') || name.includes('찌개') || name.includes('탕')) return '국/찌개';
    if (name.includes('요구르트') || name.includes('샤인머스캣')) return '디저트';
    return '반찬';
  };

  const filteredDishes = defaultMeal.dishes.filter(d => 
    filter === '전체' || getCategory(d.name) === filter
  );

  return (
    <div className="px-container-padding pt-base space-y-lg pb-32">
      <section className="bg-surface-container-lowest p-5 rounded-2xl meal-card-shadow border border-surface-variant/30">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[20px] font-bold text-primary">오늘의 선택 영양</h2>
          <div className="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full font-bold text-[20px]">
            {currentCalories} <span className="text-[14px] font-normal">kcal</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <NutritionBar label="탄수화물" current={currentCarbs} target={150} colorClass="bg-primary" />
          <NutritionBar label="단백질" current={currentProtein} target={60} colorClass="bg-secondary" />
          <NutritionBar label="지방" current={currentFat} target={50} colorClass="bg-tertiary-container" />
        </div>
      </section>

      <nav className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {categories.map(c => (
          <button 
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "shrink-0 px-5 py-2.5 rounded-full text-[14px] font-bold transition-all active:scale-95",
              filter === c 
                ? "bg-primary text-on-primary" 
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
            )}
          >
            {c}
          </button>
        ))}
      </nav>

      <section className="space-y-4">
        {filteredDishes.map((dish, i) => {
          const isSelected = selectedDishes.includes(dish.name);
          return (
            <div 
              key={i}
              onClick={() => toggleDish(dish.name)}
              className={cn(
                "bg-surface-container-lowest p-4 rounded-2xl meal-card-shadow border-2 transition-all duration-300 flex items-center gap-4 cursor-pointer active:scale-[0.98]",
                isSelected ? "border-primary" : "border-transparent"
              )}
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-variant flex-shrink-0">
                {dish.imageUrl ? (
                  <img src={dish.imageUrl} alt={dish.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-surface-container" />
                )}
              </div>
              <div className="flex-grow">
                <h3 className="text-[18px] font-bold text-on-surface mb-1">{dish.name}</h3>
                <p className="text-[14px] font-medium text-on-surface-variant">
                  {dish.calories} kcal {dish.description && `| ${dish.description}`}
                </p>
              </div>
              <div className={cn(
                "w-6 h-6 border-2 rounded-md flex items-center justify-center transition-colors shadow-sm",
                isSelected ? "bg-primary border-primary" : "border-outline"
              )}>
                {isSelected && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
              </div>
            </div>
          );
        })}
      </section>

      <div className="fixed bottom-[88px] left-0 w-full px-container-padding z-40">
        <button className="w-full bg-primary-container text-on-primary-container font-bold text-[18px] py-4 rounded-2xl shadow-lg active:scale-[0.97] transition-transform flex items-center justify-center gap-2">
          <Save className="w-5 h-5" />
          계산 결과 저장하기
        </button>
      </div>
    </div>
  );
}

function NutritionBar({ label, current, target, colorClass }: { label: string, current: number, target: number, colorClass: string }) {
  const percent = Math.min(100, Math.round((current / target) * 100));
  
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[14px] font-bold text-on-surface-variant">
        <span>{label}</span>
        <span className="text-primary">{current}g <span className="text-on-surface-variant/60 ml-1 font-medium">/ {target}g</span></span>
      </div>
      <div className="h-3 w-full bg-surface-variant rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full transition-all duration-700", colorClass)} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}
