import { useEffect } from 'react';
import SkillItem from '../components/SkillItem';
import TimelineItem from '../components/TimelineItem';
import { skills } from '../data/skills';
import { timeline } from '../data/timeline';

const About = () => {
  useEffect(() => {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.about-card');
    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-base-100 text-base-content py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* About Section */}
        <section className="mb-16 about-card opacity-0 translate-y-4 transition-all duration-500 delay-100">
          <h2 className="text-3xl font-bold text-base-content mb-6">Обо мне</h2>
          <p className="text-base-content mb-4 leading-relaxed">
            Я продуктовый дизайнер с увлечением создания значимых цифровых продуктов. Мой путь в дизайне начался с любопытства о том, как люди взаимодействуют с технологиями, что привело меня к исследованию пересечения пользовательского опыта и визуального дизайна.
          </p>
          <p className="text-base-content mb-4 leading-relaxed">
            Имея более 5 лет опыта работы в различных отраслях, я заложил прочный фундамент в области дизайн-систем, прототипирования и совместных процессов. Мой подход сочетает стратегическое мышление с эстетическим совершенством для решения сложных задач.
          </p>
          <p className="text-base-content leading-relaxed">
            Когда я не занимаюсь дизайном, вы можете найти меня изучающим новые инструменты дизайна, участвующим в open-source проектах или ходящим в походы по горам.
          </p>
        </section>

        {/* Skills Section */}
        <section className="mb-16 about-card opacity-0 translate-y-4 transition-all duration-500 delay-200">
          <h2 className="text-3xl font-bold text-base-content mb-6">Навыки</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((category, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold text-orange-500 mb-4">{category.name}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillItem 
                      key={skillIndex}
                      name={skill.name}
                      level={skill.level}
                      comment={skill.comment}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="about-card opacity-0 translate-y-4 transition-all duration-500 delay-300">
          <h2 className="text-3xl font-bold text-base-content mb-6">Опыт</h2>
          <div className="border-l border-base-200 pl-4">
            {timeline.map((item, index) => (
              <TimelineItem 
                key={index}
                year={item.year}
                company={item.company}
                role={item.role}
                description={item.description}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

