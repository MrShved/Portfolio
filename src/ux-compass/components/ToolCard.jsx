import { Link } from 'react-router-dom';

const ToolCard = ({ tool }) => {
  return (
    <Link to={`/tool/${tool.id}`} className="block group">
      <div className="bg-base-200 rounded-box p-5 hover:bg-base-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 project-card border border-stone-200">
        {/* Название */}
        <h3 className="text-lg font-bold text-base-content mb-2 group-hover:text-primary transition-colors">
          {tool.name}
        </h3>

        {/* Краткое описание */}
        <p className="text-base-content text-sm mb-4 line-clamp-2">
          {tool.shortDescription || 'Инструмент визуализации...'}
        </p>

        {/* Мета-информация */}
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 rounded border bg-primary/10 text-primary">
            {tool.basedOn || '—'}
          </span>
          <span className="px-2 py-1 rounded border bg-secondary/10 text-secondary">
            {tool.forWhom || '—'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;