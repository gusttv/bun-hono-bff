export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface LoginResponse {
    name: string;
    token: string;
  }
  
  export interface Order {
    id: string;
    userId: string;
    product: string;
    quantity: number;
    price: number;
    orderDate: string;
    orderStatus: string;
  }
  
  export interface UpdateOrderData {
    product?: string;
    quantity?: number;
    price?: number;
    orderStatus?: string;
  }
  