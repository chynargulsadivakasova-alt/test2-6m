import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export const useSelectedStore = create(
    persist(
      (set) => ({
        selectedTasks: [],
        addTask: (task) =>
          set((state) => {
            const isAlreadyAdded = state.selectedTasks.some(
              (item) => item.id === task.id
            );
            if (isAlreadyAdded) return state;
  
            return {
              selectedTasks: [...state.selectedTasks, task],
            };
          }),
  
        removeTask: (id) =>
          set((state) => ({
            selectedTasks: state.selectedTasks.filter((task) => task.id !== id),
          })),
  
        clearAll: () => set({ selectedTasks: [] }),
      }),
      {
        name: 'freelance-selected-orders', 
      }
    )
  );