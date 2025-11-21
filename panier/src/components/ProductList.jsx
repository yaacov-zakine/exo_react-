import { useMemo } from "react";
import { useCartStore } from "../stores/useCartStore";

const currency = (value) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(value);

function ProductList({ title, limit }) {
  const products = useCartStore((state) => state.products);
  const addToCart = useCartStore((state) => state.addToCart);

  const productsToDisplay = useMemo(() => {
    if (!limit) return products;
    return products.slice(0, limit);
  }, [limit, products]);

  return (
    <section className="panel">
      {title ? <h2 className="panel__title">{title}</h2> : null}
      <div className="product-grid">
        {productsToDisplay.map((product) => (
          <article key={product.id} className="product-card">
            <div className="product-card__header">
              <div>
                <p className="product-card__name">{product.name}</p>
                <p className="product-card__description">
                  {product.description}
                </p>
              </div>
              <span className="product-card__category">{product.category}</span>
            </div>

            <div className="product-card__meta">
              <span className="product-card__rating">
                ⭐ {product.rating.toFixed(1)}
              </span>
              <span className="product-card__stock">
                {product.stock} en stock
              </span>
              <span className="product-card__origin">
                Origine : {product.origin}
              </span>
            </div>

            <p className="product-card__price">{currency(product.price)}</p>
            <button
              className="btn btn--primary"
              onClick={() => addToCart(product.id)}
            >
              Ajouter au panier
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProductList;
