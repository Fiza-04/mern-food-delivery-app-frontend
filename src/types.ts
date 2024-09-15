export type User = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  postcode: string;
  city: string;
  country: string;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  restaurantAddress: string;
  restaurantPinCode: string;
  restaurantCity: string;
  restaurantCountry: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  imageFile: string;
  openingTime: string;
  closingTime: string;
  isAcceptingOrders: boolean;
  status: boolean;
  lastUpdated: string;
};

export type Menu = {
  _id: string;
  restaurant: string;
  menuName: string;
  menuActive: boolean;
};

export type MenuItem = {
  _id: string;
  menuId: string;
  itemName: string;
  itemDescription: string;
  itemPrice: string;
  extras: Array<{
    name: string;
    price: string;
  }>;
  menuItemImageFile: string;
  menuItemActive: boolean;
};
