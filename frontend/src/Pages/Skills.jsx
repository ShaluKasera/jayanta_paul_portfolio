import React from 'react'

const SkillItem = ({ title, items }) => {
  return (
    <div className="mb-4 text-left">
      <p className="font-semibold">{title}:</p>
      <p className="ml-2 font-light">{items.join(', ')}</p>
    </div>
  );
};

const Skills = () => {
  const skills = [
    {
      title: 'Programming Languages',
      items: ['Python', 'PyTorch', 'TensorFlow', 'C'],
    },
    {
      title: 'Subjects',
      items: [
        'Machine learning',
        'Deep learning',
        'NLP',
        'Computer Networking',
        'Operating System',
        'Database Management System',
      ],
    },
  ];

  return (
    <div>
      <p className='text-left text-2xl font-mono'>
        Skills
      </p>
      <div className='bgblue  w-full h-[2px] mb-2'></div>

      {skills.map((skill, index) => (
        <SkillItem className='text-left' key={index} title={skill.title} items={skill.items} />
      ))}
    </div>
  )
}

export default Skills
