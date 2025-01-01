import React from 'react'
import { CoursePart } from '../App';

interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.kind) {
    case "basic":
      return (
        <div>
          <p style={{ fontWeight: "bold"}}>{part.name} {part.exerciseCount}</p>
          <p>{part.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <p style={{ fontWeight: "bold"}}>{part.name} {part.exerciseCount}</p>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <p style={{ fontWeight: "bold"}}>{part.name} {part.exerciseCount}</p>
          <p>{part.description}</p>
          <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
        </div>
      );
    case "special":
      return (
        <div>
          <p style={{ fontWeight: "bold"}}>{part.name} {part.exerciseCount}</p>
          <p>{part.description}</p>
          <p>required skills: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;