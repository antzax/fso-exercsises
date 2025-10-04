const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const Header = ({ name }) => <h1>{name}</h1>;

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => {
        return <Part part={part.name} exercises={part.exercises} />;
      })}
    </div>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      <b>
        Sum of exercises: {parts.reduce((sum, part) => sum + part.exercises, 0)}
      </b>
    </p>
  );
};

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);

export default Course;
