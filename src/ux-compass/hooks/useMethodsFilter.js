import { useMemo } from 'react';
import { all } from '../../../data/methods';

export const useMethodsFilter = ({
  searchQuery,
  selectedStage,
  selectedType,
  selectedGoal,
  selectedAccess,
  selectedBudget,
  selectedMaxDays,
  selectedComplexity,
}) => {
  return useMemo(() => {
    return all.filter((method) => {
      // Поиск по названию и описанию
      const searchLower = searchQuery.toLowerCase();
      if (searchLower) {
        const name = (method.russianTitle || method.title || '').toLowerCase();
        const desc = (method.shortDescription || '').toLowerCase();
        if (!name.includes(searchLower) && !desc.includes(searchLower)) {
          return false;
        }
      }

      // Фильтр по этапу
      if (selectedStage !== 'all') {
        const methodStages = Array.isArray(method.stage) ? method.stage : [method.stage];
        if (!methodStages.includes(selectedStage)) {
          return false;
        }
      }

      // Фильтр по типу
      if (selectedType !== 'all') {
        if (method.type !== selectedType) {
          return false;
        }
      }

      // Фильтр по цели
      if (selectedGoal !== 'all') {
        const methodGoals = Array.isArray(method.goal) ? method.goal : [method.goal];
        if (!methodGoals.includes(selectedGoal)) {
          return false;
        }
      }

      // Фильтр по доступу
      if (selectedAccess !== 'all') {
        const methodAccesses = Array.isArray(method.access) ? method.access : [method.access];
        if (!methodAccesses.includes(selectedAccess)) {
          return false;
        }
      }

      // Фильтр по бюджету
      if (selectedBudget !== 'all') {
        if (method.budget !== selectedBudget) {
          return false;
        }
      }

      // Фильтр по срокам
      if (selectedMaxDays !== 'all') {
        const maxDaysVal = method.maxDays || 0;
        
        if (selectedMaxDays === '0-7') {
          if (maxDaysVal > 7) return false;
        } else if (selectedMaxDays === '0-14') {
          if (maxDaysVal > 14) return false;
        } else if (selectedMaxDays === '0-21') {
          if (maxDaysVal > 21) return false;
        } else if (selectedMaxDays === '0-30') {
          if (maxDaysVal > 30) return false;
        } else if (selectedMaxDays === '30+') {
          if (maxDaysVal <= 30) return false;
        }
      }

      // Фильтр по сложности
      if (selectedComplexity !== 'all') {
        if (method.complexity !== selectedComplexity) {
          return false;
        }
      }

      return true;
    });
  }, [
    searchQuery,
    selectedStage,
    selectedType,
    selectedGoal,
    selectedAccess,
    selectedBudget,
    selectedMaxDays,
    selectedComplexity,
  ]);
};