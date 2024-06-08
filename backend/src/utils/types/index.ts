export type orderItem = {
  product_id: number;
  quantity: number;
  price: number;
  total: number;
};

export enum orderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export type orderData = {
  user_id: number;
  status: orderStatus;
  total_amount: number;
  order_items: orderItem[];
};
