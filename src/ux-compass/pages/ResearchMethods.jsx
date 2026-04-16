import { useState } from 'react';
import MethodCard from '../components/MethodCard';
import ToolCard from '../components/ToolCard';
import FilterBar from '../components/FilterBar';
import { useMethodsFilter } from '../hooks/useMethodsFilter';
import methods from '../../data/methods';
import { visualizationTools } from '../../data/tools';
import { taxonomy } from '../../data/taxonomy';

const ResearchMethods = () => {
  const [activeTab, setActiveTab] = useState('methods');

  // Состояние фильтров
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedGoal, setSelectedGoal] = useState('all');
  const [selectedAccess, setSelectedAccess] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [selectedMaxDays, setSelectedMaxDays] = useState('all');
  const [selectedComplexity, setSelectedComplexity] = useState('all');

  // Используем хук фильтрации для firstTier методов
  const filteredMethods = useMethodsFilter({
    searchQuery,
    selectedStage,
    selectedType,
    selectedGoal,
    selectedAccess,
    selectedBudget,
    selectedMaxDays,
    selectedComplexity,
    echelon: 1, // Только firstTier методы
  });

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Заголовок */}
      <section className="pt-32 pb-12 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-base-content">UX Компас</h1>
        <p className="text-xl text-base-content max-w-2xl mx-auto">
          Каталог методов исследований и инструментов визуализации
        </p>
      </section>

      {/* Табы */}
      <section className="px-4 mb-8 flex justify-center">
        <div role="tablist" className="tabs tabs-box">
          <button role="tab" className={`tab ${activeTab === 'methods' ? 'tab-active text-base-content' : 'text-base-content/60'}`} onClick={() => setActiveTab('methods')}>Методы исследований</button>
          <button role="tab" className={`tab ${activeTab === 'tools' ? 'tab-active text-base-content' : 'text-base-content/60'}`} onClick={() => setActiveTab('tools')}>Инструменты визуализации</button>
          <button role="tab" className={`tab ${activeTab === 'taxonomy' ? 'tab-active text-base-content' : 'text-base-content/60'}`} onClick={() => setActiveTab('taxonomy')}>Типология</button>
        </div>
      </section>

      {/* Контент */}
      <main className="px-4 pb-20">
        <div className="container mx-auto">
          {activeTab === 'methods' && (
            <>
              <FilterBar 
                filteredMethods={filteredMethods}
                onSearchChange={setSearchQuery}
                onStageChange={setSelectedStage}
                onTypeChange={setSelectedType}
                onGoalChange={setSelectedGoal}
                onAccessChange={setSelectedAccess}
                onBudgetChange={setSelectedBudget}
                onMaxDaysChange={setSelectedMaxDays}
                onComplexityChange={setSelectedComplexity}
              />
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredMethods.map((method) => (
                    <MethodCard
                      key={method.id}
                      method={{
                        ...method,
                        name: method.russianTitle || method.title || 'Метод исследования',
                        shortDescription: method.shortDescription || 'Описание метода...',
                        stage: method.stage?.join(', ') || '—',
                        type: method.type || '—',
                        timeEstimate: `${method.minDays}–${method.maxDays} дн.`,
                        complexity: method.complexity || '—',
                      }}
                    />
                  ))}
                </div>
              </section>
            </>
          )}

          {activeTab === 'tools' && (
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visualizationTools.map((tool, index) => (
                  <ToolCard
                    key={index}
                    tool={{
                      ...tool,
                      name: tool.name || 'Инструмент',
                      shortDescription: tool.shortDescription || 'Описание инструента...',
                      basedOn: tool.basedOn || '—',
                      forWhom: tool.forWhom || '—',
                    }}
                  />
                ))}
              </div>
            </section>
          )}

          {activeTab === 'taxonomy' && (
            <section>
              <div className="space-y-6">
                {taxonomy.map((item, index) => (
                  <div
                    key={index}
                    className="bg-base-200 rounded-box p-6 project-card border border-base-300"
                  >
                    <h3 className="text-xl font-bold text-base-content mb-3">{item.name}</h3>
                    <p className="text-base-content whitespace-pre-line">{item.essence}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResearchMethods;