import { useState, useEffect } from "react";
import productsData from "../../db.json";

const LOCAL_PRODUCTS = productsData.products || [];

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(LOCAL_PRODUCTS);
    setLoading(false);
  }, []);

  function addProduct(newProduct) {
    const product = { ...newProduct, id: Date.now().toString() };
    setProducts((prev) => [...prev, product]);
    return Promise.resolve(product);
  }

  function updateProduct(id, updates) {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    const current = products.find((p) => p.id === id) || {};
    return Promise.resolve({ ...current, ...updates });
  }

  function deleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    return Promise.resolve();
  }

  return { products, loading, addProduct, updateProduct, deleteProduct };
}