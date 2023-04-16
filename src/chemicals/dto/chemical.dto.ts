import { ChemicalItemDto } from "./chemical_item.dto";

export class ChemicalDto {
  id: number;
  name: string;
  description: string;
  timeline: string;
  items: ChemicalItemDto[];
}
