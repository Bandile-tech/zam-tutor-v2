const subjects = ["Math", "Physics", "Chemistry", "Biology", "English"];

const SubjectSelector = ({ onSelect }) => (
  <section className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
    {subjects.map((sub) => (
      <div
        key={sub}
        onClick={() => onSelect(sub)}
        className="cursor-pointer p-4 text-center rounded-lg shadow-md bg-gradient-to-r from-primary to-accent text-white font-bold hover:scale-105 transition transform"
      >
        {sub}
      </div>
    ))}
  </section>
);

export default SubjectSelector;