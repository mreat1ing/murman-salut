export interface ICategories {
  title: string;
  value: string;
  subcategories: ICategories[];
}
