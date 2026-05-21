import { Meal } from '../types';
import { getTodayKST, getWeekDates, formatDateKey, getKoreanDayOfWeek } from '../utils/dateUtils';

const lunchTitles = ['프리미엄 치즈돈까스 정식', '한우불고기 덮밥', '해물 짬뽕국', '치킨마요 덮밥', '비빔밥과 계란후라이'];
const dinnerTitles = ['참치마요덮밥', '계란볶음밥', '김치찌개와 김', '로제 스파게티', '오므라이스'];

export const generateMockData = (baseDate?: Date): Meal[] => {
  const today = baseDate || getTodayKST();
  const weekDates = getWeekDates(today);
  const meals: Meal[] = [];

  const lunchImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBKdM6er7cIPrU9C3yIimIU8HEMVjoNc4XTm_c2CyFW1s3ddR5yQtogiNF9e1K8ZMY1dlIcH4gp6og2XT5WErZ1Rm6qG878WZC9M-D4dAds1EElN5_M1Cl6aSPHj7Fe-m5JkGEWpbsQeNMJJoefj-uD0lALSlTOV3QbESqolPM0H_WOokJXOR3J07xzKGpwthBodJirLcnYpGQBo3jEDkZGZMi4z5Ux25EH6sXGceKf1mfP7pbMDVzKrw_evyj3uL3kPLchw3Tyxz0w',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCOQtAmWFSSKL2ziZT3qse7MQiSavVZHQoad6ttHgSEOEubcvI1HZmfhmTx4pW94VVV2aqr1hbqD-ufEK46e0vrV2ooHZc7VU1dbH5ELUSLEvww7Ng3q45VnrQAKQtseSt7C-NC1ahJiwAihp7SkXWnKdZtzNSP5UKqR6JVc5P77QErWfC9NBzoNFmWg6L45ZtCf40AdgMJrokzjDttJSuX0GCexwduHzA1kUJ1FWdEoRMOKRYwQRcP6g3XjA49bE7XfAB3zr0rCMwG',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCJe-9uE2ANBlgC6mssUUYzPLveBo82paXbwaQm1eToqZt0-3_C0MimdtOvsUPifcKizGiEyzUvIN8zRqiwt2iqog_zuSfE-ACjtjUgh3w9J1MMfqfYwxb_LSUe-QUY4ajHT3tZMDiYN2lvmWIycsdLoK5tFG7Q_6Wg8JHDDIxcoclsLffawgBVT46BFWZVZlB4lY2Iw3V99PedOtg-EBLFoAR9TOfozsCaXCbgI1-lxbi8wVMyqgYcTdD8B6AaxPMy6VN6naYSSmG1',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ5SNRtKsnRObMp3yzwsvZ1jJ4z3TVz7BSTm35VRCgcBSPHUw7tIF6cz8u4CWMKpq1iwuicqILA0_DMQ65pMn2RI-SSTcJmlcyXSy5sX3sB2jZC48jdALu1at72W4WJDLtw2Cmvjy2szMW8njBHmYz3YhAVGIzirXOORo_ftvgU6PER8VK_H_LPbUrfG4J5NM2G_EBA1t9jaMwaczj6BJvGEXk5_Y-okIPUHWqAGTt_unklDX2AJ0iB8nzdBnW5X71XE-RdJCb45Yr',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuARLsKj_EZXswl1-iqpKI1JX8VKePuUHe3PTyrQrOJumLRuKJ7KiZTxiSRuCVLpsPvczzpXmu-BZfAVRNpk4StmJhxX8ksr-JDwgTO143hBJu2DXj6Em6YGXL6ti5A_0lXviykj4R_bP4qonvzuTfLGa3dutJ4_0CHw-KJwtncfzNW2GtoSZ9qfBipL_yaDwQqqwLMyraT0x_NI_YCi5KPtk2kljqyxepis0qOi_F1uiMXIbu_L2z79YHsjqCfE3aYFlYxrCZ4wrtyX',
  ];

  weekDates.forEach((date, index) => {
    // Lunch
    meals.push({
      id: `L-${formatDateKey(date)}`,
      schoolName: '씨마스고등학교',
      date: date,
      dateKey: formatDateKey(date),
      dayOfWeek: getKoreanDayOfWeek(date),
      mealType: '중식',
      title: lunchTitles[index],
      dishes: [
        { name: '친환경현미밥', allergens: [], calories: 321, nutrition: { carbs: 68, protein: 6, fat: 2 }, imageUrl: lunchImages[1], description: '탄 68g' },
        { name: '쇠고기미역국', allergens: ['쇠고기'], calories: 120, nutrition: { carbs: 10, protein: 8, fat: 5 } },
        { name: '돼지고기 김치찌개', allergens: ['돼지고기', '대두'], calories: 245, nutrition: { carbs: 20, protein: 18, fat: 12 }, imageUrl: lunchImages[2], description: '단 18g' },
        { name: '시금치 나물', allergens: [], calories: 45, nutrition: { carbs: 5, protein: 1, fat: 1 }, imageUrl: lunchImages[3], description: '식이섬유 풍부' },
        { name: '고등어 구이', allergens: ['고등어'], calories: 210, nutrition: { carbs: 2, protein: 22, fat: 15 }, imageUrl: lunchImages[4], description: '단 22g' },
        { name: '배추김치', allergens: [], calories: 9, nutrition: { carbs: 2, protein: 0, fat: 0 } },
      ],
      totalCalories: 845,
      nutrition: { carbs: 110, protein: 32, fat: 25 },
      imageUrl: index === 0 ? lunchImages[0] : lunchImages[(index % 4) + 1],
      isRecommended: true
    });

    // Dinner
    meals.push({
      id: `D-${formatDateKey(date)}`,
      schoolName: '씨마스고등학교',
      date: date,
      dateKey: formatDateKey(date),
      dayOfWeek: getKoreanDayOfWeek(date),
      mealType: '석식',
      title: dinnerTitles[index],
      dishes: [
        { name: '참치마요덮밥', allergens: ['난류'], calories: 450, nutrition: { carbs: 60, protein: 15, fat: 15 } },
        { name: '유부장국', allergens: ['대두'], calories: 80, nutrition: { carbs: 5, protein: 4, fat: 3 } },
        { name: '매콤떡볶이', allergens: ['밀'], calories: 140, nutrition: { carbs: 30, protein: 4, fat: 2 } },
        { name: '깍두기', allergens: [], calories: 10, nutrition: { carbs: 2, protein: 0, fat: 0 } },
        { name: '요구르트', allergens: ['우유'], calories: 40, nutrition: { carbs: 8, protein: 1, fat: 0 } },
      ],
      totalCalories: 720,
      nutrition: { carbs: 105, protein: 24, fat: 20 },
    });
  });

  return meals;
};
