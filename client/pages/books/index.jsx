import { useEffect, useState } from 'react';
import BookCard from '../../components/BookCard';

export default function BookListPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const sampleBook = {
    id: "sample-01",
    title: "The Art of Mindful Programming",
    author: "Elena Rose",
    published_year: 2024,
    category: "Technology",
    description: "A comprehensive guide to building software with focus and clarity in a distracted world."
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBooks([sampleBook, ...data]);
        } else {
          setBooks([sampleBook]);
        }
        setLoading(false);
      })
      .catch(() => {
        setBooks([sampleBook]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDF5]">
      <header className="py-8 bg-white/60 backdrop-blur-xl border-b border-[#E2E9D1] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-[#87A96B] rounded-xl flex items-center justify-center text-white text-base font-bold shadow-lg shadow-[#87A96B]/20">
              L
            </div>
            <span className="text-lg font-serif font-black tracking-widest text-gray-800 uppercase">Archive</span>
          </div>
          
          <nav className="flex items-center space-x-8 text-xs font-black uppercase tracking-[0.2em] text-gray-400">
            <span className="text-[#87A96B] cursor-pointer">Collection</span>
            <span className="hover:text-gray-800 cursor-pointer transition-colors">Stats</span>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-20">
        <div className="mb-16 border-b border-[#E2E9D1] pb-10">
          <h2 className="text-6xl font-serif font-bold text-gray-900 tracking-tighter mb-4">Library</h2>
          <p className="text-sm text-[#A8BD75] font-semibold tracking-[0.2em] uppercase italic">Curated Digital Database</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-3 space-y-10">
            <section>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Categories</h4>
              <ul className="space-y-4 text-[13px] font-bold text-gray-500">
                <li className="flex items-center text-[#87A96B] cursor-pointer">
                  <span className="w-2 h-2 bg-[#87A96B] rounded-full mr-3"></span> All Entries
                </li>
                {['Literature', 'Technology', 'Science'].map(item => (
                  <li key={item} className="hover:text-[#87A96B] transition-colors cursor-pointer pl-5 border-l border-transparent hover:border-[#87A96B]">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </aside>

          <div className="lg:col-span-9">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4].map(n => (
                  <div key={n} className="h-56 bg-white animate-pulse rounded-2xl border border-[#E2E9D1]"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {books.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}