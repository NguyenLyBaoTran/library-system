import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

export default function ComparePage() {
  const [restBooks, setRestBooks] =
    useState([]);

  const [graphqlBooks, setGraphqlBooks] =
    useState([]);

  const [restTime, setRestTime] =
    useState(0);

  const [graphqlTime, setGraphqlTime] =
    useState(0);

  const [restPayload, setRestPayload] =
    useState(0);

  const [
    graphqlPayload,
    setGraphqlPayload,
  ] = useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    await Promise.all([
      fetchRestData(),
      fetchGraphQLData(),
    ]);

    setLoading(false);
  };

  const fetchRestData = async () => {
    try {
      const start = performance.now();

      const response = await fetch(
        "https://library-backend-production-244f.up.railway.app/api/books"
      );

      const data =
        await response.json();

      const end = performance.now();

      setRestBooks(data || []);

      setRestTime(
        (end - start).toFixed(2)
      );

      setRestPayload(
        new Blob([
          JSON.stringify(data || []),
        ]).size
      );
    } catch (error) {
      console.log(error);

      setRestBooks([]);
    }
  };

  const fetchGraphQLData =
    async () => {
      try {
        const start =
          performance.now();

        const response =
          await fetch(
            "https://library-backend-production-244f.up.railway.app/graphql",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                query: `
                query {
                  getAllBooks {
                    title
                    author
                  }
                }
              `,
              }),
            }
          );

        const result =
          await response.json();

        const end =
          performance.now();

        const data =
          result?.data
            ?.getAllBooks || [];

        setGraphqlBooks(data);

        setGraphqlTime(
          (end - start).toFixed(2)
        );

        setGraphqlPayload(
          new Blob([
            JSON.stringify(data),
          ]).size
        );
      } catch (error) {
        console.log(error);

        setGraphqlBooks([]);
      }
    };

  return (
    <div className="min-h-screen bg-[#F8FAF5]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              API Comparison
            </h1>

            <p className="text-gray-500 mt-2">
              REST API vs GraphQL
              performance analysis
            </p>
          </div>

          <div className="bg-white border border-[#E2E9D1] rounded-2xl px-6 py-4 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Records
            </p>

            <h2 className="text-3xl font-bold text-[#87A96B]">
              {restBooks.length}
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">
            Loading comparison...
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div className="bg-white border border-[#E2E9D1] rounded-3xl p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                  REST API
                </h2>

                <span className="bg-[#EEF4E8] text-[#87A96B] px-4 py-2 rounded-full text-sm font-semibold">
                  Traditional
                </span>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-500">
                    Endpoint
                  </span>

                  <span className="font-semibold">
                    GET /api/books
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-500">
                    Response Time
                  </span>

                  <span className="font-semibold">
                    {restTime} ms
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-500">
                    Payload Size
                  </span>

                  <span className="font-semibold">
                    {restPayload} bytes
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Total Books
                  </span>

                  <span className="font-semibold">
                    {restBooks.length}
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-gray-700 mb-3">
                  Sample Response
                </h3>

                <div className="bg-[#F4F7EF] rounded-2xl p-5 overflow-auto text-sm text-gray-700">
                  <pre>
                    {JSON.stringify(
                      restBooks?.[0] ||
                        {},
                      null,
                      2
                    )}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E2E9D1] rounded-3xl p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                  GraphQL API
                </h2>

                <span className="bg-[#EEF4E8] text-[#87A96B] px-4 py-2 rounded-full text-sm font-semibold">
                  Flexible
                </span>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-500">
                    Endpoint
                  </span>

                  <span className="font-semibold">
                    POST /graphql
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-500">
                    Response Time
                  </span>

                  <span className="font-semibold">
                    {graphqlTime} ms
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-500">
                    Payload Size
                  </span>

                  <span className="font-semibold">
                    {graphqlPayload} bytes
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Total Books
                  </span>

                  <span className="font-semibold">
                    {graphqlBooks.length}
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-gray-700 mb-3">
                  Sample Response
                </h3>

                <div className="bg-[#F4F7EF] rounded-2xl p-5 overflow-auto text-sm text-gray-700">
                  <pre>
                    {JSON.stringify(
                      graphqlBooks?.[0] ||
                        {},
                      null,
                      2
                    )}
                  </pre>
                </div>
              </div>
            </div>

          </div>
        )}

        <div className="bg-white border border-[#E2E9D1] rounded-3xl p-8 shadow-sm mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Comparative Analysis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-[#F4F7EF] rounded-2xl p-6">
              <h3 className="font-semibold text-gray-700 mb-2">
                Over-fetching
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                REST API returns full
                objects even when only
                partial data is needed.
              </p>
            </div>

            <div className="bg-[#F4F7EF] rounded-2xl p-6">
              <h3 className="font-semibold text-gray-700 mb-2">
                Under-fetching
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                GraphQL allows
                requesting only
                necessary fields in a
                single query.
              </p>
            </div>

            <div className="bg-[#F4F7EF] rounded-2xl p-6">
              <h3 className="font-semibold text-gray-700 mb-2">
                Performance
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                GraphQL reduces
                payload size and
                improves flexibility for
                frontend applications.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}