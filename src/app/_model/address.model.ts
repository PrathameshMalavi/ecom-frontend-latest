export interface UserAddress {
  id?: number; // optional since created by backend
  userName: string;
  name: string;
  address: string;
  state: string;
  city: string;
  pincode: string;
  contact: string;
}
