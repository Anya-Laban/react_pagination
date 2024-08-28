import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

function getStartAndEndItemsIndex(
  itemsPerPage: number,
  currentPage: number,
  total: number,
) {
  const start = itemsPerPage * currentPage - itemsPerPage;
  const end = start + itemsPerPage > total ? total : start + itemsPerPage;

  return [start, end];
}

function prepareItems(
  allItems: string[],
  itemsPerPage: number,
  currentPage: number,
) {
  const [start, end] = getStartAndEndItemsIndex(
    itemsPerPage,
    currentPage,
    allItems.length,
  );

  return allItems.slice(start, end);
}

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const visibleItems = prepareItems(items, itemsPerPage, currentPage);

  const [start, end] = getStartAndEndItemsIndex(
    itemsPerPage,
    currentPage,
    items.length,
  );
  const infoLine = `Page ${currentPage} (items ${start + 1} - ${end} of ${items.length})`; // ?

  const handleChangeItemsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (+event.target.value > 0 && +event.target.value <= items.length) {
      setItemsPerPage(+event.target.value);
      setCurrentPage(1);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {infoLine}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={e => handleChangeItemsPerPage(e)}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length} // total number of items to paginate
        perPage={itemsPerPage} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={setCurrentPage}
      />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;