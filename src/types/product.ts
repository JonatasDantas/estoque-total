export type BlingProductType = {
  id: string;
  codigo: string;
  name: string;
  quantityStored: number;
  lastSaleDate: Date | null;
  lastUpdateDate: Date | null;
  daysWithoutSale: number | null;
  observations: string;
};