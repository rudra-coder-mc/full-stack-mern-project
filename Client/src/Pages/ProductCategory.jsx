import { useState, useEffect, useContext } from "react";
import Product from "../Components/Products/Products";
import { ShopContext } from "../Context/ShopContex";

const ProductCategory = (prop) => {
  const { data, loading, error } = useContext(ShopContext); // Access context properties

  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredProducts, setFilteredProducts] = useState(data); // State for filtered products
  const [filterHomeProducts, setfilterHomeProducts] = useState(data); // State for filtered products
  const [selectedCategory, setSelectedCategory] = useState("all"); // State for selected category

  useEffect(() => {
    const filterProducts = () => {
      if (!searchTerm && selectedCategory === "all") {
        setFilteredProducts(data); // Set all products if no search or filter
        return;
      }

      let filtered = data.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (selectedCategory !== "all") {
        filtered = filtered.filter(
          (product) => product.category === selectedCategory
        );
      }

      setFilteredProducts(filtered);
    };
    const filterHomeProducts = () => {
      let filtered = data.filter((product) => product.category === prop.filter);

      setfilterHomeProducts(filtered);
    };
    filterHomeProducts();
    filterProducts(); // Call filter function on initial render and search/category changes
  }, [data, searchTerm, selectedCategory]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      {!prop.filter && (
        <div className="search-bar category-filter flex m-4 gap-2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-500"
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-500"
          >
            <option value="all">All Categories</option>
            {/* Add options for your available categories dynamically based on data */}
            {data.map((product) => (
              <option key={product.category} value={product.category}>
                {product.category}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="category-filter flex mb-4"></div>

      <div className="my-3 mx-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-1 items-center justify-center">
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>Error fetching products: {error}</p>
        ) : prop.filter ? (
          <Product products={filterHomeProducts} /> // Pass filtered products to Product component
        ) : (
          <Product products={filteredProducts} />
        )}
      </div>
    </>
  );
};

export default ProductCategory;
