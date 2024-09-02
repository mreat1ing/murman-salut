export interface ISessionStorage {
  items: {
    name: string;
    phone: string;
    email: string;
    address: string;
    age: boolean;
  };
  edited: number;
}
export interface ISessionStorageItem {
  items: {
    name: string;
    phone: string;
    email: string;
    address: string;
    age: boolean;
  };
}
