import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiShoppingCart, FiZap, FiShield, FiTruck, FiRefreshCw, FiStar } from 'react-icons/fi';
import Navbar from '../components/common/Navbar';
import Footer from '../components/footer/Footer';
import FadingLoader from '../components/loader/FadingLoader';
import { getHearingAidById } from '../api/api';
import useCart from '../hooks/useCart';
import useAlert from '../hooks/useAlert';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showAlert } = useAlert();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getHearingAidById(id);
        const item = response?.data;

        if (!item) {
          setError('Product not found.');
          return;
        }

        setProduct(item);
        setActiveImage(item.image);
      } catch (err) {
        setError(err?.response?.data?.message || 'Unable to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const galleryImages = useMemo(() => {
    if (!product?.image) return [];
    return [product.image, product.image, product.image];
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      _id: product._id,
      image: product.image,
      brand: product.brand,
      model: product.model,
      color: product.color,
      price: product.price,
      description: product.description,
    });
    showAlert({
      type: 'success',
      title: 'Item added to cart',
      message: `${product.brand} ${product.model} has been added.`,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    showAlert({
      type: 'info',
      title: 'Proceeding to checkout',
      message: 'Complete your order details on the checkout page.',
      duration: 2600,
    });
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8 md:py-12">
        {loading && (
          <div className="flex items-center justify-center h-[60vh]">
            <FadingLoader />
          </div>
        )}

        {!loading && error && (
          <div className="mx-auto max-w-xl rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
            <p className="text-red-600 font-semibold">{error}</p>
            <button
              onClick={() => navigate('/hearing-aids')}
              className="mt-4 rounded-lg bg-pink-500 px-4 py-2 text-white hover:bg-pink-600"
            >
              Back to Products
            </button>
          </div>
        )}

        {!loading && !error && product && (
          <>
            <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-[5rem_1fr]">
                  <div className="order-2 flex gap-3 overflow-x-auto pb-2 md:order-1 md:flex-col md:overflow-visible">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={`${img}-${idx}`}
                        onClick={() => setActiveImage(img)}
                        className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white ${
                          activeImage === img ? 'border-pink-500' : 'border-gray-200'
                        }`}
                      >
                        <img src={img} alt={`${product.brand} ${product.model} ${idx + 1}`} className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>

                  <div className="order-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg md:order-2">
                    <img
                      src={activeImage || product.image}
                      alt={`${product.brand} ${product.model}`}
                      className="h-[22rem] w-full object-contain p-6 md:h-[30rem]"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-600">Uphar Exclusive</p>
                <h1 className="mt-2 text-3xl font-extrabold text-gray-900 md:text-4xl">
                  {product.brand} {product.model}
                </h1>

                <div className="mt-3 flex items-center gap-2 text-yellow-500">
                  <FiStar className="fill-yellow-400" />
                  <FiStar className="fill-yellow-400" />
                  <FiStar className="fill-yellow-400" />
                  <FiStar className="fill-yellow-400" />
                  <FiStar />
                  <span className="ml-1 text-sm font-medium text-gray-500">4.2 (128 reviews)</span>
                </div>

                <div className="mt-6 flex items-end gap-3">
                  <span className="text-4xl font-black text-gray-900">₹{Number(product.price).toLocaleString()}</span>
                  <span className="rounded bg-pink-100 px-2 py-1 text-xs font-bold text-pink-600">Best Price</span>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                    Color: {product.color}
                  </span>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    In Stock
                  </span>
                </div>

                <p className="mt-6 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-600">
                  {product.description || 'Advanced hearing solution designed for clear, natural sound and all-day comfort.'}
                </p>

                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    onClick={handleBuyNow}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-pink-500 px-4 py-3 font-bold text-white transition hover:bg-pink-600"
                  >
                    <FiZap /> Buy Now
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-pink-500 px-4 py-3 font-bold text-pink-600 transition hover:bg-pink-50"
                  >
                    <FiShoppingCart /> Add to Cart
                  </button>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-gray-200 bg-white p-3 text-center">
                    <FiShield className="mx-auto text-pink-500" />
                    <p className="mt-2 text-xs font-semibold text-gray-700">1 Year Warranty</p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3 text-center">
                    <FiTruck className="mx-auto text-pink-500" />
                    <p className="mt-2 text-xs font-semibold text-gray-700">Fast Delivery</p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3 text-center">
                    <FiRefreshCw className="mx-auto text-pink-500" />
                    <p className="mt-2 text-xs font-semibold text-gray-700">Easy Returns</p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3 text-center">
                    <FiShoppingCart className="mx-auto text-pink-500" />
                    <p className="mt-2 text-xs font-semibold text-gray-700">Secure Checkout</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="text-lg font-bold text-gray-900">Product Specifications</h3>
                <ul className="mt-4 space-y-3 text-sm text-gray-600">
                  <li className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span>Brand</span>
                    <span className="font-medium text-gray-900">{product.brand}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span>Model</span>
                    <span className="font-medium text-gray-900">{product.model}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span>Color</span>
                    <span className="font-medium text-gray-900">{product.color}</span>
                  </li>
                  <li className="flex items-center justify-between pb-2">
                    <span>Category</span>
                    <span className="font-medium text-gray-900">Hearing Aid</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="text-lg font-bold text-gray-900">Why Buy From Uphar</h3>
                <ul className="mt-4 space-y-3 text-sm text-gray-600">
                  <li>Expert clinic guidance and fitting support.</li>
                  <li>Trusted brands with verified quality checks.</li>
                  <li>Post-purchase support for tuning and servicing.</li>
                  <li>Secure payments and transparent checkout.</li>
                </ul>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
