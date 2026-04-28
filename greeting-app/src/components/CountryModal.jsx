function CountryModal({ country, onClose, onToggleFavourite, isFavourite }) {
    const pop = country.population.toLocaleString();
    const cap = country.capital ? country.capital[0] : 'N/A';
    const lang = country.languages
        ? Object.values(country.languages).join(', ')
        : 'N/A';
    return (
        <div className='modal-overlay' onClick={onClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <button className='modal-close' onClick={onClose}>&times;</button>
                <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className='modal-flag' />
                <h2>{country.name.common}</h2>
                <p><strong>Official name:</strong> {country.name.official}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Capital:</strong> {cap}</p>
                <p><strong>Population:</strong> {pop}</p>
                <p><strong>Languages:</strong> {lang}</p>
                <button
                    className={`favourite-button modal-favourite ${isFavourite ? 'active' : ''}`}
                    onClick={onToggleFavourite}
                >
                    {isFavourite ? '★ Favourite' : '☆ Favourite'}
                </button>
            </div>
        </div>
    );
}

export default CountryModal;
