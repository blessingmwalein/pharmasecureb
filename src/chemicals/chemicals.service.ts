import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, UpdateResult } from 'typeorm';
import { ChemicalDto } from './dto/chemical.dto';
import { ChemicalItemDto } from './dto/chemical_item.dto';
import { Chemical } from './entities/chemical.entity';
import { ChemicalItem } from './entities/item.entity';
@Injectable()
export class ChemicalsService {
  constructor(
    @InjectRepository(Chemical)
    private chemicalRepository: Repository<Chemical>,
    @InjectRepository(ChemicalItem)
    private chemicalitemRepository: Repository<ChemicalItem>,
  ) {}

  async showAll() {
    return await this.chemicalRepository.find();
  }

  async create(data: ChemicalDto) {
    const savedChemical = await this.chemicalRepository.save(data);
    data.items.forEach(async (item) => {
      item.chemicalId = savedChemical.id;
      console.log(item);
      const newItem = new ChemicalItem();
      newItem.name = item.name;
      newItem.chemical = savedChemical;
      newItem.description = item.description;
      newItem.qty = item.qty;

      await this.chemicalitemRepository.save(newItem);
    });
    return savedChemical;
  }

  async read(id: number) {
    return await this.chemicalRepository.findOne({
      where: { id: id },
      relations: ['items'],
    });
  }

  //create update method
  async update(id: number, data: Partial<ChemicalDto>) {
    await this.chemicalRepository.update({ id }, data);
    // data.items.forEach(async (item) => {
    //   console.log(item);
    //   await this.chemicalitemRepository.update({ id }, item);
    // });
    return await this.chemicalRepository.findOne({
      where: { id: id },
      relations: ['items'],
    });
  }
  async updateItem(id: number, data: Partial<ChemicalItemDto>) {
    await this.chemicalitemRepository.update({ id }, data);
    // data.items.forEach(async (item) => {
    //   console.log(item);
    //   await this.chemicalitemRepository.update({ id }, item);
    // });
    return await this.chemicalitemRepository.findOne({
      where: { id: id },
      relations: ['chemical'],
    });
  }

  //create method to add item to chemical
  async addItem(id: number, data: Partial<ChemicalItemDto>) {
    const chemical = await this.chemicalRepository.findOne({
      where: { id: id },
      relations: ['items'],
    });
    const newItem = new ChemicalItem();
    newItem.name = data.name;
    newItem.chemical = chemical;
    newItem.description = data.description;
    newItem.qty = data.qty;
    await this.chemicalitemRepository.save(newItem);
    return await this.chemicalRepository.findOne({
      where: { id: id },
      relations: ['items'],
    });
  }

  async destroy(id: number) {
    await this.chemicalRepository.delete({ id });
    return { deleted: true };
  }
}
