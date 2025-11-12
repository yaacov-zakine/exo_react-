import ProductList from "../components/ProductList";
import Cart from "../components/Cart";

function CatalogPage() {
  return (
    <div className="page page--grid">
      <div className="page__column">
        <ProductList title="Catalogue complet" />
      </div>
      <div className="page__column">
        <Cart />
      </div>
    </div>
  );
}

export default CatalogPage;
