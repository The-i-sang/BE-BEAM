export default function Toolkit() {
  const categories = ["All", "Work", "Life"];
  return (
    <div>
      <ul>
        {categories.map((category) => {
          return <li>{category}</li>;
        })}
      </ul>
    </div>
  );
}
