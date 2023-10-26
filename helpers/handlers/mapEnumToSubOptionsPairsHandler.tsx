import { SubOptionsI } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export const mapEnumToSubOptionPairs = <T extends { [p: string]: unknown }>(
  enumName: T,
): Array<SubOptionsI> => {
  return Object.entries(enumName)
    .map(([key, value]) => ({
      value: Number(key),
      text: (value as string).toString(),
    }))
    .splice(0, Object.keys(enumName).length / 2);
};
