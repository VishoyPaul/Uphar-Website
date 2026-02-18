import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/common/Navbar';
import { IoSearch } from "react-icons/io5";
import Footer from '../components/footer/Footer';
import FadingLoader from '../components/loader/FadingLoader';
import Hearingfilter from '../hearingaids/Hearingfilter';
import HearingAidCard from '../components/hearingaidscard/HearingAidCard';
import { getHearingAids } from '../api/api';

const Hearingaids = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [hearingAids, setHearingAids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    color: [],
    price: [],
  });

  const priceRanges = useMemo(
    () => [
      { value: "under-10000", label: "Under Rs 10,000", matcher: (price) => price < 10000 },
      {
        value: "10000-25000",
        label: "Rs 10,000 - Rs 25,000",
        matcher: (price) => price >= 10000 && price <= 25000,
      },
      { value: "above-25000", label: "Above Rs 25,000", matcher: (price) => price > 25000 },
    ],
    []
  );

  const fetchData = async () => {
    try {
      const response = await getHearingAids();
      console.log('Data from API:', response);

      setHearingAids(response.data || []);

    } catch (error) {
      console.log('Something went wrong:', error);

    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchData();
  }, []);

  const filterOptions = useMemo(() => {
    const brands = [...new Set(hearingAids.map((item) => item.brand).filter(Boolean))].sort();
    const colors = [...new Set(hearingAids.map((item) => item.color).filter(Boolean))].sort();

    return {
      brand: brands.map((brand) => ({ value: brand, label: brand })),
      color: colors.map((color) => ({ value: color, label: color })),
      price: priceRanges.map(({ value, label }) => ({ value, label })),
    };
  }, [hearingAids, priceRanges]);

  const onToggleFilter = (section, value) => {
    setSelectedFilters((prev) => {
      const exists = prev[section].includes(value);
      return {
        ...prev,
        [section]: exists
          ? prev[section].filter((item) => item !== value)
          : [...prev[section], value],
      };
    });
  };

  const onClearFilters = () => {
    setSelectedFilters({
      brand: [],
      color: [],
      price: [],
    });
  };

  const filteredHearingAids = hearingAids.filter((item) => {
    const matchesSearch =
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.color.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBrand =
      selectedFilters.brand.length === 0 || selectedFilters.brand.includes(item.brand);

    const matchesColor =
      selectedFilters.color.length === 0 || selectedFilters.color.includes(item.color);

    const matchesPrice =
      selectedFilters.price.length === 0 ||
      selectedFilters.price.some((rangeKey) => {
        const range = priceRanges.find((option) => option.value === rangeKey);
        return range ? range.matcher(Number(item.price)) : false;
      });

    return matchesSearch && matchesBrand && matchesColor && matchesPrice;
  });

  return (
    <div className='relative overflow-hidden'>
      <Navbar />
      <main className='container mx-auto px-4 py-8'>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[18rem_1fr] lg:items-start">
          <Hearingfilter
            mode="sidebar"
            filterOptions={filterOptions}
            selectedFilters={selectedFilters}
            onToggleFilter={onToggleFilter}
            onClearFilters={onClearFilters}
          />

          <section>
            <div className="mb-6 flex items-center gap-2">
              <Hearingfilter
                mode="mobile"
                filterOptions={filterOptions}
                selectedFilters={selectedFilters}
                onToggleFilter={onToggleFilter}
                onClearFilters={onClearFilters}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-l-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Search by brand, model, color..."
              />
              <button className="rounded-r-lg bg-pink-500 px-4 py-2 text-white transition hover:bg-pink-600">
                <IoSearch className="text-xl" />
              </button>
            </div>

            {loading && (
              <div className="flex h-96 items-center justify-center">
                <FadingLoader />
              </div>
            )}

            {!loading && filteredHearingAids.length > 0 && (
              <div className='grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 xl:grid-cols-4'>
                {filteredHearingAids.map((item) => (
                  <HearingAidCard
                    key={item._id}
                    _id={item._id}
                    brand={item.brand}
                    model={item.model}
                    color={item.color}
                    price={item.price}
                    description={item.description}
                    image={item.image}
                  />
                ))}
              </div>
            )}

            {!loading && filteredHearingAids.length === 0 && (
              <div className="flex h-96 flex-col items-center justify-center gap-4">
                <p className="text-6xl">🎧</p>
                <p className="text-lg font-medium text-gray-500">No hearing aids found</p>
                <p className="text-sm text-gray-400">Try searching with a different keyword</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="rounded-full bg-pink-500 px-6 py-2 text-white transition hover:bg-pink-600"
                >
                  Clear Search
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Hearingaids;
