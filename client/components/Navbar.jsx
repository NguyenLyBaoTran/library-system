import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
      <Link href="/books">📚 Books</Link>
    </nav>
  );
}