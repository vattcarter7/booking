// API URL
export const CATEGORY_URL = '/api/v1/category';
export const AUTH_URL = '/api/v1/auth';
export const PRODUCT_URL = '/api/v1/product';
export const CART_URL = '/api/v1/cart';
export const PURCHASE_URL = '/api/v1/purchase';

// CONSTANTS
export const DRAW_WIDTH = 180;

// Functions
export const ccyFormat = (num) => {
  return `${num.toFixed(2)}`;
};

export const subtotal = (items) => {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
};
