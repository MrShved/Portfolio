import { useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

const Home = () => {
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

    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  // Separate featured and regular projects
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-base-content">Продуктовый дизайнер</h1>
        <p className="text-xl text-base-content max-w-2xl mx-auto">Создаю интуитивно понятные цифровые продукты благодаря продуманному дизайну и пользовательскому подходу.</p>
      </section>

      {/* Featured Projects */}
      <section className="pb-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-base-content">Избранные проекты</h2>

          
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] md:gap-6 md:h-full">
            {featuredProjects.map((project, index) => (
              <ProjectCard 
                key={index}
                title={project.title}
                description={project.description}
                tags={project.tags}
                image={project.image}
                link={project.link}

                
                featured={index === 0 ? 'big-left' : (index === 1 ? 'small-top' : 'small-bottom')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Other Projects */}
      <section className="pb-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-base-content">Другие проекты</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherProjects.map((project, index) => (
              <ProjectCard 
                key={index}
                title={project.title}
                description={project.description}
                tags={project.tags}
                image={project.image}
                link={project.link}
                featured={false}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

