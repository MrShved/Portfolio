import { Link } from 'react-router-dom';

const ProjectCard = ({ title, description, tags, image, link, featured }) => {
  const isBigLeft = featured === 'big-left';
  const isSmallTop = featured === 'small-top';
  const isSmallBottom = featured === 'small-bottom';

  return (
    <div className={`bg-base-200 rounded-box overflow-hidden transition-all duration-300 hover:shadow-lg ${isBigLeft ? 'md:row-span-2 md:col-span-1 h-full' : ''} project-card opacity-0 translate-y-4 transition-all duration-500 border border-base-200`}>
      <div className="w-full h-full">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="bg-base-300 w-full h-full flex items-center justify-center text-base-content">
            {title}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-base-content mb-1 hover:text-orange-500 transition-colors">{title}</h3>
        <p className="text-base-content text-sm mb-2">{description}</p>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <span key={index} className="text-xs bg-orange-500/10 text-orange-600 px-2 py-1 rounded hover:bg-orange-500/20 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

