import React, { useState } from 'react';
import { Edit2, AlertTriangle, Bell, HelpCircle, FileText, LogOut, Plus } from 'lucide-react';
import { cn } from '../utils/cn';

export function ProfileView() {
  const [allergyAlert, setAllergyAlert] = useState(true);
  const [dailyAlert, setDailyAlert] = useState(true);

  return (
    <div className="px-container-padding space-y-lg mt-5 pb-32">
      <section className="bg-gradient-to-br from-secondary-container to-[#add463] rounded-3xl p-8 relative overflow-hidden meal-card-shadow">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/50 shadow-sm bg-white">
            <img 
               alt="Avatar" 
               className="w-full h-full object-cover" 
               src="https://lh3.googleusercontent.com/aida-public/AB6AXuBz5j4yeO2wZhyfrwKOLk-b_xxcBCG9uWDwUMwjfEH24vMJaMqSXJI6fuaYK1wYJKLD1IqnX9-W-uNwcQYAl9NKAN_eY4upCECT15QlZGNKokudjecY32xqEm2OJHW2dI0I2KFkRcKB2vdgnblYB90AdRxXZDWOy1Uu_rd1BuAw0cZNIOdZ7T6GufGjaM9TFmpyoq6XREHkyxPfwa-8jpfaxVQnGjj3444GHsWUFFXYcu0sntV69AOA5YZ9X3OAeJrCk8qsDkEZdqvA" 
            />
          </div>
          <div className="flex-1">
            <h2 className="text-[22px] font-bold text-on-primary-fixed mb-1">김학생</h2>
            <p className="text-[16px] font-medium text-on-primary-fixed/80">2학년 3반 15번</p>
          </div>
          <button className="bg-white/30 backdrop-blur-md p-3 rounded-full hover:bg-white/40 active:scale-95 transition-all">
            <Edit2 className="w-5 h-5 text-on-primary-fixed" />
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-[14px] font-bold text-on-surface-variant px-2">개인 설정</h3>
        
        <div className="bg-surface-container-lowest rounded-3xl p-6 meal-card-shadow space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-primary" />
                <span className="text-[18px] font-bold text-on-surface tracking-tight">알레르기 경고 알림</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1 pl-1">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1.5 flex items-center justify-center rounded-full text-[12px] font-bold">우유</span>
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1.5 flex items-center justify-center rounded-full text-[12px] font-bold">땅콩</span>
                <button className="bg-surface-variant text-on-surface-variant px-3 py-1.5 flex items-center justify-center rounded-full text-[12px] font-bold gap-1 active:scale-95 transition-transform">
                  <Plus className="w-3 h-3" /> 추가
                </button>
              </div>
            </div>
            <Toggle checked={allergyAlert} onChange={setAllergyAlert} />
          </div>
          
          <hr className="border-surface-variant" />
          
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Bell className="w-6 h-6 text-primary" />
                <span className="text-[18px] font-bold text-on-surface tracking-tight">일일 식단 알림</span>
              </div>
              <p className="text-[14px] font-medium text-on-surface-variant pl-1">매일 아침 8시 발송</p>
            </div>
            <Toggle checked={dailyAlert} onChange={setDailyAlert} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-[14px] font-bold text-on-surface-variant px-2 pt-2">서비스 지원</h3>
        
        <div className="bg-surface-container-lowest rounded-3xl meal-card-shadow overflow-hidden">
          <MenuRow icon={<HelpCircle className="w-5 h-5" />} label="고객센터 / 문의하기" />
          <hr className="border-surface-variant mx-5" />
          <MenuRow icon={<FileText className="w-5 h-5" />} label="이용약관" />
          <hr className="border-surface-variant mx-5" />
          <div className="w-full flex items-center justify-between p-5 hover:bg-surface-container-low transition-colors cursor-pointer group active:bg-surface-variant">
            <div className="flex items-center gap-3 text-error group-active:scale-[0.98] transition-transform">
              <LogOut className="w-5 h-5" />
              <span className="text-[16px] font-bold group-active:font-extrabold">로그아웃</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-6 text-center">
        <p className="text-[12px] font-medium text-on-surface-variant/60">© 2026 미소고등학교 급식</p>
      </footer>
    </div>
  );
}

function MenuRow({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="w-full flex items-center justify-between p-5 hover:bg-surface-container-low transition-colors cursor-pointer active:bg-surface-variant">
      <div className="flex items-center gap-3 text-on-surface-variant">
        {icon}
        <span className="text-[16px] font-medium">{label}</span>
      </div>
      <div className="w-2 h-2 border-r-2 border-t-2 border-outline rotate-45"></div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button 
      onClick={() => onChange(!checked)}
      className={cn(
        "w-[52px] h-[28px] flex items-center rounded-full p-1 transition-colors duration-300",
        checked ? "bg-primary" : "bg-outline-variant"
      )}
    >
      <div 
        className={cn(
          "w-[20px] h-[20px] bg-white rounded-full shadow-md transform transition-transform duration-300",
          checked ? "translate-x-6" : "translate-x-0"
        )} 
      />
    </button>
  );
}
