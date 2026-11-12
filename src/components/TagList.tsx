export default function TagList({ items }: { items: string[] }) {
  return <ul className="tags" aria-label="Tech stack">{items.map(item => <li className="tag" key={item}>{item}</li>)}</ul>;
}
