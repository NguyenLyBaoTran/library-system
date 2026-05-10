const BASE_URL = "http://localhost:5000/api";

export const getBooks = async () => {
  try {
    const res = await fetch(`${BASE_URL}/books`);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("getBooks error:", error);
    return [];
  }
};

export const getBookById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/books/${id}`);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("getBookById error:", error);
    return null;
  }
};