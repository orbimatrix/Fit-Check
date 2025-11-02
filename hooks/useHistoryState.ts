/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { useState, useCallback } from 'react';

/**
 * A custom hook to manage state history for undo/redo functionality.
 * @param initialState The initial state.
 * @returns An object with the current state and functions to manipulate the history.
 */
export const useHistoryState = <T>(initialState: T) => {
  const [history, setHistory] = useState<T[]>([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const state = history[currentIndex];
  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const setState = useCallback((newState: T | ((prevState: T) => T)) => {
    setHistory(prevHistory => {
      const resolvedState = typeof newState === 'function' 
        ? (newState as (prevState: T) => T)(prevHistory[currentIndex]) 
        : newState;

      if (JSON.stringify(resolvedState) === JSON.stringify(prevHistory[currentIndex])) {
          return prevHistory;
      }

      const newHistory = prevHistory.slice(0, currentIndex + 1);
      return [...newHistory, resolvedState];
    });
    setCurrentIndex(prevIndex => prevIndex + 1);
  }, [currentIndex]);

  const undo = useCallback(() => {
    if (canUndo) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  }, [canUndo]);

  const redo = useCallback(() => {
    if (canRedo) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  }, [canRedo]);
  
  const resetState = useCallback((newState: T) => {
    setHistory([newState]);
    setCurrentIndex(0);
  }, []);

  return {
    state,
    setState,
    undo,
    redo,
    canUndo,
    canRedo,
    resetState,
  };
};
