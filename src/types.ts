export interface Dish {
  name: string;
  allergens: string[];
  calories?: number;
  nutrition?: { carbs: number; protein: number; fat: number };
  imageUrl?: string;
  description?: string;
}

export interface Meal {
  id: string;
  schoolName: string;
  date: Date;
  dateKey: string;
  dayOfWeek: string;
  mealType: '중식' | '석식';
  title: string;
  dishes: Dish[];
  totalCalories: number;
  nutrition: { carbs: number; protein: number; fat: number };
  imageUrl?: string;
  isRecommended?: boolean;
}
