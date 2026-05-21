export function getTodayKST(): Date {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (9 * 3600000));
}

export function formatKoreanDate(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = getKoreanDayOfWeek(date);
  return `${month}월 ${day}일 ${dayOfWeek}요일`;
}

export function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

export function getKoreanDayOfWeek(date: Date): string {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[date.getDay()];
}

export function getWeekDates(date: Date): Date[] {
  const currentDay = date.getDay();
  const distToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  
  const monday = new Date(date.getTime());
  monday.setDate(date.getDate() + distToMonday);
  monday.setHours(0, 0, 0, 0);

  const week = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday.getTime());
    d.setDate(monday.getDate() + i);
    week.push(d);
  }
  return week;
}

export function getWeekOfMonth(date: Date): { month: number, week: number } {
  const currentMonth = date.getMonth() + 1;
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayWeekday = firstDayOfMonth.getDay(); 
  
  const offset = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1; 
  const MathWeek = Math.ceil((date.getDate() + offset) / 7);
  
  return { month: currentMonth, week: MathWeek };
}

export function getDefaultSelectedDate(date: Date): Date {
  const day = date.getDay();
  const newDate = new Date(date.getTime());
  if (day === 0) { // Sunday -> get next Monday
    newDate.setDate(date.getDate() + 1);
  } else if (day === 6) { // Saturday -> get next Monday
    newDate.setDate(date.getDate() + 2);
  }
  return newDate;
}
