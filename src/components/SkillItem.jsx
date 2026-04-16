const SkillItem = ({ name, level, comment }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-base-content font-medium">{name}</span>
        <span className="text-base-content/60 text-sm">{level}/10</span>
      </div>
      <div className="h-2 bg-base-300 rounded-full overflow-hidden mb-1">
        <div 
          className="h-full bg-orange-400 rounded-full" 
          style={{ width: `${level * 10}%` }}
        ></div>
      </div>
      <p className="text-base-content/60 text-sm">{comment}</p>
    </div>
  );
};

export default SkillItem;

