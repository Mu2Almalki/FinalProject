import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { BsTrash } from "react-icons/bs";
import { Button } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";

import Swal from "sweetalert2";

export default function Cart() {
  let decodedData;
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    decodedData = jwt_decode(storedToken, { payload: true });
    console.log(decodedData);
    let expirationDate = decodedData.exp;
    var current_time = Date.now() / 1000;
    if (expirationDate < current_time) {
      localStorage.removeItem("token");
    }
  }

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState();
  const [userId, setUserId] = useState(decodedData.id);

  const [qty, setQty] = useState();

  useEffect(() => {
    axios.get(`/cart/cart/${decodedData.id}`)
      .then((res) => {
        console.log(res.data[0].cart);
        setTotal(res.data[0].total);
        console.log(decodedData.id);
        setCart(res.data[0].cart);
        setLoading(false);
      });
  }, []);

  //   delete
  const deleteProduct = (e, _id) => {
    e.preventDefault();
    console.log(_id);
    axios
      .delete(`/cart/cart/delete/${decodedData.id}/${_id}`)
      .then((response) => {
        console.log(" deleted: ", response.data);
        setCart(response.data.cart);
        setTotal(response.data.total);
      });
  };

  // checkout
  async function checkout (token, addresses) {
    axios
      .post(`/order/post/${decodedData.id}`, {cartProduct:cart , TotalOrder:total , BuyerId:userId })
      .then(async (res) => {
        console.log(res.data)
        setCart([])
//         try {
//           // const res =
//           await axios.post("/payment/post", {
//             tokenId: token.id,
//             amount: total * 3.75 * 100,
//           });
//         } catch (error) {}
// console.log(token.id)
//         // console.log(res);
//         Swal.fire({
//           title: "Congaraduations",
//           text: "Your byment succsess",
//           icon: "success",
//           didClose: () => {
//             navigate("/");
//           },
//         });
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  if (loading) { 
    return (
    <div class="spinner-border text-danger" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  );
  }

  return (
    <div>
      {(function () {
        if (cart.length == 0) {
          return (
            <div classNameNameNameName="container-fluid mt-100">
              <div classNameNameNameName="row">
                <div classNameNameNameName="col-md-12">
                  <div classNameNameNameName="card">
                    <div classNameNameNameName="card-header">
                      <h5>Cart</h5>
                    </div>
                    <div classNameNameNameName="card-body cart">
                      <div classNameNameNameName="col-sm-12 empty-cart-cls text-center">
                        {" "}
                        <img
                          src="https://i.imgur.com/dCdflKN.png"
                          width="130"
                          height="130"
                          classNameNameNameName="img-fluid mb-4 mr-3"
                        />
                        <h3>
                          <strong>Your Cart is Empty</strong>
                        </h3>
                        <h4>Add something to make me happy :)</h4>{" "}
                        <a
                          href="/Home"
                          classNameNameNameName="btn btn-primary cart-btn-transform m-3"
                          data-abc="true"
                        >
                          continue shopping
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <>
            {console.log(cart)}
              <div class="cart_title">Shopping Cart</div>
              {cart.map((element) => {
                return (
                  <div>
                    <div className="cart_items">
                      <ul className="cart_list">
                        <li className="cart_item clearfix">
                          <div className="cart_item_image">
                            <img src={element.products.image} alt="" />
                          </div>
                          <div className="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                            <div className="cart_item_name cart_info_col">
                              <div className="cart_item_title">Name</div>
                              <div className="cart_item_text">
                                {element.products.nameProduct}
                              </div>
                            </div>
                            <div className="cart_item_quantity cart_info_col">
                              <div className="cart_item_title">Quantity</div>
                              <div className="cart_item_text">{element.qty}</div>
                            </div>
                            <div className="cart_item_price cart_info_col">
                              <div className="cart_item_title">Price</div>
                              <div className="cart_item_text">
                                {element.products.price}
                              </div>
                            </div>
                            <div className="cart_item_total cart_info_col">
                              <div className="cart_item_title">Total</div>
                              <div className="cart_item_text">
                                {element.subtotal}
                              </div>
                            </div>
                            <div class="cart_item_color cart_info_col">
                              <BsTrash
                                onClick={(e) =>
                                  deleteProduct(e, element.products._id)
                                }
                              ></BsTrash>{" "}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
              <div classNameName="order_total">
                <div classNameName="order_total_content text-md-right">
                  <div classNameName="order_total_title">Order Total:</div>
                  <div classNameName="order_total_amount">{total}</div>
                </div>
              </div>
              <div>
                  {/* <StripeCheckout
                    stripeKey="pk_test_51KBwACGy54utR4N2eXQClkvFUiUkxc8Mj2BOovr07m7DwbV1DuTxHhil4rSyUL5QEA3T38BkDdGRdytTkzHr3KWN006DFv2XjU"
                    token={checkout}
                    billingAddress
                    shippingAddress
                    amount={Math.floor((total * 1.15) / 3.75) * 100}
                    // name={cartItems}
                  > */}
                    <Button onClick={checkout}>Checkout</Button>
                  {/* </StripeCheckout> */}
                </div>
            </>
          );
        }
      })()}
    </div>
  );
}
