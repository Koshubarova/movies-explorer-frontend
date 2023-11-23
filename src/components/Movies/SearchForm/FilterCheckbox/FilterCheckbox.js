import "./FilterCheckbox.css";

function FilterCheckbox({ onFilterMovies, isShortMovies }) {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__label">
        <input
          className="filter-checkbox__input"
          type="checkbox"
          id="checkbox"
          name="checkbox"
          onChange={onFilterMovies}
          checked={isShortMovies}
        />
        <span className="filter-checkbox__span" />
      </label>
      <span className="filter-checkbox__title">Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;
