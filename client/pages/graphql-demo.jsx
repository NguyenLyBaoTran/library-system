import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
  getAllBooks,
  borrowBook,
} from "../services/graphqlApi";

export default function GraphQLDemoPage() {
  const [books, setBooks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const data =
        await getAllBooks();

      setBooks(data || []);
    } catch (error) {
      console.log(error);

      setError(
        "Failed to fetch books"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBorrow = async (
    id
  ) => {
    try {
      await borrowBook(id);

      fetchBooks();
    } catch (error) {
      console.log(error);

      alert(
        "Borrow failed. Please login first."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF5]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Library Collection
            </h1>

            <p className="text-gray-500 mt-2">
              Browse available books using GraphQL
            </p>
          </div>

          <div className="bg-white border border-[#E2E9D1] px-5 py-3 rounded-2xl shadow-sm">
            <p className="text-sm text-gray-500">
              Total Books
            </p>

            <h2 className="text-2xl font-bold text-[#87A96B]">
              {books.length}
            </h2>
          </div>
        </div>

        {loading && (
          <div className="text-center py-20 text-gray-500">
            Loading books...
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-red-500">
            {error}
          </div>
        )}

        {!loading &&
          !error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="bg-white border border-[#E2E9D1] rounded-3xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold bg-[#EEF4E8] text-[#87A96B] px-3 py-1 rounded-full">
                      {book.category}
                    </span>

                    <span className="text-sm text-gray-400">
                      {book.year}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-800 mt-5 leading-snug">
                    {book.title}
                  </h2>

                  <p className="text-gray-500 mt-3">
                    {book.author}
                  </p>

                  <div className="mt-8">
                    {book.isAvailable ? (
                      <button
                        onClick={() =>
                          handleBorrow(
                            book.id
                          )
                        }
                        className="w-full bg-[#87A96B] hover:bg-[#76945E] text-white py-3 rounded-2xl font-semibold transition"
                      >
                        Borrow Book
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-gray-200 text-gray-500 py-3 rounded-2xl font-semibold"
                      >
                        Borrowed
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}