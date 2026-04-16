import { Link } from 'react-router-dom';
import { 
  METHOD_TYPES, 
  METHOD_STAGES, 
  METHOD_COMPLEXITY 
} from '../constants/methodAttributes';

const MethodCard = ({ method }) => {
  // stage в metadata.json — это массив, нужно получить первый элемент
  const firstStage = Array.isArray(method.stage) ? method.stage[0] : method.stage;

const stageColors = {
  VALIDATION: 'bg-warning/10 text-warning border-warning-content',
  POSTLAUNCH: 'bg-success/10 text-success border-success-content',
  DISCOVERY: 'bg-info/10 text-info border-info-content',
  DEBUG: 'bg-error/10 text-error border-error-content',
};

  const typeIcons = {
    QUALITATIVE: '📝',
    QUANTITATIVE: '📊',
    MIXED: '🔀',
  };

  const complexityColors = {
    LOW: 'bg-base-200 text-base-content',
    MEDIUM: 'bg-base-300 text-base-content',
    HIGH: 'bg-base-200 text-base-content',
  };

  return (
    <Link to={`/method/${method.id}`} className="block group">
      <div className="bg-base-200 rounded-box p-5 hover:bg-base-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 project-card border border-base-200">
        {/* Иконка типа данных */}
        <div className="mb-3">
          <span className={`inline-flex items-center justify-center w-10 h-10 rounded-btn ${stageColors[firstStage] || 'bg-base-200 text-base-content'}`}>
            {typeIcons[method.type] || '📋'}
          </span>
        </div>

        {/* Название */}
        <h3 className="text-lg font-bold text-base-content mb-2 group-hover:text-accent transition-colors">
          {method.russianTitle || method.title || 'Метод исследования'}
        </h3>

        {/* Краткое описание */}
        <p className="text-base-content text-sm mb-4 line-clamp-2">
          {method.shortDescription || 'Метод исследования...'}
        </p>

        {/* Мета-информация */}
        <div className="flex flex-wrap gap-2 text-xs">
          <span className={`px-2 py-1 rounded-btn border ${stageColors[firstStage] || 'bg-base-200 text-base-content'}`}>
            {METHOD_STAGES[firstStage] || firstStage || '—'}
          </span>
          <span className={`px-2 py-1 rounded-btn ${complexityColors[method.complexity] || 'bg-base-200 text-base-content'}`}>
            {METHOD_COMPLEXITY[method.complexity] || method.complexity || '—'}
          </span>
          <span className="px-2 py-1 rounded-btn bg-warning/10 text-warning">
            {method.timeEstimate || '—'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MethodCard;