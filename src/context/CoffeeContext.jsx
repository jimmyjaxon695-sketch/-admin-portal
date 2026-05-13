import { createContext, useContext, useState } from 'react'

const CoffeeContext = createContext(null)

const initialCoffees = [
  { id: 1, name: 'Espresso', description: 'Strong, rich, and bold', origin: 'Italy', price: '3.50' },
  { id: 2, name: 'Cappuccino', description: 'Creamy foam with espresso', origin: 'Ethiopia', price: '4.25' },
  { id: 3, name: 'Latte', description: 'Smooth milk and coffee', origin: 'Colombia', price: '4.75' },
  { id: 4, name: 'Mocha', description: 'Chocolate coffee blend', origin: 'Brazil', price: '5.00' }
]

export function CoffeeProvider({ children }) {
  const [coffees, setCoffees] = useState(initialCoffees)

  function addCoffee(newCoffee) {
    setCoffees(prev => [...prev, { ...newCoffee, id: Date.now() }])
  }

  return (
    <CoffeeContext.Provider value={{ coffees, addCoffee }}>
      {children}
    </CoffeeContext.Provider>
  )
}

export function useCoffeeContext() {
  const context = useContext(CoffeeContext)
  if (!context) {
    throw new Error('useCoffeeContext must be used inside CoffeeProvider')
  }
  return context
}
