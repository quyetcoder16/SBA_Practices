import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  tags: string[]
}

interface Cart {
  productId: string;
  qty: number;
}

interface SummaryItem {
  productId: string;
  name: string;
  price: number;
  qty: number;
  lineTotal: number;
}

interface OutOfStockItem {
  productId: string;
  name: string;
  requestedQty: number;
  stock: number;
}

interface CartSummary {
  items: SummaryItem[];
  subTotal: number;
  discount: number;
  total: number;
  outOfStockItems: OutOfStockItem[];
}


function App() {

  const [products, setProducts] = useState<Product[]>([
    { id: "p01", name: "Keyboard", price: 25, stock: 10, tags: ["gear", "keyboard"] },
    { id: "p02", name: "Mouse", price: 15, stock: 5, tags: ["gear"] },
    { id: "p03", name: "Monitor", price: 120, stock: 2, tags: ["display"] },
  ]);

  const [cart, setCart] = useState<Cart[]>([
    { productId: "p01", qty: 2 },
    { productId: "p02", qty: 1 },
  ])

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupons, setAppliedCoupons] = useState<string[]>([]);

  const handleAddCoupon = () => {
    if (!couponInput) return;
    if (!appliedCoupons.includes(couponInput.toUpperCase())) {
      setAppliedCoupons([...appliedCoupons, couponInput.toUpperCase()]);
    }
    setCouponInput("");
  };

  const addToCart = (cart: Cart[], productId: string, qty: number) => {
    const productExist = products.find((p) => p.id == productId);
    if (!productExist) {
      alert("product Id not existed!")
      return
    }

    const cartItemExist = cart.find((cartItem) => cartItem.productId == productId);
    if (cartItemExist) {
      const newCart = cart?.map((item) =>
        item.productId === productId
          ? { ...item, qty: item.qty + qty }
          : item);
      setCart(newCart);
    } else {
      setCart([...cart, { productId, qty }]);
    }
  }




  const removeFromCart = (cart: Cart[], productId: string) => {
    const productExist = products.find((p) => p.id == productId);
    if (!productExist) {
      alert("product Id not existed!")
      return
    }

    const newCart: Cart[] = cart?.filter((c) => c?.productId != productId);
    setCart(newCart)

  }

  const updateQty = (cart: Cart[], productId: string, qty: number) => {
    const productExist = products.find((p) => p.id == productId);
    if (!productExist) {
      alert("product Id not existed!")
      return
    }

    const cartItemExist = cart.find((cartItem) => cartItem.productId == productId);
    if (cartItemExist) {
      if ((cartItemExist?.qty + qty) <= 0) {
        const newCart: Cart[] = cart?.filter((c) => c?.productId != productId);
        setCart(newCart)
      }
      // uncomment if you want to check stock
      // else if ((cartItemExist?.qty + qty) > productExist?.stock) {
      //   alert("exceeding the quantity in stock.")
      // }

      else {
        const newCart = cart?.map((item) =>
          item.productId === productId
            ? { ...item, qty: item.qty + qty }
            : item);
        setCart(newCart);
      }

    } else {
      setCart([...cart, { productId, qty }]);
    }
  }


  const calcCartSummary = (products: Product[], cart: Cart[], ...couponCodes: string[]): CartSummary => {
    let items: SummaryItem[] = [];
    let outOfStockItems: OutOfStockItem[] = [];
    let subTotal = 0;
    let discount = 0;

    cart?.forEach((cartItem) => {
      const productExist = products.find((p) => p.id === cartItem.productId);

      if (productExist) {
        const lineTotal = productExist.price * cartItem.qty;
        items.push({
          productId: productExist.id,
          name: productExist.name,
          price: productExist.price,
          qty: cartItem.qty,
          lineTotal: lineTotal,
        });

        subTotal += lineTotal;

        if (cartItem.qty > productExist?.stock) {
          outOfStockItems.push({
            productId: productExist.id,
            name: productExist.name,
            requestedQty: cartItem.qty,
            stock: productExist.stock,
          });
        }

      }
    });

    couponCodes?.forEach((code) => {
      if (code === "SAVE10") {
        discount += subTotal * 0.1;
      } else if (code === "SHIPFREE") {
        discount += 5;
      }
    })

    if (discount > subTotal) {
      discount = subTotal;
    }

    const total = subTotal - discount;

    return {
      items: items,
      subTotal: subTotal,
      discount: discount,
      total: total,
      outOfStockItems: outOfStockItems,
    };

  }

  const summary = calcCartSummary(products, cart, ...appliedCoupons);

  return (
    <>
      <div className="container list-product mt-2">

        <h2 className="">Product List</h2>

        <div className="table-responsive mb-5">
          <table className="table table-hover table-bordered align-middle shadow-sm">
            <thead className="table-primary">
              <tr>
                <th scope="col">Product id</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Tags</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((item) => {
                return <tr key={item?.id}>
                  <td scope="row">{item?.id}</td>
                  <td scope="row">{item?.name}</td>
                  <td scope="row">{item?.price}</td>
                  <td scope="row">{item?.stock}</td>
                  <td scope="row">
                    {item?.tags?.map((tag, index) => {
                      return (<div key={index} className="badge rounded-pill text-bg-secondary me-1">{tag}</div>)
                    })}
                  </td>
                  <td scope="row">
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => {
                        addToCart(cart, item?.id, 1)
                      }}
                    >
                      <i className="fa fa-cart-plus"></i>
                    </button>

                  </td>
                </tr>
              })}

            </tbody>
          </table>
        </div>

        <hr />

        <div className="row">
          <div className="col-8">

            <h3>My Cart ({summary.items.length})</h3>
            {summary?.items?.length > 0 ? (<div>
              <div
                className="table-responsive"
              >
                <table
                  className="table "
                >
                  <thead className="table-secondary">
                    <tr>
                      <th>Product id</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th style={{ width: "150px" }}>Quantity</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.items.map((item) => (
                      <tr key={item.productId}>
                        <td>{item?.productId}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>
                          <div className="input-group input-group-sm">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => updateQty(cart, item?.productId, -1)}
                            >-</button>
                            <span className="form-control text-center bg-white">
                              {item.qty}
                            </span>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => updateQty(cart, item?.productId, 1)}
                            >+</button>
                          </div>
                        </td>
                        <td className="fw-bold">{item.lineTotal}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeFromCart(cart, item?.productId)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>)
              : (<div className="alert alert-info">Your cart is empty.</div>)}

            {summary?.outOfStockItems.length > 0 && (<div className=" ">
              <h5 className="text-warning">Warning</h5>
              <div
                className="table-responsive"
              >
                <table
                  className="table"
                >
                  <thead className=" table-warning">
                    <tr>
                      <th scope="col">Product Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">RequestedQty</th>
                      <th scope="col">Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.outOfStockItems.map((item, index) => {
                      return (<tr key={index}>
                        <td>{item?.productId}</td>
                        <td>{item?.name}</td>
                        <td >{item?.requestedQty}</td>
                        <td className="text-danger">{item?.stock}</td>

                      </tr>)
                    })}
                  </tbody>
                </table>
              </div>

            </div>)}
          </div>
          <div className="col-4">
            <div className="card">
              <div className="card-header bg-success">
                Summary
              </div>
              <div className="card-body">

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span className="fw-bold">{summary.subTotal.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-2 ">
                  <span>Discount</span>
                  <span>-{summary.discount.toFixed(2)}</span>
                </div>
                <div className="input-group mb-3 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="input coupon"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                  />
                  <button className="btn btn-outline-secondary" onClick={handleAddCoupon}>Apply</button>
                </div>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-between">
                  <span>Total</span>
                  <span className="fw-bold">{summary?.total?.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </>
  )
}

export default App
