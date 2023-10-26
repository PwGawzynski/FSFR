import {
  ActiveFilterValue,
  OrderBaseI,
  OrderStatus,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export const defaultOrdersFilterMethod = (
  order: OrderBaseI,
  filter: ActiveFilterValue<OrderBaseI>,
  searchValue: string,
  initSearchValue = '',
) => {
  if (!filter.active) return true;
  if (order[filter.active.main] !== undefined) {
    if (
      searchValue === initSearchValue &&
      filter.active.subOption === undefined
    )
      return true;
    if (
      filter.active.subOption !== undefined &&
      order[filter.active.main] !== undefined
    )
      return order[filter.active.main] === filter.active.subOption;
    if (
      order[filter.active.main] !== undefined &&
      typeof order[filter.active.main] === 'string'
    )
      return (order[filter.active.main] as string)
        ?.toLowerCase()
        .includes(searchValue.toLowerCase());
    if (
      order[filter.active.main] !== undefined &&
      typeof order[filter.active.main] === 'number'
    )
      return order[filter.active.main]?.toString() === searchValue;
  }
  return false;
};

export const doneOrdersFilterMethod = (
  order: OrderBaseI,
  filter: ActiveFilterValue<OrderBaseI>,
  searchValue: string,
  initSearchValue = '',
) => {
  if (order.status === OrderStatus.Done) {
    return defaultOrdersFilterMethod(
      order,
      filter,
      searchValue,
      initSearchValue,
    );
  }
  return false;
};
export const RemDoneOrdersFilter = (order: OrderBaseI) =>
  order.status !== OrderStatus.Done;

export const OnlyOpenOrdersFilter = (
  order: OrderBaseI,
  filter: ActiveFilterValue<OrderBaseI>,
  searchValue: string,
  initSearchValue = '',
) => {
  if (order.status !== OrderStatus.Done) {
    return defaultOrdersFilterMethod(
      order,
      filter,
      searchValue,
      initSearchValue,
    );
  }
  return false;
};

export const filterByStatus = (
  order: OrderBaseI,
  searchStatusValue: string | number,
) => {
  console.log(order.status, Number(searchStatusValue));
  return order.status === Number(searchStatusValue);
};
