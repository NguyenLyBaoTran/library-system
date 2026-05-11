import { useEffect, useMemo, useState } from "react";

import BookCard from "../../components/BookCard";

import Navbar from "../../components/Navbar";

export default function BookListPage() {
  const [books, setBooks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  useEffect(() => {
    fetch(
      "https://library-backend-production-244f.up.railway.app/api/books"
    )
      .then((res) =>
        res.json()
      )

      .then((data) => {
        if (
          Array.isArray(data)
        ) {
          setBooks(data);
        } else {
          setBooks([]);
        }

        setLoading(false);
      })

      .catch(() => {
        setBooks([]);

        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories =
      books
        .map((book) =>
          book.category?.trim()
        )
        .filter(Boolean);

    return [
      "All",
      ...[
        ...new Set(
          uniqueCategories
        ),
      ].sort(),
    ];
  }, [books]);

  const filteredBooks =
    selectedCategory ===
    "All"
      ? books
      : books.filter(
          (book) =>
            book.category?.trim() ===
            selectedCategory
        );

  return (
    <div className="min-h-screen bg-[#FDFDF5]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
        <div className="mb-14 border-b border-[#E2E9D1] pb-10">
          <h2 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 tracking-tighter mb-4">
            Library
          </h2>

          <p className="text-xs lg:text-sm text-[#A8BD75] font-semibold tracking-[0.2em] uppercase italic">
            Curated Digital
            Database
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          <aside className="lg:col-span-3 space-y-10">
            <section>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">
                Categories
              </h4>

              <div className="flex lg:flex-col gap-3 lg:gap-4 overflow-x-auto lg:overflow-visible pb-2">

                {categories.map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() =>
                        setSelectedCategory(
                          item
                        )
                      }
                      className={`group flex items-center whitespace-nowrap text-[12px] font-bold transition-all px-4 py-3 rounded-2xl lg:rounded-none lg:px-0 lg:py-0 lg:border-l ${
                        selectedCategory ===
                        item
                          ? "bg-[#EEF4E8] text-[#87A96B] lg:bg-transparent lg:border-[#87A96B] lg:pl-5"
                          : "bg-white text-gray-500 border border-[#E2E9D1] hover:text-[#87A96B] lg:bg-transparent lg:border-transparent lg:hover:border-[#87A96B] lg:hover:pl-5"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full mr-3 transition-all ${
                          selectedCategory ===
                          item
                            ? "bg-[#87A96B]"
                            : "bg-gray-300 group-hover:bg-[#87A96B]"
                        }`}
                      ></span>

                      {item}
                    </button>
                  )
                )}

              </div>
            </section>
          </aside>

          <div className="lg:col-span-9">

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4].map(
                  (n) => (
                    <div
                      key={n}
                      className="h-56 bg-white animate-pulse rounded-2xl border border-[#E2E9D1]"
                    ></div>
                  )
                )}
              </div>
            ) : filteredBooks.length ===
              0 ? (
              <div className="bg-white border border-[#E2E9D1] rounded-3xl p-16 text-center">
                <h3 className="text-3xl font-serif font-bold text-gray-800">
                  No Books Found
                </h3>

                <p className="text-gray-500 mt-4">
                  No books available
                  in this category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filteredBooks.map(
                  (book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                    />
                  )
                )}
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}