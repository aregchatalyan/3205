import qs from 'qs';

interface QueryParams {
  [key: string]: string;
}

export const toQueryString = (query: QueryParams) => qs.stringify(query, {
  skipNulls: true,
  filter: (_, value) => value || undefined
});

export const formatter = (value: string) => {
  value = value.replace(/\D/g, '');
  return value.match(/.{1,2}/g)?.join('-') || value;
}
