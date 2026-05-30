function SearchBar({ search, setSearch }) {
  return (
    <input
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      placeholder="Search recipe..."
      className="border w-full p-3 rounded-lg"
    />
  );
}

export default SearchBar;