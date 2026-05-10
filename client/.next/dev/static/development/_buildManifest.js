self.__BUILD_MANIFEST = {
  "/books": [
    "static/chunks/pages/books.js"
  ],
  "/books/[id]": [
    "static/chunks/pages/books/[id].js"
  ],
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/_app",
    "/_error",
    "/books",
    "/books/[id]"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()