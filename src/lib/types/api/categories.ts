export interface Category {
  _id: string;
  nameAr: string;
  nameEn: string;
  cover: string;
  disabled: boolean;
  employeeReadOnly: boolean;
  subcategories: any[];
}
