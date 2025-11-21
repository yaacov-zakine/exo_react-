import { useMemo } from "react";
import { useCartStore, selectCartWithDetails } from "../stores/useCartStore";

const currency = (value) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(value);

function Cart() {
  const cart = useCartStore((state) => state.cart);
  const products = useCartStore((state) => state.products);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useCartStore((state) => state.total);

  const detailedItems = useMemo(
    () =>
      selectCartWithDetails({
        cart,
        products,
      }),
    [cart, products]
  );

  if (!cart.length) {
    return (
      <section className="panel cart">
        <h2 className="panel__title">Panier</h2>
        <p className="panel__empty">Votre panier est vide pour le moment.</p>
      </section>
    );
  }

  return (
    <section className="panel cart">
      <h2 className="panel__title">Panier</h2>
      <ul className="cart__list">
        {detailedItems.map((item) => (
          <li key={item.id} className="cart__item">
            <div>
              <p className="cart__name">{item.name}</p>
              <p className="cart__price">{currency(item.price)}</p>
            </div>
            <div className="cart__actions">

              <button
                className="btn btn--ghost"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Retirer ${item.name}`}
              >
                –
              </button>
              <span className="cart__quantity">{item.quantity}</span>
              <button
                className="btn btn--ghost"
                onClick={() => addToCart(item.id)}
                aria-label={`Ajouter ${item.name}`}
              >
                +
              </button>
              
              <span className="cart__line-total">
                {currency(item.lineTotal)}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart__footer">
        <div>
          <p className="cart__total-label">Total</p>
          <p className="cart__total-value">{currency(total())}</p>
        </div>
        <div className="cart__footer-actions">
          <button className="btn btn--ghost" onClick={clearCart}>
            Vider le panier
          </button>
          <button className="btn btn--primary">Commander</button>
        </div>
      </div>
    </section>
  );
}

export default Cart;
