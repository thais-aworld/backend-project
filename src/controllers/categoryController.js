import React, { useEffect, useState } from 'react';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://backend-api-9fdu.onrender.com/v1/categories?limit=12&page=1')
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao carregar categorias');
        return res.json();
      })
      .then((data) => {
        setCategories(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando categorias...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <section className="category-list">
      <h2>Categorias</h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            <strong>{cat.name}</strong>
            {cat.use_in_menu && <span> (Usada no menu)</span>}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CategoryList;
