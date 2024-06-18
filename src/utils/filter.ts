export const filter = (text: string, search: string) => {
  return text.toLowerCase().indexOf(search.toLowerCase()) !== -1;
}
