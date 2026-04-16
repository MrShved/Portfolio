import { useState } from 'react';
import { allMethods } from '../../../data/methods';

const FilterBar = ({ 
  filteredMethods,
  onSearchChange,
  onStageChange,
  onTypeChange,
  onGoalChange,
  onAccessChange,
  onBudgetChange,
  onMaxDaysChange,
  onComplexityChange,
}) => {
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedGoal, setSelectedGoal] = useState('all');
  const [selectedAccess, setSelectedAccess] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [selectedMaxDays, setSelectedMaxDays] = useState('all');
  const [selectedComplexity, setSelectedComplexity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Переводы для фильтров
  const stageTranslations = {
    'all': 'Все этапы',
    'discovery': 'Поиск / Идея',
    'validation': 'Проверка / Прототип',
    'postlaunch': 'Работающий продукт',
  };
  const typeTranslations = {
    'all': 'Все типы',
    'qualitative': 'Качественный',
    'quantitative': 'Количественный',
    'mixed': 'Смешанный',
  };
  const goalTranslations = {
    'all': 'Все цели',
    'explore': 'Понять боли и потребности',
    'evaluate': 'Оценить удобство',
    'compare': 'Сравнить варианты',
    'observe': 'Наблюдать за поведением',
    'segment': 'Изучить аудиторию',
    'debug': 'Найти причину проблем',
    'understand': 'Понять контекст использования',
    'measure': 'Измерить показатели',
    'optimize': 'Улучшить опыт',
    'recommend': 'Предложить решения',
    'structure': 'Организовать данные',
    'validate': 'Подтвердить гипотезу',
    'quick-validate': 'Быстрая проверка',
    'map': 'Построить карту',
  };
  const accessTranslations = {
    'all': 'Все',
    'own': 'Свои пользователи',
    'panel': 'Платная панель',
    'hard': 'Сложно достать',
    'internal': 'Только команда',
    'public': 'Открытая панель',
  };
  const budgetTranslations = {
    'all': 'Все',
    'zero': 'Бесплатно',
    'low': 'Низкий (до 10 000 ₽)',
    'mid': 'Средний (до 50 000 ₽)',
    'high': 'Высокий (> 50 000 ₽)',
  };
  const maxDaysOptions = [
    { value: 'all', label: 'Все сроки' },
    { value: '0-7', label: 'до 1 недели' },
    { value: '0-14', label: '1-2 недели' },
    { value: '0-21', label: '1-3 недели' },
    { value: '0-30', label: '3-4 недели' },
    { value: '30+', label: '1+ месяц' },
  ];
  const complexityTranslations = {
    'all': 'Все',
    'low': 'Низкая',
    'medium': 'Средняя',
    'high': 'Высокая',
  };

  // Обработчик поиска
  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearchOpen(true);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const queryLower = query.toLowerCase();
    const results = allMethods.filter((method) => {
      const title = (method.russianTitle || method.title || '').toLowerCase();
      const desc = (method.shortDescription || '').toLowerCase();
      const tags = (method.tags || []).map(t => t.toLowerCase());

      return title.includes(queryLower) ||
             desc.includes(queryLower) ||
             tags.some(tag => tag.includes(queryLower));
    });

    setSearchResults(results);
  };

  // Обработчик клика по методу в поиске
  const handleSearchResultClick = (method) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    onSearchChange?.('');

    // Переключение на вкладку методов и переход к странице метода
    window.location.href = `/methods/${method.id}`;
  };

  return (
    <div className="bg-base-200 rounded-box p-4 mb-6 border border-base-300">
      {/* Поиск */}
      <div className="mb-4 relative">
        <label className={`input input-bordered input-lg input-search w-full bg-base-100 border border-base-300 rounded-box focus:outline-none focus:border-orange-500 transition-colors ${isSearchOpen ? 'focus' : ''}`}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            className="h-[1em] opacity-50 stroke-current"
          >
            <circle cx="11" cy="11" r="8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"></circle>
            <path d="m21 21-4.3-4.3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"></path>
          </svg>
          <input 
            type="search" 
            placeholder="Поиск методов..." 
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            className="w-full"
          />
        </label>

        {/* Выпадающий список результатов поиска */}
        {isSearchOpen && searchResults.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-base-100 border border-base-300 rounded-box shadow-lg max-h-64 overflow-y-auto">
            {searchResults.map((method) => {
              const title = method.russianTitle || method.title || 'Метод исследования';
              const description = method.shortDescription || '';

              return (
                <li key={method.id}>
                  <a 
                    href={`#/methods/${method.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSearchResultClick(method);
                    }}
                    className="block px-4 py-3 hover:bg-base-200 cursor-pointer"
                  >
                    <div className="font-semibold text-base-content">{title}</div>
                    <div className="text-sm text-base-content/60 mt-1 line-clamp-2">{description}</div>
                  </a>
                </li>
              );
            })}
          </ul>
        )}

        {/* Сообщение "Ничего не найдено" */}
        {isSearchOpen && searchResults.length === 0 && searchQuery.trim() && (
          <div className="absolute z-10 w-full mt-1 bg-base-100 border border-base-300 rounded-box shadow-lg">
            <div className="px-4 py-3 text-center text-base-content/60">
              Ничего не найдено
            </div>
          </div>
        )}
      </div>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-2">
        {/* Этап */}
        <div className="dropdown dropdown-end w-48">
          <div tabIndex={0} role="button" className="btn btn-sm rounded-btn">
            Этап ▼
          </div>
          <ul tabindex="-1" className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow-sm">
            {['all', 'discovery', 'validation', 'postlaunch'].map((stage) => (
              <li key={stage}>
                <a 
                  onClick={() => onStageChange?.(stage)}
                  className={`cursor-pointer ${selectedStage === stage ? 'active' : ''}`}
                >
                  {stageTranslations[stage]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Тип данных */}
        <div className="dropdown dropdown-end w-48">
          <div tabIndex={0} role="button" className="btn btn-sm rounded-btn">
            Тип ▼
          </div>
          <ul tabindex="-1" className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow-sm">
            {['all', 'qualitative', 'quantitative', 'mixed'].map((type) => (
              <li key={type}>
                <a 
                  onClick={() => onTypeChange?.(type)}
                  className={`cursor-pointer ${selectedType === type ? 'active' : ''}`}
                >
                  {typeTranslations[type]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Цель */}
        <div className="dropdown dropdown-end w-48">
          <div tabIndex={0} role="button" className="btn btn-sm rounded-btn">
            Цель ▼
          </div>
          <ul tabindex="-1" className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow-sm max-h-48 overflow-y-auto">
            {['all', 'explore', 'evaluate', 'compare', 'observe', 'segment', 'debug', 'understand', 'measure', 'optimize', 'recommend', 'structure', 'validate', 'quick-validate', 'map'].map((goal) => (
              <li key={goal}>
                <a 
                  onClick={() => onGoalChange?.(goal)}
                  className={`cursor-pointer ${selectedGoal === goal ? 'active' : ''}`}
                >
                  {goalTranslations[goal]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Доступ */}
        <div className="dropdown dropdown-end w-48">
          <div tabIndex={0} role="button" className="btn btn-sm rounded-btn">
            Доступ ▼
          </div>
          <ul tabindex="-1" className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow-sm">
            {['all', 'own', 'panel', 'hard', 'internal', 'public'].map((access) => (
              <li key={access}>
                <a 
                  onClick={() => onAccessChange?.(access)}
                  className={`cursor-pointer ${selectedAccess === access ? 'active' : ''}`}
                >
                  {accessTranslations[access]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Бюджет */}
        <div className="dropdown dropdown-end w-48">
          <div tabIndex={0} role="button" className="btn btn-sm rounded-btn">
            Бюджет ▼
          </div>
          <ul tabindex="-1" className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow-sm">
            {['all', 'zero', 'low', 'mid', 'high'].map((budget) => (
              <li key={budget}>
                <a 
                  onClick={() => onBudgetChange?.(budget)}
                  className={`cursor-pointer ${selectedBudget === budget ? 'active' : ''}`}
                >
                  {budgetTranslations[budget]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Сроки */}
        <div className="dropdown dropdown-end w-48">
          <div tabIndex={0} role="button" className="btn btn-sm rounded-btn">
            Сроки ▼
          </div>
          <ul tabindex="-1" className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow-sm">
            {maxDaysOptions.map((option) => (
              <li key={option.value}>
                <a 
                  onClick={() => onMaxDaysChange?.(option.value)}
                  className={`cursor-pointer ${selectedMaxDays === option.value ? 'active' : ''}`}
                >
                  {option.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Сложность */}
        <div className="dropdown dropdown-end w-48">
          <div tabIndex={0} role="button" className="btn btn-sm rounded-btn">
            Сложность ▼
          </div>
          <ul tabindex="-1" className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow-sm">
            {['all', 'low', 'medium', 'high'].map((complexity) => (
              <li key={complexity}>
                <a 
                  onClick={() => onComplexityChange?.(complexity)}
                  className={`cursor-pointer ${selectedComplexity === complexity ? 'active' : ''}`}
                >
                  {complexityTranslations[complexity]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;