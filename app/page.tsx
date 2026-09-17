"use client";

import { FormEvent, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  shortName: string;
  description: string;
  weight: string;
  scent: string;
  price: number;
  image: string;
  tag?: string;
};

type CartItem = Product & {
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "Motichoor Laddoo Candle",
    shortName: "Motichoor Laddoo Candle",
    description:
      "A hyper-realistic festive laddoo, handcrafted from premium soy wax.",
    weight: "Approx. 120g",
    scent: "Saffron • Cardamom • Vanilla",
    price: 449,
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=85",
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Motichoor Laddoo Set of 4",
    shortName: "Laddoo Set of 4",
    description:
      "Four handcrafted mithai candles made for gifting and celebrations.",
    weight: "Approx. 480g",
    scent: "Saffron • Cardamom • Vanilla",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&w=1000&q=85",
    tag: "Gift Set",
  },
  {
    id: 3,
    name: "Kaju Katli Tray Set",
    shortName: "Kaju Katli Tray Set",
    description:
      "Creamy diamond-shaped candles finished with elegant gold-leaf detailing.",
    weight: "Approx. 350g",
    scent: "Almond • Vanilla • Rose",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85",
    tag: "Premium",
  },
  {
    id: 4,
    name: "Jalebi / Imarti Festive Candle",
    shortName: "Jalebi / Imarti Candle",
    description:
      "Intricately handcrafted spiral mithai-inspired soy wax candle.",
    weight: "Approx. 150g",
    scent: "Rose • Saffron • Vanilla",
    price: 549,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 5,
    name: "Diwali Luxury Gift Box",
    shortName: "Diwali Luxury Gift Box",
    description:
      "A customizable festive hamper for family, clients and loved ones.",
    weight: "Customizable",
    scent: "Choose your fragrance",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1603905179139-db12ab535c8b?auto=format&fit=crop&w=1000&q=85",
    tag: "Customizable",
  },
  {
    id: 6,
    name: "Wedding Favour Box",
    shortName: "Wedding Favour Box",
    description:
      "Personalized mithai candles created specially for weddings and events.",
    weight: "From 50g each",
    scent: "Custom fragrance",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1602874801006-e26c7d7d5f65?auto=format&fit=crop&w=1000&q=85",
    tag: "Bulk",
  },
];

const WHATSAPP_NUMBER = "919999999999";

function createWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}

