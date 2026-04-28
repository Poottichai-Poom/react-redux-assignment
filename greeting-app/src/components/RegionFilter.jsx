function RegionFilter({ onRegionChange, selectedRegion, counts = {} }) {
    const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

    return (
        <div className='region-filter'>
            {regions.map(r => (
                <button
                    key={r}
                    onClick={() => onRegionChange(r)}
                    className={selectedRegion === r ? 'active' : ''}
                >
                    {r}
                    <span className='region-badge'>{counts[r] ?? 0}</span>
                </button>
            ))}
        </div>
    );
}

export default RegionFilter;