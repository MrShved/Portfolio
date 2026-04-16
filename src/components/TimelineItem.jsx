const TimelineItem = ({ year, company, role, description }) => {
  return (
    <div className="flex flex-col md:flex-row items-start mb-6">
      <div className="md:w-1/4 mb-2 md:mb-0">
        <div className="text-orange-500 font-bold">{year}</div>
        <div className="text-base-content font-bold mt-1">{company}</div>
        <div className="text-teal-500 text-sm mt-0.5">{role}</div>
      </div>
      <div className="flex-1 md:border-l border-base-200 pl-4 md:pl-6">
        <div className="text-base-content text-sm space-y-2">
          {description.map((item, idx) => (
            <div key={idx}>
              <h4 className="text-base-content font-semibold mb-1">{item.title}</h4>
              <p className="text-base-content">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
