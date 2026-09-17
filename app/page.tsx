"use client";

import {
  FormEvent,
  ReactNode,
  useMemo,
  useState,
} from "react";

/* =========================================================
   SWERAV'S BHASHMA
   Premium Mithai Candle Store
   ========================================================= */

const WHATSAPP_NUMBER = "919999999999";

const PRODUCTS = [
  {
    id: 1,
    name: "Motichoor Laddoo Candle",
    price: 449,
    size: "Approx. 120g",
    scent: "Saffron • Cardamom • Vanilla",
    tag: "Bestseller",
    description:
      "A hyper-realistic festive laddoo, handcrafted from premium soy wax.",
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=90&w=1200",
    fallback:
      "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&q=90&w=1200",
  },
  {
    id: 2,
    name: "Motichoor Laddoo Set of 4",
    price: 1499,
    size: "Approx. 480g",
    scent: "Saffron • Cardamom • Vanilla",
    tag: "Gift Set",
    description:
      "Four handcrafted mithai candles made for gifting and celebrations.",
    image:
      "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&q=90&w=1200",
    fallback:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=90&w=1200",
  },
  {
    id: 3,
    name: "Kaju Katli Tray Set",
    price: 1299,
    size: "Approx. 350g",
    scent: "Almond • Vanilla • Rose",
    tag: "Premium",
    description:
      "Creamy diamond-shaped candles finished with elegant gold-leaf detailing.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=90&w=1200",
    fallback:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=90&w=1200",
  },
  {
    id: 4,
    name: "Jalebi / Imarti Festive Candle",
    price: 549,
    size: "Approx. 150g",
    scent: "Rose • Saffron • Vanilla",
    tag: "Festive",
    description:
      "Intricately handcrafted spiral mithai-inspired soy wax candle.",
    image:
      "https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&q=90&w=1200",
    fallback:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=90&w=1200",
  },
  {
    id: 5,
    name: "Diwali Luxury Gift Box",
    price: 1999,
    size: "Customizable",
    scent: "Choose your fragrance",
    tag: "Customizable",
    description:
      "A luxurious festive hamper for family, clients and loved ones.",
    image:
      "https://images.unsplash.com/photo-1603905179139-db12ab5354f5?auto=format&fit=crop&q=90&w=1200",
    fallback:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=90&w=1200",
  },
  {
    id: 6,
    name: "Wedding Favour Box",
    price: 249,
    size: "From 50g each",
    scent: "Custom fragrance",
    tag: "Bulk",
    description:
      "Personalized mithai candles created specially for weddings and events.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=90&w=1200",
    fallback:
      "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&q=90&w=1200",
  },
];

type Product = (typeof PRODUCTS)[number];

type CartItem = Product & {
  quantity: number;
};

type Customer = {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

const EMPTY_CUSTOMER: Customer = {
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

function formatPrice(price: number) {
  return `₹${price.toLocaleString("en-IN")}`;
}

function createWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}

/* =========================================================
   ICONS
   ========================================================= */

function ArrowUpRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function ShoppingBagIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path d="M5 8.5h14l-1 11H6l-1-11Z" />
      <path d="M9 9V6.8a3 3 0 0 1 6 0V9" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.7" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" />
      <path d="M9 8.5c.2-.4.5-.5.8-.3l1 .7c.3.2.3.5.1.8l-.4.6c.7 1.1 1.6 1.9 2.8 2.4l.5-.5c.2-.2.5-.2.8 0l1 .6c.3.2.3.5.2.8-.4.8-1 1.2-1.8 1.1-2.1-.3-5.2-2.7-6-4.9-.3-.7-.2-1.2.3-1.3Z" />
    </svg>
  );
}

/* =========================================================
   IMAGE COMPONENT
   ========================================================= */

