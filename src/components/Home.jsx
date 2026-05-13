import { useState } from 'react'
import usePageTitle from '../hooks/usePageTitle'
import { useCoffeeContext } from '../context/CoffeeContext'

export default function Home() {
  usePageTitle('Home')
  const { coffees } = useCoffeeContext()
  const [search, setSearch] = useState('')

  const filteredCoffees = coffees.filter(coffee => {
    const term = search.toLowerCase()
    return (
      coffee.name.toLowerCase().includes(term) ||
      coffee.description.toLowerCase().includes(term) ||
      coffee.origin.toLowerCase().includes(term)
    )
  })

  return (
    <section className="home-page">
      <div className="hero-card">
        <h1>Coffee R Us</h1>
        <p>The go-to store for your coffee needs.</p>
      </div>

      <div className="home-lower">
        <aside className="sidebar-card">
          <div className="search-panel">
            <h2>Search</h2>
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search blends, origins, or flavours"
            />
          </div>
          <div className="locations-panel">
            <h2>Locations</h2>
            <ul>
              <li>Downtown</li>
              <li>Main Street</li>
              <li>Midtown</li>
              <li>Uptown</li>
            </ul>
          </div>
        </aside>

        <div className="featured">
          <h2>Popular blends</h2>
          <div className="coffee-grid">
            {filteredCoffees.length > 0 ? (
              filteredCoffees.slice(0, 6).map(coffee => (
                <article key={coffee.id} className="coffee-card">
                  <h3>{coffee.name}</h3>
                  <p>{coffee.description}</p>
                  <span>{coffee.origin}</span>
                  <strong>${coffee.price}</strong>
                </article>
              ))
            ) : (
              <p className="empty-state">No coffees found. Try another search term.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
