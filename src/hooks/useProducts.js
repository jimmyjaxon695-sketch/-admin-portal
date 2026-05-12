import { useState, useEffect } from "react";
import productsData from "../../db.json";

const BASE_URL = "http://localhost:3001/products";
const LOCAL_PRODUCTS = productsData.products || [];

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(BASE_URL)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch products");
        return r.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setProducts(LOCAL_PRODUCTS);
        setLoading(false);
      });
  }, []);

  function addProduct(newProduct) {
    return fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((r) => r.json())
      .then((product) => {
        setProducts((prev) => [...prev, product]);
        return product;
      })
      .catch(() => {
        const product = { ...newProduct, id: Date.now().toString() };
        setProducts((prev) => [...prev, product]);
        return Promise.resolve(product);
      });
  }

  function updateProduct(id, updates) {
    return fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
      .then((r) => r.json())
      .then((updated) => {
        setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
        return updated;
      })
      .catch(() => {
        setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
        const current = products.find((p) => p.id === id) || {};
        return Promise.resolve({ ...current, ...updates });
      });
  }

  function deleteProduct(id) {
    return fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      })
      .catch(() => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        return Promise.resolve();
      });
  }

  return { products, loading, addProduct, updateProduct, deleteProduct };
}