function ProductImage({
  src,
  fallback,
  alt,
  priority = false,
}: {
  src: string;
  fallback: string;
  alt: string;
  priority?: boolean;
}) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#efe3d0]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,220,146,0.45),transparent_45%),linear-gradient(145deg,#ead9bd,#cba878)]" />

      <img
        src={imageSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        onError={() => {
          if (imageSrc !== fallback) {
            setImageSrc(fallback);
          }
        }}
        className="relative z-10 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
      />

      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
   ========================================================= */

function SectionLabel({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div
      className={`mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] ${
        light ? "text-[#e9bd72]" : "text-[#b87520]"
      }`}
    >
      <span className="h-px w-7 bg-current" />
      {children}
    </div>
  );
}

function TrustPill({
  children,
  icon,
}: {
  children: ReactNode;
  icon: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-2 text-[11px] font-medium text-[#29221c] shadow-sm backdrop-blur">
      <span className="text-[#b66d1d]">{icon}</span>
      {children}
    </div>
  );
}

/* =========================================================
   MAIN PAGE
   ========================================================= */

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customer, setCustomer] = useState<Customer>(EMPTY_CUSTOMER);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [bulkSent, setBulkSent] = useState(false);

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cart]
  );

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  function addToCart(product: Product) {
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

    setCartOpen(true);
  }

  function buyNow(product: Product) {
    setCart([{ ...product, quantity: 1 }]);
    setCheckoutOpen(true);
    setCartOpen(false);
  }

  function changeQuantity(id: number, amount: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(0, item.quantity + amount),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(id: number) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  function openCheckout() {
    if (!cart.length) return;

    setCartOpen(false);
    setCheckoutOpen(true);
    setOrderPlaced(false);
  }

  function handleCheckoutSubmit(event: FormEvent<HTMLFormElement>) {
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
  }

  function handleBulkSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const name = String(form.get("name") || "");
    const quantity = String(form.get("quantity") || "");
    const eventDate = String(form.get("eventDate") || "");
    const requirement = String(form.get("requirement") || "");

    const message = `Hi SWERAV's Bhashma! ✨

I want to enquire about a bulk/corporate order.

Name: ${name}
Quantity: ${quantity}
Event Date: ${eventDate}

Requirement:
${requirement}

Please share pricing and customization options.`;

    window.open(createWhatsAppLink(message), "_blank");
    setBulkSent(true);
  }

  function scrollTo(id: string) {
    setMobileMenu(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f0e4] text-[#17120e]">
      {/* =====================================================
          ANNOUNCEMENT
          ===================================================== */}

      <div className="bg-[#17120e] px-4 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f4d29a]">
        Handcrafted in India · Festive gifting · Pan India delivery
      </div>

      {/* =====================================================
          NAVBAR
          ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f7f0e4]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <button
            onClick={() => scrollTo("home")}
            className="group text-left"
          >
            <div className="text-[16px] font-semibold tracking-[-0.04em] sm:text-[18px]">
              SWERAV&apos;s
            </div>
            <div className="-mt-0.5 text-[10px] font-bold uppercase tracking-[0.34em] text-[#a8661d]">
              Bhashma
            </div>
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => scrollTo("collection")}
              className="text-xs font-medium text-black/65 transition hover:text-[#b66d1d]"
            >
              Collection
            </button>

            <button
              onClick={() => scrollTo("story")}
              className="text-xs font-medium text-black/65 transition hover:text-[#b66d1d]"
            >
              Our Story
            </button>

            <button
              onClick={() => scrollTo("bulk")}
              className="text-xs font-medium text-black/65 transition hover:text-[#b66d1d]"
            >
              Bulk & Corporate
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex h-11 items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 text-xs font-semibold shadow-sm transition hover:border-[#b87520]/40 hover:bg-white"
            >
              <ShoppingBagIcon />
              <span className="hidden sm:inline">Cart</span>

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b86c1b] px-1 text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenu((value) => !value)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/60 md:hidden"
              aria-label="Open menu"
            >
              <div className="space-y-1.5">
                <span className="block h-px w-4 bg-black" />
                <span className="block h-px w-4 bg-black" />
              </div>
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="border-t border-black/5 bg-[#f7f0e4] px-5 py-5 md:hidden">
            <div className="flex flex-col gap-1">
              <button
                onClick={() => scrollTo("collection")}
                className="rounded-xl px-4 py-3 text-left text-sm font-medium hover:bg-white"
              >
                Collection
              </button>
              <button
                onClick={() => scrollTo("story")}
                className="rounded-xl px-4 py-3 text-left text-sm font-medium hover:bg-white"
              >
                Our Story
              </button>
              <button
                onClick={() => scrollTo("bulk")}
                className="rounded-xl px-4 py-3 text-left text-sm font-medium hover:bg-white"
              >
                Bulk & Corporate
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =====================================================
          HERO
          ===================================================== */}

      <section
        id="home"
        className="relative overflow-hidden bg-[#17120e] text-white"
      >
        <div className="absolute -left-28 -top-32 h-80 w-80 rounded-full bg-[#c8751d]/20 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[#dcae5f]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_0.82fr] lg:gap-16 lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e7bb76]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e7a64c]" />
              Handcrafted Indian celebrations
            </div>

            <h1 className="max-w-[700px] text-[46px] font-medium leading-[0.95] tracking-[-0.055em] sm:text-[68px] lg:text-[78px]">
              Mithai
              <br />
              <span className="font-serif italic text-[#e4b86f]">
                that glows.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-[15px] leading-7 text-white/65 sm:text-[17px]">
              Handcrafted soy wax candles inspired by India&apos;s most loved
              mithai — made to look delicious, smell beautiful and turn every
              celebration into a memory.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => scrollTo("collection")}
                className="group flex h-13 items-center justify-center gap-3 rounded-full bg-[#d99035] px-6 text-sm font-bold text-[#17120e] shadow-[0_15px_40px_rgba(217,144,53,0.2)] transition hover:-translate-y-0.5 hover:bg-[#e5a34e]"
              >
                Explore Collection
                <ArrowRightIcon />
              </button>

              <a
                href={createWhatsAppLink(
                  "Hi SWERAV's Bhashma! ✨ I would like to know more about your handcrafted mithai candles."
                )}
                target="_blank"
                rel="noreferrer"
                className="flex h-13 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition hover:border-[#e7bb76]/50 hover:bg-white/10"
              >
                <WhatsAppIcon />
                Order on WhatsApp
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-2">
              <TrustPill icon="✦">100% Soy Wax</TrustPill>
              <TrustPill icon="✦">Hand Poured</TrustPill>
              <TrustPill icon="✦">Made in India</TrustPill>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[500px] lg:ml-auto">
            <div className="absolute -inset-5 rounded-[36px] bg-[#b87520]/10 blur-2xl" />

            <div className="relative aspect-[0.88] overflow-hidden rounded-[28px] border border-white/10 bg-[#3a2718] shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
              <ProductImage
                src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=95&w=1400"
                fallback="https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&q=95&w=1400"
                alt="Warm handcrafted candle"
                priority
              />

              <div className="absolute bottom-4 left-4 right-4 z-30 rounded-2xl border border-white/15 bg-black/35 p-4 backdrop-blur-xl">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#e8bd77]">
                      The Bhashma feeling
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">
                      Looks like mithai. Feels like celebration.
                    </p>
                  </div>

                  <span className="text-2xl text-[#e7b96e]">✦</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bottom gold line */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#c8924d]/50 to-transparent" />
      </section>

      {/* =====================================================
          TRUST STRIP
          ===================================================== */}

      <section className="border-b border-black/5 bg-[#f1e7d8]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-black/10 sm:grid-cols-4">
          {[
            ["01", "100%", "Soy Wax"],
            ["02", "Hand", "Poured"],
            ["03", "0%", "Harsh Fragrances"],
            ["04", "Pan India", "Delivery"],
          ].map(([number, title, subtitle]) => (
            <div
              key={number}
              className="px-4 py-6 text-center sm:px-5 sm:py-7"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#b87520]">
                {number}
              </p>
              <p className="mt-2 text-[15px] font-semibold">{title}</p>
              <p className="mt-0.5 text-[10px] text-black/50">
                {subtitle}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          COLLECTION
          ===================================================== */}

      <section
        id="collection"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 py-16 sm:px-8 sm:py-24 lg:px-10"
      >
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>Shop the collection</SectionLabel>

            <h2 className="max-w-2xl text-[38px] font-medium leading-[1] tracking-[-0.045em] sm:text-[52px]">
              Mithai,
              <br />
              <span className="font-serif italic text-[#b87520]">
                reimagined.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-black/55">
            Handcrafted pieces designed to bring the warmth of Indian
            celebrations into your space.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, index) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-[24px] border border-black/7 bg-[#fffaf3] shadow-[0_8px_30px_rgba(67,40,16,0.05)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(67,40,16,0.13)]"
            >
              <div className="relative aspect-[0.94] overflow-hidden">
                <ProductImage
                  src={product.image}
                  fallback={product.fallback}
                  alt={product.name}
                />

                <div className="absolute left-4 top-4 z-30 rounded-full border border-white/30 bg-[#17120e]/70 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md">
                  {product.tag}
                </div>

                <div className="absolute bottom-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#17120e] opacity-0 shadow-lg transition duration-300 group-hover:opacity-100">
                  <ArrowUpRightIcon />
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.02em]">
                      {product.name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-5 text-black/50">
                      {product.description}
                    </p>
                  </div>

                  <p className="shrink-0 text-[17px] font-bold text-[#a96117]">
                    {formatPrice(product.price)}
                  </p>
                </div>

                <div className="mt-5 space-y-2 border-t border-black/7 pt-4">
                  <div className="flex justify-between gap-3 text-[11px]">
                    <span className="text-black/40">Size</span>
                    <span className="font-medium">{product.size}</span>
                  </div>

                  <div className="flex justify-between gap-3 text-[11px]">
                    <span className="text-black/40">Scent</span>
                    <span className="text-right font-medium">
                      {product.scent}
                    </span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="h-11 rounded-full border border-[#b87520]/30 bg-transparent text-xs font-bold text-[#8f5616] transition hover:border-[#b87520] hover:bg-[#b87520] hover:text-white"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => buyNow(product)}
                    className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#17120e] px-4 text-xs font-bold text-white transition hover:bg-[#b87520]"
                  >
                    Buy
                    <ArrowRightIcon />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =====================================================
          STORY
          ===================================================== */}

      <section
        id="story"
        className="scroll-mt-20 border-y border-black/5 bg-[#eee2d1]"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:px-10">
          <div className="relative overflow-hidden rounded-[28px] bg-[#c49b64] shadow-[0_25px_70px_rgba(61,35,12,0.14)]">
            <div className="aspect-[1/1.02]">
              <ProductImage
                src="https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&q=90&w=1200"
                fallback="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=90&w=1200"
                alt="Handcrafted candles"
              />
            </div>

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-black/45 p-5 text-white backdrop-blur-xl">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#e8bd77]">
                More than a candle
              </p>
              <p className="mt-1 text-lg font-medium">
                Your favourite mithai. Now a keepsake.
              </p>
            </div>
          </div>

          <div className="lg:pl-8">
            <SectionLabel>Our story</SectionLabel>

            <h2 className="text-[39px] font-medium leading-[1] tracking-[-0.045em] sm:text-[52px]">
              Nostalgia,
              <br />
              <span className="font-serif italic text-[#b87520]">
                handcrafted.
              </span>
            </h2>

            <div className="mt-7 space-y-5 text-sm leading-7 text-black/60">
              <p>
                SWERAV&apos;s Bhashma transforms the visual language of Indian
                sweets into handcrafted soy wax candles.
              </p>

              <p>
                Every piece is designed to feel nostalgic, luxurious and
                unmistakably Indian — bringing the warmth of festivals,
                weddings and family celebrations into beautiful spaces.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                "Festive Gifting",
                "Wedding Favours",
                "Corporate Gifts",
                "Home Décor",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-black/7 bg-white/50 px-4 py-4 text-xs font-semibold"
                >
                  <span className="mr-2 text-[#b87520]">✦</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BULK
          ===================================================== */}

      <section
        id="bulk"
        className="scroll-mt-20 bg-[#17120e] text-white"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.85fr_1fr] lg:px-10">
          <div>
            <SectionLabel light>Bulk & corporate</SectionLabel>

            <h2 className="max-w-xl text-[42px] font-medium leading-[0.98] tracking-[-0.045em] sm:text-[58px]">
              Making 20,
              <br />
              50 or{" "}
              <span className="font-serif italic text-[#e3b66c]">
                500 gifts?
              </span>
            </h2>

            <p className="mt-7 max-w-lg text-sm leading-7 text-white/55">
              From intimate wedding favours to large corporate gifting
              orders, tell us what you&apos;re planning and we&apos;ll help
              create the right set for you.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Bulk pricing available",
                "Custom packaging",
                "Personalized gifting",
                "Wedding & corporate orders",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-white/75"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#b87520]/15 text-[11px] text-[#e6b76c]">
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.2)] sm:p-7">
            {bulkSent ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#b87520]/15 text-2xl text-[#e7b96e]">
                  ✓
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  Enquiry sent
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-white/50">
                  WhatsApp has been opened so our team can continue the
                  conversation with you.
                </p>

                <button
                  onClick={() => setBulkSent(false)}
                  className="mt-7 rounded-full border border-white/10 px-5 py-3 text-xs font-semibold hover:bg-white/5"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleBulkSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                    Your name
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="Enter your name"
                    className="h-13 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#c98a3c]"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                      Quantity
                    </label>
                    <input
                      name="quantity"
                      required
                      type="number"
                      min="1"
                      placeholder="e.g. 100"
                      className="h-13 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#c98a3c]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                      Event date
                    </label>
                    <input
                      name="eventDate"
                      type="date"
                      className="h-13 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white outline-none focus:border-[#c98a3c]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                    Requirement
                  </label>
                  <textarea
                    name="requirement"
                    required
                    rows={5}
                    placeholder="Tell us about packaging, personalization, fragrance, event, logo branding etc."
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#c98a3c]"
                  />
                </div>

                <button
                  type="submit"
                  className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#d99035] text-sm font-bold text-[#17120e] transition hover:bg-[#e5a34e]"
                >
                  Request Bulk Quote
                  <ArrowUpRightIcon />
                </button>

                <p className="text-center text-[10px] text-white/30">
                  We&apos;ll continue the conversation on WhatsApp.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY BHASHMA
          ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="text-center">
          <SectionLabel>Made with care</SectionLabel>

          <h2 className="text-[39px] font-medium leading-none tracking-[-0.045em] sm:text-[52px]">
            Why <span className="font-serif italic text-[#b87520]">Bhashma?</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "✦",
              title: "100% Soy Wax",
              text: "Clean-burning wax chosen for a beautiful candle experience.",
            },
            {
              icon: "◌",
              title: "Hand-poured",
              text: "Every piece receives careful handcrafted attention.",
            },
            {
              icon: "♡",
              title: "Quality Fragrance",
              text: "Thoughtfully selected fragrance profiles for gifting.",
            },
            {
              icon: "↗",
              title: "Pan India",
              text: "Delivery available across India for celebrations.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[24px] border border-black/7 bg-[#fffaf3] p-6 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#b87520]/10 text-lg text-[#a96117]">
                {item.icon}
              </div>

              <h3 className="mt-6 text-base font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-6 text-black/50">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
          ===================================================== */}

      <section className="px-5 pb-10 sm:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-[#d9b06c] px-6 py-14 text-center sm:px-10 sm:py-20">
          <div className="absolute -left-20 -top-24 h-60 w-60 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-10 h-60 w-60 rounded-full bg-[#8d4e14]/15 blur-3xl" />

          <div className="relative">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#6f4217]">
              Let&apos;s celebrate
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-[40px] font-medium leading-[0.98] tracking-[-0.05em] text-[#21170e] sm:text-[60px]">
              A little mithai.
              <br />
              <span className="font-serif italic">A lot of memories.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-[#4e351e]/70">
              Bring something unexpected to your next celebration.
            </p>

            <a
              href={createWhatsAppLink(
                "Hi SWERAV's Bhashma! ✨ I would like to start an order."
              )}
              target="_blank"
              rel="noreferrer"
              className="mx-auto mt-7 flex h-13 w-fit items-center gap-2 rounded-full bg-[#17120e] px-7 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#2c2119]"
            >
              <WhatsAppIcon />
              Start Your Order
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer className="border-t border-black/7 bg-[#f1e7d8]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr]">
            <div>
              <div className="text-xl font-semibold tracking-[-0.04em]">
                SWERAV&apos;s
              </div>

              <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.34em] text-[#a8661d]">
                Bhashma
              </div>

              <p className="mt-5 max-w-sm text-sm leading-6 text-black/50">
                Handcrafted mithai candles made for Indian celebrations,
                gifting and beautiful homes.
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                Explore
              </p>

              <div className="mt-4 space-y-3">
                <button
                  onClick={() => scrollTo("collection")}
                  className="block text-sm text-black/65 hover:text-[#b87520]"
                >
                  Collection
                </button>

                <button
                  onClick={() => scrollTo("bulk")}
                  className="block text-sm text-black/65 hover:text-[#b87520]"
                >
                  Bulk & Corporate
                </button>

                <button
                  onClick={() => scrollTo("story")}
                  className="block text-sm text-black/65 hover:text-[#b87520]"
                >
                  Our Story
                </button>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                Connect
              </p>

              <div className="mt-4 space-y-3">
                <a
                  href="https://instagram.com/sweravsbhashma"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-black/65 hover:text-[#b87520]"
                >
                  <InstagramIcon />
                  @sweravsbhashma
                </a>

                <a
                  href={createWhatsAppLink(
                    "Hi SWERAV's Bhashma! ✨"
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-black/65 hover:text-[#b87520]"
                >
                  <WhatsAppIcon />
                  Chat with us
                </a>

                <p className="pt-2 text-xs text-black/40">
                  India · Pan India Delivery
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-black/7 pt-6 text-center text-[10px] text-black/35">
            © 2026 SWERAV&apos;s Bhashma. All rights reserved.
          </div>
        </div>
      </footer>

      {/* =====================================================
          FLOATING WHATSAPP
          ===================================================== */}

      <a
        href={createWhatsAppLink(
          "Hi SWERAV's Bhashma! ✨ I would like to know more about your candles."
        )}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#17120e] text-white shadow-[0_12px_35px_rgba(0,0,0,0.22)] transition hover:-translate-y-1 hover:bg-[#b87520]"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon />
      </a>

      {/* =====================================================
          CART DRAWER
          ===================================================== */}

      {cartOpen && (
        <div className="fixed inset-0 z-[80]">
          <button
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <aside className="absolute bottom-0 right-0 top-0 flex w-full max-w-[460px] flex-col bg-[#fffaf3] shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/7 px-5 py-5 sm:px-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b87520]">
                  Your selection
                </p>
                <h2 className="mt-1 text-xl font-semibold">
                  Cart
                </h2>
              </div>

              <button
                onClick={() => setCartOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/8 hover:bg-black/5"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
              {!cart.length ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ead9bd]">
                    <ShoppingBagIcon />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    Your cart is empty
                  </h3>

                  <p className="mt-2 max-w-xs text-xs leading-5 text-black/45">
                    Choose a handcrafted mithai candle and bring some
                    celebration home.
                  </p>

                  <button
                    onClick={() => {
                      setCartOpen(false);
                      scrollTo("collection");
                    }}
                    className="mt-6 rounded-full bg-[#17120e] px-5 py-3 text-xs font-bold text-white"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-black/7 bg-white p-3"
                    >
                      <div className="flex gap-3">
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#ead9bd]">
                          <ProductImage
                            src={item.image}
                            fallback={item.fallback}
                            alt={item.name}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between gap-3">
                            <h3 className="text-sm font-semibold leading-5">
                              {item.name}
                            </h3>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-black/30 hover:text-red-600"
                              aria-label={`Remove ${item.name}`}
                            >
                              <CloseIcon />
                            </button>
                          </div>

                          <p className="mt-1 text-xs font-semibold text-[#a96117]">
                            {formatPrice(item.price)}
                          </p>

                          <div className="mt-3 flex items-center gap-2">
                            <button
                              onClick={() =>
                                changeQuantity(item.id, -1)
                              }
                              className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10"
                            >
                              <MinusIcon />
                            </button>

                            <span className="w-5 text-center text-xs font-semibold">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                changeQuantity(item.id, 1)
                              }
                              className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10"
                            >
                              <PlusIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-black/7 bg-[#f7f0e4] px-5 py-5 sm:px-7">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-black/45">
                    Subtotal
                  </span>
                  <span className="text-lg font-bold">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <p className="mt-2 text-[10px] leading-4 text-black/40">
                  Shipping and final customization details will be confirmed
                  before payment.
                </p>

                <button
                  onClick={openCheckout}
                  className="mt-4 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#17120e] text-sm font-bold text-white transition hover:bg-[#b87520]"
                >
                  Proceed to Buy
                  <ArrowRightIcon />
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* =====================================================
          CHECKOUT
          ===================================================== */}

      {checkoutOpen && (
        <div className="fixed inset-0 z-[90] overflow-y-auto bg-[#17120e]/70 p-3 backdrop-blur-md sm:p-6">
          <div className="mx-auto min-h-full max-w-5xl py-2 sm:py-6">
            <div className="overflow-hidden rounded-[28px] bg-[#fffaf3] shadow-2xl">
              <div className="flex items-center justify-between border-b border-black/7 px-5 py-5 sm:px-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b87520]">
                    Secure order
                  </p>
                  <h2 className="mt-1 text-xl font-semibold">
                    Checkout
                  </h2>
                </div>

                <button
                  onClick={() => setCheckoutOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/8"
                >
                  <CloseIcon />
                </button>
              </div>

              {orderPlaced ? (
                <div className="px-6 py-20 text-center sm:px-10">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#b87520]/10 text-3xl text-[#b87520]">
                    ✓
                  </div>

                  <h2 className="mt-7 text-3xl font-semibold">
                    Order request sent
                  </h2>

                  <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-black/50">
                    WhatsApp has been opened with your order details. The
                    Bhashma team can now confirm availability, shipping and
                    payment details with you.
                  </p>

                  <button
                    onClick={() => {
                      setCheckoutOpen(false);
                      setOrderPlaced(false);
                    }}
                    className="mt-8 rounded-full bg-[#17120e] px-7 py-3.5 text-sm font-bold text-white"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleCheckoutSubmit}
                  className="grid lg:grid-cols-[1fr_0.7fr]"
                >
                  <div className="border-b border-black/7 p-5 sm:p-8 lg:border-b-0 lg:border-r">
                    <h3 className="text-lg font-semibold">
                      Customer details
                    </h3>

                    <p className="mt-1 text-xs text-black/45">
                      Enter your details so we can confirm your order on
                      WhatsApp.
                    </p>

                    <div className="mt-7 space-y-4">
                      <div>
                        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">
                          Full name
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
                          className="h-13 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#b87520]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">
                          Mobile number
                        </label>
                        <input
                          required
                          type="tel"
                          value={customer.phone}
                          onChange={(event) =>
                            setCustomer({
                              ...customer,
                              phone: event.target.value,
                            })
                          }
                          placeholder="10-digit mobile number"
                          className="h-13 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#b87520]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">
                          Full address
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
                          placeholder="House / flat, street, area"
                          className="w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-4 text-sm outline-none transition focus:border-[#b87520]"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">
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
                            className="h-13 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#b87520]"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">
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
                            className="h-13 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#b87520]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">
                          Pincode
                        </label>
                        <input
                          required
                          inputMode="numeric"
                          value={customer.pincode}
                          onChange={(event) =>
                            setCustomer({
                              ...customer,
                              pincode: event.target.value,
                            })
                          }
                          placeholder="6-digit pincode"
                          className="h-13 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#b87520]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#f7f0e4] p-5 sm:p-8">
                    <h3 className="text-lg font-semibold">
                      Order summary
                    </h3>

                    <div className="mt-6 space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between gap-4 border-b border-black/7 pb-3"
                        >
                          <div>
                            <p className="text-xs font-semibold">
                              {item.name}
                            </p>
                            <p className="mt-1 text-[10px] text-black/40">
                              Qty: {item.quantity}
                            </p>
                          </div>

                          <p className="text-xs font-bold">
                            {formatPrice(
                              item.price * item.quantity
                            )}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5">
                      <span className="text-xs text-black/45">
                        Subtotal
                      </span>

                      <span className="text-xl font-bold">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    <div className="mt-5 rounded-2xl border border-[#b87520]/15 bg-[#b87520]/7 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#a96117]">
                        Payment
                      </p>

                      <p className="mt-2 text-xs leading-5 text-black/50">
                        Online payment will be added after the payment gateway
                        is connected. For now, confirm your order on WhatsApp
                        and the team will share payment details.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#17120e] text-sm font-bold text-white transition hover:bg-[#b87520]"
                    >
                      Confirm Order on WhatsApp
                      <WhatsAppIcon />
                    </button>

                    <p className="mt-3 text-center text-[10px] leading-4 text-black/35">
                      By continuing, you&apos;ll be redirected to WhatsApp
                      with your order summary.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
      }
