import { useEffect, useCallback, useState } from 'react';

export const useKeyboardShortcuts = (shortcuts = {}) => {
  const [activeShortcuts, setActiveShortcuts] = useState([]);

  const handleKeyPress = useCallback((event) => {
    const { key, ctrlKey, metaKey, shiftKey, altKey } = event;
    const modifierKey = ctrlKey || metaKey;

    // Create shortcut string
    const shortcutString = [
      modifierKey && 'cmd',
      shiftKey && 'shift',
      altKey && 'alt',
      key.toLowerCase()
    ].filter(Boolean).join('+');

    // Find matching shortcut
    const matchingShortcut = Object.entries(shortcuts).find(
      ([shortcut]) => shortcut === shortcutString || shortcut === key.toLowerCase()
    );

    if (matchingShortcut) {
      event.preventDefault();
      const [shortcut, callback] = matchingShortcut;
      callback();
      
      // Show hint briefly
      setActiveShortcuts(prev => [...prev, shortcut]);
      setTimeout(() => {
        setActiveShortcuts(prev => prev.filter(s => s !== shortcut));
      }, 1500);
    }
  }, [shortcuts]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return { activeShortcuts };
};

export const useTimerShortcuts = (onStart, onStop, isRunning) => {
  return useKeyboardShortcuts({
    'cmd+s': onStart, // Ctrl+S (Windows) / Cmd+S (Mac) for Start
    'cmd+e': onStop, // Ctrl+E (Windows) / Cmd+E (Mac) for End/Stop
    'cmd+t': () => isRunning ? onStop() : onStart(), // Ctrl+T / Cmd+T for Timer toggle
  });
};