import React from 'react';
import Image from 'next/image';

interface ProjectItemProps {
  title: string;
  content: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  imageLink?: string;
  dataVavilonTitle?: string;
  dataVavilonContent?: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  content,
  imageSrc,
  imageAlt,
  imageLink,
  dataVavilonTitle,
  dataVavilonContent,
}) => {
  // The parent div will control the size and aspect ratio for the Image with fill
  const ImageDisplay = (
    <div className="relative w-full h-48 md:h-64 rounded overflow-hidden"> {/* Example height, adjust as needed or use aspect-ratio */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        style={{ objectFit: 'cover' }}
        className="rounded" // Ensure rounded corners are applied if not by parent
      />
    </div>
  );

  return (
    <article className="border-t-[3px] border-brand-gray-extralight mb-9 pt-9 first:border-t-0 first:pt-0 md:flex md:items-start">
      {/* This div acts as the container for the image, controlling its width in the flex layout */}
      <div className="image-container md:w-1/2 md:pr-4 mb-4 md:mb-0">
        {imageLink ? (
          <a href={imageLink} target="_blank" rel="noopener noreferrer" className="block border-0">
            {ImageDisplay}
          </a>
        ) : (
          // If not a link, the div itself can carry the rounded class if Image doesn't
          // but Image with fill and className="rounded" should work.
          ImageDisplay
        )}
      </div>
      <div className="inner md:w-1/2 md:pl-4 [&_>:last-child]:mb-0">
        <h4 className="text-xl text-brand-gray-dark font-bold mb-2" data-vavilon={dataVavilonTitle}>
          {title}
        </h4>
        <div className="text-sm" data-vavilon={dataVavilonContent}>
          {content}
        </div>
      </div>
    </article>
  );
};

const Projects: React.FC = () => {
  const projectData: ProjectItemProps[] = [
    {
      title: "Coaching Elite Swimmers",
      content: <p>Between 2009 and 2021.</p>,
      imageSrc: "/images/pic01.jpg",
      imageAlt: "Coaching Elite Swimmers",
      dataVavilonTitle: "projects-elite-swimmers-title",
      dataVavilonContent: "projects-elite-swimmers-content",
    },
    {
      title: "Rwanda Epic",
      content: <p>Novembre 2023</p>,
      imageSrc: "/images/rwanda1.jpg",
      imageAlt: "Rwanda Epic",
      imageLink: "https://www.rwandanepic.com/",
      dataVavilonTitle: "projects-rwanda-title",
      dataVavilonContent: "projects-rwanda-content",
    },
    {
      title: "QLX",
      content: <p>Coach at <a href="https://www.QLXNOW.com/" rel="noopener noreferrer" target="_blank" className="text-brand-red hover:text-red-700 border-b border-brand-red hover:border-transparent">QLXNOW.com</a></p>,
      imageSrc: "/images/qlxnow.png",
      imageAlt: "qlxnow",
      imageLink: "https:/qlxnow.com", // Note: Original HTML had "https:/qlxnow.com", might be typo for "https://qlxnow.com"
      dataVavilonContent: "projects-qlx-content",
    },
    {
      title: "Training Plans",
      content: <p>Swimming and running plans available on <a href="https://www.trainingpeaks.com/coach/pellegrims#trainingplans" rel="noopener noreferrer" target="_blank" className="text-brand-red hover:text-red-700 border-b border-brand-red hover:border-transparent">TrainingPeaks.com</a></p>,
      imageSrc: "/images/Trainingpeaks logo.png",
      imageAlt: "Training Plans",
      imageLink: "https://www.trainingpeaks.com/coach/pellegrims#trainingplans",
      dataVavilonTitle: "projects-plans-title",
      dataVavilonContent: "projects-plans-content",
    },
    {
      title: "Start 2 Swim",
      content: <p>Company group sessions 2024</p>,
      imageSrc: "/images/rgf.jpg",
      imageAlt: "RGF Staffing",
      dataVavilonTitle: "projects-rgf-title",
      dataVavilonContent: "projects-rgf-content",
    },
    {
      title: "Training camps",
      content: <p>On request - minimum 6 athletes</p>,
      imageSrc: "/images/pic03.jpg",
      imageAlt: "Training camps",
      dataVavilonTitle: "projects-camps-title",
      dataVavilonContent: "projects-camps-content",
    },
    {
      title: "Roc Du Maroc",
      content: <p>Octobre 2022</p>,
      imageSrc: "/images/rdmlogo.png",
      imageAlt: "Roc Du Maroc",
      imageLink: "https://www.rocdumaroc.com/",
      dataVavilonTitle: "projects-rdm2022-title",
      dataVavilonContent: "projects-rdm2022-content",
    },
    {
      title: "Gramchallenge",
      content: <p>Working as physical and mental coach at <a href="https://www.gramchallenge.com/" rel="noopener noreferrer" target="_blank" className="text-brand-red hover:text-red-700 border-b border-brand-red hover:border-transparent">Gramchallenge.com</a> between 2020 &amp; 2024</p>,
      imageSrc: "/images/pic02.jpg",
      imageAlt: "Gramchallenge",
      imageLink: "https://gramchallenge.com",
      dataVavilonContent: "projects-gram-content",
    },
  ];

  return (
    <section id="projects" className="border-t-[6px] border-brand-gray-extralight py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <h3 className="text-3xl text-brand-gray-dark font-bold mb-4 text-center md:text-left" data-vavilon="projects-title">
          {/* This title can also be translated if keys are added to common.json */}
          Projects
        </h3>
        <p className="mb-10 text-center md:text-left" data-vavilon="projects-intro">
          {/* This intro can also be translated */}
          These are the most important projects I&apos;ve been working in the past, now, and in the future
        </p>
        <div className="features">
          {projectData.map((project, index) => (
            <ProjectItem key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
