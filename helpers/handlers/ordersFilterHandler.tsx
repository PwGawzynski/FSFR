import {
  OrderBaseI,
  OrderStatus,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export const defaultOrdersFilterMethod = (
  order: OrderBaseI,
  filter: keyof OrderBaseI,
  searchValue: string,
  initSearchValue = '',
) => {
  console.log('def fn sort invoked');
  if (order[filter]) {
    if (searchValue === initSearchValue) return true;
    if (typeof order[filter] === 'string')
      return (order[filter] as string)
        ?.toLowerCase()
        .includes(searchValue.toLowerCase());
    if (typeof order[filter] === 'number')
      return order[filter]?.toString() === searchValue;
  }
  return false;
};

export const doneOrdersFilterMethod = (
  order: OrderBaseI,
  filter: keyof OrderBaseI,
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

export const UpcomingOrdersFilter = (order: OrderBaseI) =>
  order.status !== OrderStatus.Done;

export const filterByStatus = (order: OrderBaseI, searchStatusValue: string) =>
  OrderStatus[order.status] === searchStatusValue;
