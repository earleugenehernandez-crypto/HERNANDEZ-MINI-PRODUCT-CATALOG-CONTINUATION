import { useEffect, useState } from 'react'
import ProductCard from './components/ProductCard'
import SearchBar from './components/SearchBar'
import products from './data/products'
import './App.css'

function App() {
  const [cartCount, setCartCount] = useState(0)
  const [lastAdded, setLastAdded] = useState('')
  const [searchText, setSearchText] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sortOrder, setSortOrder] = useState('default')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(searchText)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchText])

  function handleAddToCart(title) {
    setCartCount((count) => count + 1)
    setLastAdded(title)
  }

  function clearFilters() {
    setSearchText('')
    setDebouncedSearch('')
    setCategory('All')
    setSortOrder('default')
  }

  const filteredProducts = [...products]
    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
      const matchesCategory =
        category === 'All' || product.category === category

      return matchesSearch && matchesCategory
    })
    .sort((first, second) => {
      if (sortOrder === 'low') return first.price - second.price
      if (sortOrder === 'high') return second.price - first.price
      return 0
    })

  useEffect(() => {
    document.title = `CvSU Mini Store (${filteredProducts.length} results)`
  }, [filteredProducts.length])

  return (
    <main className="catalog">
      <h1>CvSU Mini Store</h1>
      <p className="catalog__message" role="status">
        {cartCount === 0
          ? 'Your cart is empty.'
          : `Items added to cart: ${cartCount} (Last added: ${lastAdded})`}
      </p>

      <SearchBar
        searchText={searchText}
        onSearchTextChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        onClearFilters={clearFilters}
      />

      <section className="catalog__grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            inStock={product.inStock}
            onAddToCart={handleAddToCart}
          >
            {product.id === 2 && <span>Sale</span>}
            {product.id === 5 && <span>New</span>}
          </ProductCard>
        ))}
      </section>
    </main>
  )
}

export default App
