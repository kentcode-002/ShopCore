"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash,
  ShoppingBag,
  XCircle,
  ArrowLeft,
  CreditCard,
  Truck,
  CheckCircle2
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type CartItem = {
  _id: string;
  userId: string;
  productId: number;
  productName: string;
  size?: string;
  quantity: number;
  price: number;
  category: string;
  image: string;
};

export type OrderedItem = CartItem & {
  orderedAt: string;
  paymentMethod: "cod" | "card";
  status: "ordered" | "cancelled";
};

type CartProps = {
  cartItems: CartItem[];
};

type Tab = "cart" | "ordered" | "cancelled";
type PaymentMethod = "cod" | "card";
type CheckoutStep = "cart" | "payment" | "confirmed";

export default function Cart({ cartItems }: CartProps) {
  const [items, setItems] = useState<CartItem[]>(cartItems);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [orderedItems, setOrderedItems] = useState<OrderedItem[]>([]);
  const [cancelledItems, setCancelledItems] = useState<OrderedItem[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("cart");
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("cart");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const router = useRouter();

  // ─── Quantity & Delete ───────────────────────────────────────────────────────

  const updateQuantity = async (productId: string, delta: number) => {
    const item = items.find((i) => i._id === productId);
    if (!item) return;
    const newQty = item.quantity + delta;
    setItems((prev) =>
      newQty <= 0
        ? prev.filter((i) => i._id !== productId)
        : prev.map((i) =>
            i._id === productId ? { ...i, quantity: newQty } : i
          )
    );
    if (newQty <= 0) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }
    await fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity: newQty })
    });
  };

  const deleteItem = async (productId: string) => {
    setItems((prev) => prev.filter((item) => item._id !== productId));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
    try {
      await fetch(`/api/cart?productId=${productId}`, { method: "DELETE" });
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
    router.refresh();
  };

  // ─── Selection ───────────────────────────────────────────────────────────────

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === items.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(items.map((i) => i._id)));
    }
  };

  const selectedItems = items.filter((i) => selectedIds.has(i._id));

  const subtotal = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartSubtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // ─── Checkout ────────────────────────────────────────────────────────────────

  const handleProceedToPayment = () => {
    if (selectedItems.length === 0) return;
    setCheckoutStep("payment");
  };

  const handleConfirmOrder = async () => {
    const now = new Date().toISOString();
    const newOrders: OrderedItem[] = selectedItems.map((item) => ({
      ...item,
      orderedAt: now,
      paymentMethod,
      status: "ordered"
    }));

    setOrderedItems((prev) => [...prev, ...newOrders]);

    // Remove checked-out items from cart
    const checkedOutIds = new Set(selectedItems.map((i) => i._id));
    setItems((prev) => prev.filter((i) => !checkedOutIds.has(i._id)));
    setSelectedIds(new Set());

    // Sync with DB
    try {
      await Promise.all(
        selectedItems.map((item) =>
          fetch(`/api/cart?productId=${item._id}`, { method: "DELETE" })
        )
      );
    } catch (err) {
      console.error("Failed to remove items:", err);
    }

    setCheckoutStep("confirmed");
  };

  const handleCancelOrder = (orderId: string) => {
    const order = orderedItems.find((o) => o._id === orderId);
    if (!order) return;
    setOrderedItems((prev) => prev.filter((o) => o._id !== orderId));
    setCancelledItems((prev) => [...prev, { ...order, status: "cancelled" }]);
  };

  const handleBackToCart = () => {
    setCheckoutStep("cart");
  };

  const handleDoneConfirmed = () => {
    setCheckoutStep("cart");
    setActiveTab("ordered");
  };

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const tabCount = {
    cart: items.length,
    ordered: orderedItems.length,
    cancelled: cancelledItems.length
  };

  // ─── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="py-10 px-4">
      {/* ── Tab Bar ── */}
      <div className="flex gap-0 border-b border-gray-200 mb-8 lg:px-40">
        {(["cart", "ordered", "cancelled"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCheckoutStep("cart");
            }}
            className={`relative flex items-center gap-2 px-6 py-3 text-sm font-semibold capitalize transition-colors duration-200 cursor-pointer
              ${
                activeTab === tab
                  ? "text-black border-b-2 border-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
          >
            {tab === "cart" && <ShoppingBag className="w-4 h-4" />}
            {tab === "ordered" && <CheckCircle2 className="w-4 h-4" />}
            {tab === "cancelled" && <XCircle className="w-4 h-4" />}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tabCount[tab] > 0 && (
              <span
                className={`ml-1 text-xs font-bold px-1.5 py-0.5 rounded-full
                ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {tabCount[tab]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════
          TAB: CART
      ══════════════════════════════════════════════════════ */}
      {activeTab === "cart" && (
        <>
          {/* Step: Order Confirmed */}
          {checkoutStep === "confirmed" && (
            <div className="flex flex-col items-center py-16 gap-4">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <p className="text-2xl font-bold mt-2">Order Placed!</p>
              <p className="text-gray-500 text-sm text-center max-w-xs">
                Your order has been confirmed and will be delivered soon.
              </p>
              <div className="mt-2 text-sm text-gray-600 bg-gray-50 px-6 py-3 rounded-lg">
                Payment:{" "}
                <span className="font-semibold">
                  {paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "Pay with Card"}
                </span>
              </div>
              <button
                onClick={handleDoneConfirmed}
                className="mt-6 border font-semibold px-8 py-3 bg-black text-white rounded-full hover:opacity-70 transition-opacity cursor-pointer"
              >
                View My Orders
              </button>
            </div>
          )}

          {/* Step: Payment Method */}
          {checkoutStep === "payment" && (
            <div className="max-w-lg mx-auto">
              <button
                onClick={handleBackToCart}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-6 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Cart
              </button>

              <p className="font-bold text-2xl mb-1">Checkout</p>
              <p className="text-sm text-gray-400 mb-8">
                {selectedItems.length} item
                {selectedItems.length !== 1 ? "s" : ""} selected
              </p>

              {/* Order Summary */}
              <div className="border border-gray-100 rounded-2xl p-5 mb-6 bg-gray-50">
                <p className="font-semibold text-sm mb-4 text-gray-600 uppercase tracking-wide">
                  Order Summary
                </p>
                <div className="flex flex-col gap-3">
                  {selectedItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-700 truncate max-w-55">
                        {item.productName}
                        {item.size && (
                          <span className="text-gray-400 ml-1">
                            ({item.size})
                          </span>
                        )}
                        <span className="text-gray-400 ml-1">
                          × {item.quantity}
                        </span>
                      </span>
                      <span className="font-medium ml-4">
                        $ {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span>$ {subtotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Method */}
              <p className="font-semibold mb-3">Payment Method</p>
              <div className="flex flex-col gap-3 mb-8">
                {/* Cash on Delivery */}
                <label
                  className={`flex items-center gap-4 border-2 rounded-2xl p-4 cursor-pointer transition-all duration-200
                    ${
                      paymentMethod === "cod"
                        ? "border-black bg-gray-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="hidden"
                  />
                  {/* Custom radio */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                    ${
                      paymentMethod === "cod"
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "cod" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-black" />
                    )}
                  </div>
                  <Truck className="w-5 h-5 text-gray-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Cash on Delivery</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Pay when your order arrives
                    </p>
                  </div>
                </label>

                {/* Pay with Card */}
                <span className="text-amber-500 text-xs">Coming soon</span>
                <label
                  className={`flex items-center gap-4 border-2 rounded-2xl p-4 cursor-pointer transition-all duration-200
                    ${
                      paymentMethod === "card"
                        ? "border-black bg-gray-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    disabled
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                    ${
                      paymentMethod === "card"
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "card" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-black" />
                    )}
                  </div>
                  <CreditCard className="w-5 h-5 text-gray-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Pay with Card</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Visa, Mastercard, and more
                    </p>
                  </div>
                </label>
              </div>

              <button
                onClick={handleConfirmOrder}
                className="w-full border py-4 font-bold bg-amber-600 text-white rounded-full cursor-pointer hover:opacity-70 transition-opacity"
              >
                Confirm Order — $ {subtotal.toLocaleString()}
              </button>
            </div>
          )}

          {/* Step: Main Cart */}
          {checkoutStep === "cart" && (
            <>
              {items.length === 0 ? (
                <div className="flex flex-col items-center">
                  <div className="relative w-full h-64">
                    <Image
                      src="/images/empty-cart.svg"
                      alt="Empty cart"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="mt-16">No items in your cart yet.</p>
                  <p className="mt-2 text-center text-sm text-gray-500">
                    Looks like you haven't added anything to your cart yet.
                    Let's find something you'll love!
                  </p>
                  <Link
                    href="/collections"
                    className="mt-8 border font-semibold px-4 py-2 bg-black text-white"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] justify-center gap-8 lg:px-40">
                  {/* ── Left: Items ── */}
                  <div>
                    <div className="px-4">
                      <div className="flex items-center justify-between mb-4">
                        <p className="font-bold lg:text-2xl">Cart</p>
                        {/* Select All */}
                        <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer select-none">
                          <div
                            onClick={toggleSelectAll}
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-150 cursor-pointer
                              ${
                                selectedIds.size === items.length &&
                                items.length > 0
                                  ? "bg-black border-black"
                                  : "border-gray-300 hover:border-gray-500"
                              }`}
                          >
                            {selectedIds.size === items.length &&
                              items.length > 0 && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={3}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                          </div>
                          Select All
                        </label>
                      </div>

                      <div className="flex flex-col gap-8">
                        {items.map((item) => (
                          <div key={item._id}>
                            <div className="flex gap-4">
                              {/* Checkbox */}
                              <div className="flex items-start pt-1 shrink-0">
                                <div
                                  onClick={() => toggleSelect(item._id)}
                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-150 cursor-pointer shrink-0
                                    ${
                                      selectedIds.has(item._id)
                                        ? "bg-black border-black"
                                        : "border-gray-300 hover:border-gray-500"
                                    }`}
                                >
                                  {selectedIds.has(item._id) && (
                                    <svg
                                      className="w-3 h-3 text-white"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={3}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  )}
                                </div>
                              </div>

                              <div className="relative w-70 h-30 lg:h-40 productBg">
                                <Image
                                  src={item.image}
                                  alt=""
                                  fill
                                  className="object-contain p-2"
                                />
                              </div>
                              <div className="w-full flex flex-col lg:flex-row justify-between">
                                <div className="flex flex-col gap-2">
                                  <p className="text-sm lg:text-base font-bold max-w-100">
                                    {item.productName}
                                  </p>
                                  {item.size && (
                                    <p className="text-sm lg:text-base">
                                      Size: {item.size}
                                    </p>
                                  )}
                                </div>
                                <div className="flex lg:justify-end">
                                  <p className="text-sm lg:text-base font-semibold">
                                    {`Price: $ ${item.price * item.quantity}`}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 flex gap-4 pl-9">
                              <div className="flex items-center gap-4 border border-gray-300 rounded-full overflow-hidden">
                                <button
                                  onClick={() => updateQuantity(item._id, -1)}
                                  className="flex items-center w-10 h-10 justify-center rounded-full cursor-pointer hover:bg-[#ebebeb]"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                {item.quantity}
                                <button
                                  onClick={() => updateQuantity(item._id, 1)}
                                  className="flex items-center w-10 h-10 justify-center rounded-full cursor-pointer hover:bg-gray-200"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <button
                                onClick={() => deleteItem(item._id)}
                                className="border-2 rounded-full py-2 px-3 hover:text-white hover:bg-red-500 transition-colors duration-200 cursor-pointer"
                              >
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── Right: Summary ── */}
                  <div className="px-5">
                    <p className="font-medium lg:text-2xl">Summary</p>
                    <div>
                      <p className="flex justify-between mt-4">
                        <span className="font-medium">Subtotal</span>
                        <span>$ {subtotal.toLocaleString()}</span>
                      </p>
                      {selectedItems.length > 0 && (
                        <p className="flex justify-between mt-2 text-sm text-gray-500">
                          <span>Selected ({selectedIds.size})</span>
                          <span>$ {subtotal.toLocaleString()}</span>
                        </p>
                      )}
                      <p className="flex justify-between mt-4">
                        <span className="font-medium">Delivery Fee:</span>
                        <span>Free</span>
                      </p>
                    </div>
                    <div>
                      <p className="flex justify-between mt-8 border-t border-b py-4">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold">
                          $ {subtotal.toLocaleString()}
                        </span>
                      </p>
                    </div>

                    {/* Selection hint */}
                    {selectedItems.length === 0 && (
                      <p className="text-xs text-gray-400 mt-3 text-center">
                        Select items above to check out
                      </p>
                    )}

                    <button
                      onClick={handleProceedToPayment}
                      disabled={selectedItems.length === 0}
                      className={`w-full border py-4 font-bold text-white mt-8 rounded-full transition-opacity
                        ${
                          selectedItems.length === 0
                            ? "bg-amber-300 cursor-not-allowed opacity-60"
                            : "bg-amber-600 cursor-pointer hover:opacity-70"
                        }`}
                    >
                      {selectedItems.length === 0
                        ? "Check Out"
                        : `Check Out (${selectedItems.length})`}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* ══════════════════════════════════════════════════════
          TAB: ORDERED
      ══════════════════════════════════════════════════════ */}
      {activeTab === "ordered" && (
        <div className="lg:px-40 px-4">
          <p className="font-bold lg:text-2xl mb-6">My Orders</p>
          {orderedItems.length === 0 ? (
            <div className="flex flex-col items-center py-16 gap-3">
              <CheckCircle2 className="w-12 h-12 text-gray-200" />
              <p className="text-gray-400 text-sm">No orders yet.</p>
              <button
                onClick={() => setActiveTab("cart")}
                className="mt-2 text-sm font-semibold underline cursor-pointer"
              >
                Go to Cart
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {orderedItems.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-100 rounded-2xl p-5 flex gap-4 items-start"
                >
                  <div className="relative w-24 h-24 shrink-0 productBg rounded-xl overflow-hidden">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm lg:text-base truncate">
                      {item.productName}
                    </p>
                    {item.size && (
                      <p className="text-sm text-gray-500 mt-0.5">
                        Size: {item.size}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-0.5">
                      Qty: {item.quantity}
                    </p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {item.paymentMethod === "cod" ? (
                          <Truck className="w-3 h-3" />
                        ) : (
                          <CreditCard className="w-3 h-3" />
                        )}
                        {item.paymentMethod === "cod"
                          ? "Cash on Delivery"
                          : "Card"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatDate(item.orderedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <p className="font-bold text-sm">
                      $ {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleCancelOrder(item._id)}
                      className="text-xs text-red-500 border border-red-200 rounded-full px-3 py-1.5 hover:bg-red-500 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          TAB: CANCELLED
      ══════════════════════════════════════════════════════ */}
      {activeTab === "cancelled" && (
        <div className="lg:px-40 px-4">
          <p className="font-bold lg:text-2xl mb-6">Cancelled Orders</p>
          {cancelledItems.length === 0 ? (
            <div className="flex flex-col items-center py-16 gap-3">
              <XCircle className="w-12 h-12 text-gray-200" />
              <p className="text-gray-400 text-sm">No cancelled orders.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cancelledItems.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-100 rounded-2xl p-5 flex gap-4 items-start opacity-70"
                >
                  <div className="relative w-24 h-24 shrink-0 productBg rounded-xl overflow-hidden grayscale">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm lg:text-base truncate">
                      {item.productName}
                    </p>
                    {item.size && (
                      <p className="text-sm text-gray-500 mt-0.5">
                        Size: {item.size}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-0.5">
                      Qty: {item.quantity}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-400">
                        {formatDate(item.orderedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <p className="font-bold text-sm line-through text-gray-400">
                      $ {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <span className="text-xs bg-red-50 text-red-400 border border-red-100 rounded-full px-3 py-1.5">
                      Cancelled
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
