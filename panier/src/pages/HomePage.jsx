import ProductList from "../components/ProductList";
import { useCartStore } from "../stores/useCartStore";

function HomePage() {
  const productsCount = useCartStore((state) => state.products.length);

  return (
    <div className="page">
      <section className="hero">
        <p className="hero__eyebrow">Nouvelle collection</p>
        <h1 className="hero__title">Atelier Café & Slow Coffee</h1>
        <p className="hero__subtitle">
          Découvrez nos {productsCount} produits fraîchement sélectionnés pour
          équiper votre barista corner et faire voyager vos papilles.
        </p>
      </section>

      <ProductList title="Dernières arrivées" limit={3} />
    </div>
  );
}

export default HomePage;
