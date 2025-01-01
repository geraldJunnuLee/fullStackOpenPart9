import React from 'react';

import { CoursePart } from '../App';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map((part, i) => (
        <Part key={i} part={part} />
      ))}
    </>
  );
};

export default Content;