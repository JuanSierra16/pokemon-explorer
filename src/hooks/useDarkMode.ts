import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Verificar si hay una preferencia guardada
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    // Si no hay preferencia guardada, usar la preferencia del sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Aplicar cambios inmediatamente
    if (isDark) {
      root.classList.remove('light');
      root.classList.add('dark');
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      console.log('🌙 Modo oscuro activado');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      console.log('☀️ Modo claro activado');
    }
    
    // Guardar la preferencia en localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDark));
    
    // Log detallado para debugging
    console.log('📋 Estado actual:');
    console.log('  - isDark:', isDark);
    console.log('  - html classes:', root.className);
    console.log('  - body classes:', document.body.className);
  }, [isDark]);

  // Efecto para configurar el estado inicial al montar
  useEffect(() => {
    const root = document.documentElement;
    
    // Asegurar que el estado inicial esté correcto
    if (isDark && !root.classList.contains('dark')) {
      root.classList.add('dark');
      root.classList.remove('light');
      console.log('Estado inicial: configurando modo oscuro');
    } else if (!isDark && root.classList.contains('dark')) {
      root.classList.remove('dark');
      root.classList.add('light');
      console.log('Estado inicial: configurando modo claro');
    }
  }, [isDark]); // Dependencia de isDark para que se ejecute cuando cambie

  const toggleDarkMode = () => {
    console.log('Toggling dark mode from', isDark, 'to', !isDark);
    setIsDark(!isDark);
  };

  return { isDark, toggleDarkMode };
}
