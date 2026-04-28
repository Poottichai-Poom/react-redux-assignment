import { useState, useMemo } from 'react';
import useFetch from './hooks/useFetch';
import CountryCard from './components/CountryCard';
import CountryModal from './components/CountryModal';
import RegionFilter from './components/RegionFilter';
import SearchBar from './components/SearchBar';
import './App.css';
const API =
  'https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,languages';
function App() {
  const { data: countries, loading, error } = useFetch(API);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [favourites, setFavourites] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const regions =
    ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  const regionCounts = useMemo(() => {
    const counts = { All: countries?.length || 0 };
    regions.slice(1).forEach(region => {
      counts[region] = (countries || []).filter(c => c.region === region).length;
    });
    return counts;
  }, [countries]);
  const filtered = (countries || []).filter(c =>
    c.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedRegion === 'All' || c.region === selectedRegion)
  );
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === 'population') return a.population - b.population;
      return a.name.common.localeCompare(b.name.common);
    });
  }, [filtered, sortBy]);
  function handleToggleFavourite(country) {
    setFavourites(prev => {
      const name = country.name.common;
      return prev.includes(name)
        ? prev.filter(item => item !== name)
        : [...prev, name];
    });
  }
  function handleOpenCountry(country) {
    setSelectedCountry(country);
  }
  function handleCloseModal() {
    setSelectedCountry(null);
  }
  if (loading) return (
    <div className='app'>
      <div className='app-header'>
        <h1>Country Explorer</h1>
        <p>Search, sort and explore countries around the world.</p>
      </div>
      <div className='skeleton-grid'>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className='country-card skeleton'>
            <div className='country-flag skeleton-block' />
            <div className='country-info'>
              <div className='skeleton-line short' />
              <div className='skeleton-line' />
              <div className='skeleton-line' />
              <div className='skeleton-line' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  if (error) return <p>Error: {error}</p>;
  return (
    <div className='app'>
      <SearchBar onSearch={setSearchTerm} searchTerm={searchTerm} />
      <div className='toolbar'>
        <RegionFilter
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
          counts={regionCounts}
        />
        <div className='sort-select'>
          <label htmlFor='sort'>Sort by:</label>
          <select id='sort' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value='name'>Name</option>
            <option value='population'>Population</option>
          </select>
        </div>
      </div>
      <p>Showing {filtered.length} of {countries.length} countries</p>
      <div className='country-grid'>
        {sorted.map(c => (
          <CountryCard
            key={c.name.common}
            country={c}
            isFavourite={favourites.includes(c.name.common)}
            onToggleFavourite={() => handleToggleFavourite(c)}
            onSelect={() => handleOpenCountry(c)}
          />
        ))}

      </div>
      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          onClose={handleCloseModal}
          isFavourite={favourites.includes(selectedCountry.name.common)}
          onToggleFavourite={() => handleToggleFavourite(selectedCountry)}
        />
      )}
    </div>
  );
}
export default App;