function formatPrice(price: number) {
  return `₹${price.toLocaleString("en-IN")}`;
}

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [addedProduct, setAddedProduct] = useState<number | null>(null);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cart]
  );

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    setAddedProduct(product.id);

    setTimeout(() => {
      setAddedProduct(null);
    }, 1200);
  };

  const increaseQuantity = (id: number) => {
    setCart((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const buyNow = (product: Product) => {
    addToCart(product);
    setCartOpen(true);
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) return;

    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleCheckoutSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const items = cart
      .map(
        (item) =>
          `• ${item.name} × ${item.quantity} — ${formatPrice(
            item.price * item.quantity
          )}`
      )
      .join("\n");

    const message = `Hi SWERAV's Bhashma! ✨

I would like to place an order.

CUSTOMER DETAILS
Name: ${customer.name}
Phone: ${customer.phone}
Address: ${customer.address}
City: ${customer.city}
State: ${customer.state}
Pincode: ${customer.pincode}

ORDER
${items}

Subtotal: ${formatPrice(subtotal)}

Please confirm my order and share the payment details.

Thank you!`;

    setOrderPlaced(true);

    window.open(createWhatsAppLink(message), "_blank");
  };

  const resetOrder = () => {
    setCart([]);
    setCheckoutOpen(false);
    setOrderPlaced(false);
    setCustomer({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });
  };

  return (
    <main className="min-h-screen bg-[#f7f0e5] text-[#171311]">
      {/* ================= NAVBAR ================= */}

      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f0e5]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="leading-none">
            <div className="font-serif text-xl tracking-wide">
              SWERAV&apos;s
            </div>

            <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.35em] text-[#a85620]">
              Bhashma
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-xs font-semibold md:flex">
            <a href="#collection" className="hover:text-[#a85620]">
              Collection
            </a>

            <a href="#story" className="hover:text-[#a85620]">
              Our Story
            </a>

            <a href="#bulk" className="hover:text-[#a85620]">
              Bulk Orders
            </a>
          </nav>

          <button
            onClick={() => setCartOpen(true)}
            className="relative rounded-full bg-[#171311] px-4 py-2.5 text-xs font-bold text-white transition hover:scale-105"
          >
            Cart

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d87932] text-[10px]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ================= HERO ================= */}

      <section className="overflow-hidden bg-[#151110] text-white">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="flex items-center px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
            <div className="max-w-xl">
              <div className="mb-5 inline-flex rounded-full border border-[#d9a25b]/40 bg-[#d9a25b]/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e5b66e]">
                Handcrafted in India
              </div>

              <h1 className="font-serif text-[42px] leading-[1.02] sm:text-6xl lg:text-7xl">
                Handcrafted Mithai Candles
                <br />
                <span className="text-[#e0a85b]">
                  That Feel Like Celebrations
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-7 text-white/65 sm:text-base">
                Pure soy wax candles inspired by India&apos;s most loved
                mithai — designed to look delicious, smell beautiful and
                make every celebration memorable.
              </p>

              <div className="mt-7 flex flex-wrap gap-2 text-[10px] uppercase tracking-wider text-white/60">
                <span className="rounded-full border border-white/15 px-3 py-2">
                  Pure Soy Wax
                </span>

                <span className="rounded-full border border-white/15 px-3 py-2">
                  Artisanal Shapes
                </span>

                <span className="rounded-full border border-white/15 px-3 py-2">
                  Festive Gifting
                </span>
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#collection"
                  className="rounded-full bg-[#d8792d] px-7 py-4 text-center text-sm font-bold text-white transition hover:-translate-y-0.5"
                >
                  Explore Collection
                </a>

                <a
                  href={createWhatsAppLink(
                    "Hi SWERAV's Bhashma! ✨ I'd like to explore your mithai candles."
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-bold transition hover:bg-white/10"
                >
                  Order on WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="relative min-h-[430px] overflow-hidden lg:min-h-[650px]">
            <img
              src="https://images.unsplash.com/photo-1602874801006-e26c7d7d5f65?auto=format&fit=crop&w=1400&q=90"
              alt="SWERAV's Bhashma handcrafted festive candles"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#151110] via-transparent to-black/10" />

            <div className="absolute bottom-6 left-5 right-5 rounded-2xl border border-white/15 bg-black/40 p-4 backdrop-blur-md">
              <p className="font-serif text-lg">
                Looks like mithai.
                <br />
                Smells like celebration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}

      <section className="border-b border-black/10 bg-[#ead8c2]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-black/10 sm:grid-cols-4">
          {[
            ["100%", "Organic Soy Wax"],
            ["Hand", "Poured in India"],
            ["0%", "Toxic Fragrances"],
            ["Pan India", "Delivery"],
          ].map(([title, text]) => (
            <div key={text} className="px-4 py-6 text-center">
              <div className="font-serif text-lg">{title}</div>

              <div className="mt-1 text-[9px] uppercase tracking-wider text-black/55">
                {text}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= COLLECTION ================= */}

      <section
        id="collection"
        className="px-4 py-16 sm:px-6 sm:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-9">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#ad5a26]">
              The Collection
            </p>

            <div className="flex items-end justify-between gap-5">
              <h2 className="font-serif text-4xl sm:text-5xl">
                Mithai, reimagined.
              </h2>

              <p className="hidden max-w-xs text-right text-xs leading-5 text-black/50 sm:block">
                Handcrafted pieces designed to bring the warmth of Indian
                celebrations into your space.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden bg-[#ded1c3]">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  {product.tag && (
                    <span className="absolute left-2 top-2 rounded-full bg-[#171311] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-wider text-white">
                      {product.tag}
                    </span>
                  )}
                </div>

                <div className="p-3.5 sm:p-5">
                  <h3 className="font-serif text-lg leading-tight sm:text-xl">
                    {product.name}
                  </h3>

                  <p className="mt-2 hidden text-xs leading-5 text-black/50 sm:block">
                    {product.description}
                  </p>

                  <div className="mt-3 space-y-1 text-[10px] leading-4 text-black/60">
                    <div>
                      <span className="font-semibold text-black">
                        Size:
                      </span>{" "}
                      {product.weight}
                    </div>

                    <div>
                      <span className="font-semibold text-black">
                        Scent:
                      </span>{" "}
                      {product.scent}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="font-serif text-xl">
                      {formatPrice(product.price)}
                    </span>

                    <button
                      onClick={() => addToCart(product)}
                      className="rounded-full bg-[#171311] px-3 py-2 text-[9px] font-bold text-white transition hover:bg-[#a95622] sm:px-4"
                    >
                      {addedProduct === product.id
                        ? "Added ✓"
                        : "Add to Cart"}
                    </button>
                  </div>

                  <button
                    onClick={() => buyNow(product)}
                    className="mt-2 w-full rounded-full border border-black/15 py-2.5 text-[9px] font-bold uppercase tracking-wider transition hover:bg-[#f3e9dc]"
                  >
                    Buy Now
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STORY ================= */}

      <section
        id="story"
        className="bg-[#181312] px-5 py-16 text-white sm:px-8 sm:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#dda45c]">
              More than a candle
            </p>

            <h2 className="font-serif text-4xl leading-tight sm:text-6xl">
              Your favourite
              <br />
              mithai.
              <br />
              <span className="text-[#dda45c]">
                Now a keepsake.
              </span>
            </h2>
          </div>

          <div className="max-w-lg">
            <p className="text-sm leading-7 text-white/60 sm:text-base">
              SWERAV&apos;s Bhashma transforms the visual language of
              Indian sweets into handcrafted candles. Each piece is
              created to feel nostalgic, luxurious and unmistakably
              Indian.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                "Festive Gifting",
                "Wedding Favours",
                "Corporate Gifts",
                "Home Décor",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 px-4 py-4 text-xs"
                >
                  ✦ {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= BULK ORDERS ================= */}

      <section
        id="bulk"
        className="px-4 py-16 sm:px-6 sm:py-24"
      >
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#dfc5a7]">
          <div className="grid lg:grid-cols-2">
            <div className="p-7 sm:p-12 lg:p-16">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8e461f]">
                Bulk & Corporate
              </p>

              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                Making 20, 50 or
                <br />
                500 gifts?
              </h2>

              <p className="mt-5 max-w-md text-sm leading-6 text-black/60">
                From intimate wedding favours to large corporate gifting
                orders, tell us what you&apos;re planning and we&apos;ll
                help create the right set for you.
              </p>

              <div className="mt-7 space-y-3 text-xs">
                <div>✓ Bulk pricing available</div>
                <div>✓ Custom packaging</div>
                <div>✓ Personalized gifting</div>
                <div>✓ Wedding & corporate orders</div>
              </div>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();

                const form = new FormData(event.currentTarget);

                const message = `Hi SWERAV's Bhashma! ✨

I'd like to request a bulk quote.

Name: ${form.get("bulkName")}
Quantity: ${form.get("quantity")}
Event Date: ${form.get("eventDate")}
Requirement: ${form.get("bulkMessage")}`;

                window.open(
                  createWhatsAppLink(message),
                  "_blank"
                );
              }}
              className="bg-white/50 p-6 sm:p-10"
            >
              <div className="space-y-4">
                <input
                  name="bulkName"
                  required
                  placeholder="Your Name"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-4 text-sm outline-none transition focus:border-[#ad5a26]"
                />

                <input
                  name="quantity"
                  required
                  type="number"
                  min="1"
                  placeholder="Quantity"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-4 text-sm outline-none transition focus:border-[#ad5a26]"
                />

                <input
                  name="eventDate"
                  type="date"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-4 text-sm outline-none transition focus:border-[#ad5a26]"
                />

                <textarea
                  name="bulkMessage"
                  required
                  rows={4}
                  placeholder="Tell us about your event, customization or packaging requirements..."
                  className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-4 text-sm outline-none transition focus:border-[#ad5a26]"
                />

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#171311] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#a95622]"
                >
                  Request Bulk Quote →
                </button>
              </div>

              <p className="mt-4 text-center text-[9px] text-black/45">
                We&apos;ll continue the conversation on WhatsApp.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ================= TRUST ================= */}

      <section className="border-y border-black/10 bg-[#f1e5d5] px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a85620]">
              Made with care
            </p>

            <h2 className="mt-2 font-serif text-3xl">
              Why Bhashma?
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["✦", "100% Soy Wax", "Clean-burning wax"],
              ["◌", "Hand-poured", "Made in India"],
              ["♡", "Non-Toxic", "Quality fragrances"],
              ["↗", "Pan India", "Delivery available"],
            ].map(([icon, title, text]) => (
              <div
                key={title}
                className="rounded-2xl bg-white p-5 text-center"
              >
                <div className="text-xl text-[#b35b27]">
                  {icon}
                </div>

                <div className="mt-3 text-xs font-bold">
                  {title}
                </div>

                <div className="mt-1 text-[9px] text-black/45">
                  {text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}

      <section className="bg-[#c65f27] px-5 py-16 text-center text-white sm:py-20">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
          Let&apos;s celebrate
        </p>

        <h2 className="mx-auto mt-3 max-w-2xl font-serif text-4xl leading-tight sm:text-6xl">
          A little mithai.
          <br />
          A lot of memories.
        </h2>

        <a
          href={createWhatsAppLink(
            "Hi SWERAV's Bhashma! ✨ I'd like to order some handcrafted mithai candles."
          )}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex rounded-full bg-[#171311] px-8 py-4 text-sm font-bold transition hover:scale-105"
        >
          Start Your Order on WhatsApp
        </a>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="bg-[#171311] px-5 py-12 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-3">
          <div>
            <div className="font-serif text-2xl">
              SWERAV&apos;s
            </div>

            <div className="mt-1 text-[9px] uppercase tracking-[0.35em] text-[#dc9d56]">
              Bhashma
            </div>

            <p className="mt-5 max-w-xs text-xs leading-6 text-white/45">
              Handcrafted mithai candles made for Indian celebrations,
              gifting and beautiful homes.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Explore
            </h3>

            <div className="mt-4 space-y-3 text-xs text-white/55">
              <a
                href="#collection"
                className="block hover:text-white"
              >
                Collection
              </a>

              <a href="#bulk" className="block hover:text-white">
                Bulk & Corporate
              </a>

              <a href="#" className="block hover:text-white">
                Shipping & Returns
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Connect
            </h3>

            <div className="mt-4 space-y-3 text-xs text-white/55">
              <a
                href="https://instagram.com/sweravsbhashma"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-white"
              >
                Instagram · @sweravsbhashma
              </a>

              <a
                href={createWhatsAppLink(
                  "Hi SWERAV's Bhashma! I'd like to know more about your candles."
                )}
                target="_blank"
                rel="noreferrer"
                className="block hover:text-white"
              >
                WhatsApp · Chat with us
              </a>

              <p>India · Pan India Delivery</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-[9px] text-white/30">
          © {new Date().getFullYear()} SWERAV&apos;s Bhashma. All rights
          reserved.
        </div>
      </footer>

      {/* ================= FLOATING WHATSAPP ================= */}

      <a
        href={createWhatsAppLink(
          "Hi SWERAV's Bhashma! ✨ I'd like to enquire about your candles."
        )}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#171311] text-xl text-white shadow-2xl ring-4 ring-white/70 transition hover:scale-110"
      >
        ◔
      </a>

      {/* ================= CART DRAWER ================= */}

      {cartOpen && (
        <div className="fixed inset-0 z-[100]">
          <button
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <aside className="absolute bottom-0 right-0 top-0 flex w-full max-w-md flex-col bg-[#f7f0e5] shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 p-5">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#a85620]">
                  Your Selection
                </p>

                <h2 className="mt-1 font-serif text-2xl">
                  Cart
                </h2>
              </div>

              <button
                onClick={() => setCartOpen(false)}
                className="rounded-full bg-black/5 px-4 py-2 text-xs"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="text-5xl">✦</div>

                  <h3 className="mt-4 font-serif text-2xl">
                    Your cart is empty
                  </h3>

                  <p className="mt-2 max-w-xs text-xs leading-5 text-black/45">
                    Add a little mithai magic to your celebration.
                  </p>

                  <button
                    onClick={() => {
                      setCartOpen(false);

                      document
                        .getElementById("collection")
                        ?.scrollIntoView({
                          behavior: "smooth",
                        });
                    }}
                    className="mt-6 rounded-full bg-[#171311] px-6 py-3 text-xs font-bold text-white"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-white p-3"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.image}
                          alt=""
                          className="h-20 w-20 rounded-xl object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <h3 className="font-serif text-base leading-tight">
                            {item.shortName}
                          </h3>

                          <p className="mt-2 text-xs font-semibold">
                            {formatPrice(item.price)}
                          </p>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="mt-2 text-[9px] uppercase tracking-wider text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-3">
                        <span className="text-[10px] text-black/40">
                          Quantity
                        </span>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10"
                          >
                            −
                          </button>

                          <span className="w-4 text-center text-xs font-bold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#171311] text-white"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-black/10 bg-white p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-black/50">
                    Subtotal
                  </span>

                  <span className="font-serif text-2xl">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <button
                  onClick={proceedToCheckout}
                  className="mt-4 w-full rounded-full bg-[#171311] py-4 text-sm font-bold text-white transition hover:bg-[#a95620]"
                >
                  Proceed to Buy →
                </button>

                <p className="mt-3 text-center text-[9px] text-black/40">
                  Payment will be added after final approval.
                </p>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* ================= CHECKOUT ================= */}

      {checkoutOpen && (
        <div className="fixed inset-0 z-[110] overflow-y-auto bg-[#f7f0e5]">
          <div className="mx-auto min-h-screen max-w-5xl">
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-black/10 bg-[#f7f0e5]/95 px-4 py-4 backdrop-blur-xl sm:px-6">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#a85620]">
                  SWERAV&apos;s Bhashma
                </p>

                <h2 className="font-serif text-xl">
                  Checkout
                </h2>
              </div>

              <button
                onClick={() => setCheckoutOpen(false)}
                className="rounded-full bg-black/5 px-4 py-2 text-xs"
              >
                Back
              </button>
            </div>

            {orderPlaced ? (
              <div className="flex min-h-[75vh] items-center justify-center px-5 py-12">
                <div className="max-w-md text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#dfc5a7] text-3xl">
                    ✓
                  </div>

                  <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.3em] text-[#a85620]">
                    Order Request Sent
                  </p>

                  <h1 className="mt-3 font-serif text-4xl">
                    Thank you, {customer.name.split(" ")[0]}!
                  </h1>

                  <p className="mt-5 text-sm leading-7 text-black/55">
                    Your order details have been prepared for WhatsApp.
                    SWERAV&apos;s Bhashma can now confirm availability,
                    delivery and payment with you.
                  </p>

                  <div className="mt-8 rounded-2xl bg-white p-5 text-left">
                    <div className="flex justify-between text-xs">
                      <span className="text-black/45">
                        Order value
                      </span>

                      <strong>{formatPrice(subtotal)}</strong>
                    </div>

                    <div className="mt-3 flex justify-between text-xs">
                      <span className="text-black/45">
                        Items
                      </span>

                      <strong>{cartCount}</strong>
                    </div>
                  </div>

                  <button
                    onClick={resetOrder}
                    className="mt-7 rounded-full bg-[#171311] px-7 py-4 text-sm font-bold text-white"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_380px] lg:py-12">
                {/* CUSTOMER FORM */}

                <form
                  onSubmit={handleCheckoutSubmit}
                  className="rounded-3xl bg-white p-5 shadow-sm sm:p-7"
                >
                  <div className="mb-7">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a85620]">
                      Step 1
                    </p>

                    <h1 className="mt-2 font-serif text-3xl">
                      Delivery Details
                    </h1>

                    <p className="mt-2 text-xs leading-5 text-black/45">
                      Enter your details so we can prepare your order.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider">
                        Full Name
                      </label>

                      <input
                        required
                        value={customer.name}
                        onChange={(event) =>
                          setCustomer({
                            ...customer,
                            name: event.target.value,
                          })
                        }
                        placeholder="Your full name"
                        className="w-full rounded-xl border border-black/10 bg-[#faf7f2] px-4 py-4 text-sm outline-none focus:border-[#a85620]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider">
                        Mobile Number
                      </label>

                      <input
                        required
                        type="tel"
                        pattern="[0-9]{10}"
                        value={customer.phone}
                        onChange={(event) =>
                          setCustomer({
                            ...customer,
                            phone: event.target.value,
                          })
                        }
                        placeholder="10-digit mobile number"
                        className="w-full rounded-xl border border-black/10 bg-[#faf7f2] px-4 py-4 text-sm outline-none focus:border-[#a85620]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider">
                        Full Address
                      </label>

                      <textarea
                        required
                        rows={3}
                        value={customer.address}
                        onChange={(event) =>
                          setCustomer({
                            ...customer,
                            address: event.target.value,
                          })
                        }
                        placeholder="House / Flat, Street, Area"
                        className="w-full resize-none rounded-xl border border-black/10 bg-[#faf7f2] px-4 py-4 text-sm outline-none focus:border-[#a85620]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider">
                          City
                        </label>

                        <input
                          required
                          value={customer.city}
                          onChange={(event) =>
                            setCustomer({
                              ...customer,
                              city: event.target.value,
                            })
                          }
                          placeholder="City"
                          className="w-full rounded-xl border border-black/10 bg-[#faf7f2] px-4 py-4 text-sm outline-none focus:border-[#a85620]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider">
                          State
                        </label>

                        <input
                          required
                          value={customer.state}
                          onChange={(event) =>
                            setCustomer({
                              ...customer,
                              state: event.target.value,
                            })
                          }
                          placeholder="State"
                          className="w-full rounded-xl border border-black/10 bg-[#faf7f2] px-4 py-4 text-sm outline-none focus:border-[#a85620]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider">
                        Pincode
                      </label>

                      <input
                        required
                        pattern="[0-9]{6}"
                        value={customer.pincode}
                        onChange={(event) =>
                          setCustomer({
                            ...customer,
                            pincode: event.target.value,
                          })
                        }
                        placeholder="6-digit pincode"
                        className="w-full rounded-xl border border-black/10 bg-[#faf7f2] px-4 py-4 text-sm outline-none focus:border-[#a85620]"
                      />
                    </div>
                  </div>

                  <div className="mt-7 rounded-2xl bg-[#f7f0e5] p-4">
                    <p className="text-xs font-bold">
                      Payment
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-black/45">
                      Online payment will be available here after the
                      payment gateway is connected. For now, your order
                      request will be confirmed through WhatsApp.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="mt-5 w-full rounded-full bg-[#171311] py-4 text-sm font-bold text-white transition hover:bg-[#a85620]"
                  >
                    Confirm Order on WhatsApp →
                  </button>
                </form>

                {/* ORDER SUMMARY */}

                <aside className="h-fit rounded-3xl bg-[#181312] p-5 text-white sm:p-7 lg:sticky lg:top-24">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#dda45c]">
                    Step 2
                  </p>

                  <h2 className="mt-2 font-serif text-3xl">
                    Your Order
                  </h2>

                  <div className="mt-6 space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3 border-b border-white/10 pb-4"
                      >
                        <img
                          src={item.image}
                          alt=""
                          className="h-16 w-16 rounded-xl object-cover"
                        />

                        <div className="flex-1">
                          <h3 className="text-sm">
                            {item.shortName}
                          </h3>

                          <p className="mt-1 text-[10px] text-white/45">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <div className="text-xs font-semibold">
                          {formatPrice(
                            item.price * item.quantity
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3 border-b border-white/10 pb-5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-white/45">
                        Items
                      </span>

                      <span>{cartCount}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-white/45">
                        Delivery
                      </span>

                      <span>Confirmed on WhatsApp</span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm text-white/50">
                      Total
                    </span>

                    <span className="font-serif text-3xl">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] font-bold">
                      🔒 Secure order process
                    </p>

                    <p className="mt-1 text-[9px] leading-5 text-white/40">
                      Your details are used only to process this order
                      request.
                    </p>
                  </div>
                </aside>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
         }
