function FilterBar({ filter, onFilterChange }) {
    return (
        <div className="filters">
            <button onClick={() => onFilterChange('all')} className={filter === 'all' ? 'active' : ''}>All</button>
            <button onClick={() => onFilterChange('active')} className={filter === 'active' ? 'active' : ''}>Active</button>
            <button onClick={() => onFilterChange('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
        </div>
    );
}
export default FilterBar;