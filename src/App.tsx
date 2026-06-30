/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Members } from './components/Members';
import { Trainers } from './components/Trainers';
import { Classes } from './components/Classes';
import { Subscriptions } from './components/Subscriptions';
import { Bookings } from './components/Bookings';
import { WorkoutPlans } from './components/WorkoutPlans';
import { Nutrition } from './components/Nutrition';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';
import { Attendance, Notifications, PlaceholderPage } from './components/OtherPages';
import { Enquiries } from './components/Enquiries';
import { Finances } from './components/Finances';
import { Auth } from './components/Auth';
import { Kiosk } from './components/Kiosk';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [activeView, setActiveView] = useState('Dashboard');
  const [isKioskMode, setIsKioskMode] = useState(false);

  const handleLogin = (role: string) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setActiveView('Dashboard');
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  if (isKioskMode) {
    return <Kiosk onExit={() => setIsKioskMode(false)} />;
  }

  const renderView = () => {
    switch(activeView) {
      case 'Dashboard': return <Dashboard />;
      case 'Enquiries': return <Enquiries />;
      case 'Members': return <Members />;
      case 'Trainers': return <Trainers />;
      case 'Classes': return <Classes />;
      case 'Bookings': return <Bookings />;
      case 'Subscriptions': return <Subscriptions />;
      case 'Finances & Payroll': return <Finances />;
      case 'Attendance': return <Attendance />;
      case 'Workout Plans': return <WorkoutPlans />;
      case 'Nutrition': return <Nutrition />;
      case 'Reports': return <Reports />;
      case 'Notifications': return <Notifications />;
      case 'Settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050505] font-sans selection:bg-red-500/30">
      <Sidebar activeItem={activeView} setActiveItem={setActiveView} />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <Header title={activeView} onLogout={handleLogout} onKioskMode={() => setIsKioskMode(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
