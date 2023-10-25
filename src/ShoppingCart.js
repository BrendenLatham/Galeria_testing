import React, { Component } from 'react';

class ShoppingCartPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      products: [
        { id: 1, name: 'Coffee Mug', price: 10 },
        { id: 2, name: 'T-Shirt', price: 20 },
        { id: 3, name: 'Canvas', price: 30 },
      ],
    };
  }

  addToCart = (product) => {
    const { cart } = this.state;
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // If the product is already in the cart, update its quantity
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      this.setState({ cart: updatedCart });
    } else {
      // If the product is not in the cart, add it with quantity 1
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      this.setState({ cart: updatedCart });
    }
  };

  removeFromCart = (productId) => {
    const { cart } = this.state;
    const existingProduct = cart.find((product) => product.id === productId);

    if (existingProduct) {
      if (existingProduct.quantity === 1) {
        // If there's only one item, remove it from the cart
        const updatedCart = cart.filter((product) => product.id !== productId);
        this.setState({ cart: updatedCart });
      } else {
        // If there's more than one item, decrease the quantity by 1
        const updatedCart = cart.map((product) => {
          if (product.id === productId) {
            return { ...product, quantity: product.quantity - 1 };
          }
          return product;
        });
        this.setState({ cart: updatedCart });
      }
    }
  };

  calculateTotal = () => {
    const { cart } = this.state;
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  render() {
    const { cart, products } = this.state;
    
    return (
      <div className="shopping-cart">
        <div className="product-list">
          <h1>Missing Anything?</h1>
          <br></br>
          <ul>
            {products.map((product) => (
              <li key={product.id} className="product-item">
                <div className="product-item-details">
                   <div className="product-item-name">
                       {product.name}
                   </div>
                   <div className="product-price">
                   ${product.price}
                   </div>
                </div>
                <button className="add-more-button" onClick={() => this.addToCart(product)}>
                  Add More
                </button>
              </li>
            ))}
          </ul>
          <h2>Your Cart</h2>
          <ul>
            {cart.map((product) => (
              <li key={product.id} className="cart-item">
                <div className="cart-item-details">
                  <div className="cart-item-name">
                    {product.name}  
                  </div>
                  <div className="product-price">
                  ${product.price}
                  </div>
                </div>
                <div className="cart-item-quantity-box">
                    <div className="cart-item-quantity">
                      Qty: {product.quantity}
                    </div>
                
                <button onClick={() => this.removeFromCart(product.id)} className="remove-button">
                <i class="fa fa-minus" aria-hidden="true"></i>
                </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="total">Total: ${this.calculateTotal()}</p>
          <br></br>
          <button className="checkout">Checkout</button>
        </div>
      </div>
    );
  }
}

export default ShoppingCartPopup;
