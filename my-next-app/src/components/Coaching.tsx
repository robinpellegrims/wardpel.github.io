import React from 'react';

// Placeholder for FontAwesome icons if you decide to use them
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt, faBiking, faVideo, faMedal, faSwimmer, faSun } from '@fortawesome/free-solid-svg-icons';

interface FeatureIconProps {
  // icon: any; // FontAwesomeIconProp
  text: string;
  dataVavilon: string;
}

const FeatureIcon: React.FC<FeatureIconProps> = ({ text, dataVavilon }) => {
  return (
    <li
      className="flex items-start mb-7 w-full sm:w-[48%] lg:w-[30%]" // Adjusted width for more flexible grid, using flex for alignment
      data-vavilon={dataVavilon}
    >
      {/* Placeholder for icon based on li:before styling from main.css */}
      <span className="flex-shrink-0 bg-brand-red rounded-full text-white h-10 w-10 flex items-center justify-center mr-4 mt-1">
        {/* <FontAwesomeIcon icon={icon} /> */}
        {/* SVG or other icon placeholder */}
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"></path></svg>
      </span>
      <span className="flex-1">{text}</span>
    </li>
  );
};

const Coaching: React.FC = () => {
  const features = [
    { text: "Online swimming programs", dataVavilon: "personal-coaching-swimming-training" /*icon: faCalendarAlt*/ },
    { text: "Online triathlon programs", dataVavilon: "personal-coaching-triathlon-training" /*icon: faBiking*/ },
    { text: "Swimming technique", dataVavilon: "personal-coaching-swimming-technique" /*icon: faVideo*/ },
    { text: "Swimming technique for clubs", dataVavilon: "personal-coaching-swimming-technique-clubs" /*icon: faMedal*/ },
    { text: "Start 2 swim for companies", dataVavilon: "personal-coaching-adults" /*icon: faSwimmer*/ },
    { text: "Training camps", dataVavilon: "personal-coaching-training-camp" /*icon: faSun*/ },
  ];

  return (
    <section id="personal-coaching" className="border-t-[6px] border-brand-gray-extralight py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <h3 className="text-3xl text-brand-gray-dark font-bold mb-4 text-center md:text-left" data-vavilon="personal-coaching-title">
          Coaching
        </h3>
        <p className="mb-10 text-center md:text-left" data-vavilon="personal-coaching-intro">
          I can help you with the following aspects in order to make you a better athlete
        </p>
        {/* ul.feature-icons styles */}
        <ul className="list-none p-0 flex flex-wrap justify-between"> {/* Using flex-wrap for a grid-like layout */}
          {features.map((feature) => (
            <FeatureIcon key={feature.dataVavilon} text={feature.text} dataVavilon={feature.dataVavilon} /*icon={feature.icon}*/ />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Coaching;
