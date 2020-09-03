import Link from "next/link";

const people = [
  { vehicle: "car", name: "Larhyssa", id: 1 },
  { vehicle: "bike", name: "Luique", id: 2 },
  { vehicle: "boat", name: "Elizabeth", id: 3 },
];

export default function navigation() {
  return (
    <>
      <nav className="menu">
        <Link href="/">
          <a>Home</a>
        </Link>
      </nav>

      <ul className="sub-menu">
        {people.map((el) => (
          <li key={el.id}>
            <Link as={`/${el.vehicle}/${el.name}`} href="/[vehicle]/[person]">
              <a>
                Visit {el.name}'s {el.vehicle}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
