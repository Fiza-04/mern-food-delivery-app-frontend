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

export type MenuItem = {
  _id: string;
  itemName: string;
  itemDescription: string;
  itemPrice: string;
  menuItemImageFile: string;
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
  // menuItems: MenuItem[];
  imageFile: string;
  openingTime: string;
  closingTime: string;
  isAcceptingOrders: boolean;
  status: boolean;
  lastUpdated: string;
};
