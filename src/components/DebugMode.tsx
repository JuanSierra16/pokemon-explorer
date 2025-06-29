import { useDarkMode } from '../hooks/useDarkMode';

export default function DebugMode() {
  const { isDark } = useDarkMode();
  
  const htmlClasses = document.documentElement.className;
  const bodyClasses = document.body.className;
  
  return (
    <div className="fixed top-2 left-2 bg-yellow-200 dark:bg-yellow-800 text-black dark:text-white p-2 rounded text-xs z-50 opacity-80">
      <div>Dark Mode: {isDark ? 'ON' : 'OFF'}</div>
      <div>HTML Classes: {htmlClasses || 'none'}</div>
      <div>Body Classes: {bodyClasses || 'none'}</div>
    </div>
  );
}
