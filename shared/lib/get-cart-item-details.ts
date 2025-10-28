export const getCartItemDetails = (
  colorName: string,
  switchName: string,
  switchType: string
): string => {
  return `${switchName} - ${switchType} - ${colorName}`;
};