/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChemicalDto } from 'src/chemicals/dto/chemical.dto';
import { Chemical } from 'src/chemicals/entities/chemical.entity';
import { ChemicalItem } from 'src/chemicals/entities/item.entity';
import { Repository } from 'typeorm';
import { encrypt } from 'src/utils/nodeSeal';
import { decrypt } from 'src/utils/nodeSeal';
import { ChemicalItemDto } from 'src/chemicals/dto/chemical_item.dto';

@Injectable()
export class HpencryptionService {
  constructor(
    @InjectRepository(Chemical)
    private chemicalRepository: Repository<Chemical>,
    @InjectRepository(ChemicalItem)
    private chemicalitemRepository: Repository<ChemicalItem>,
  ) {}

  //   encrypt(data: string) {
  //     return data;
  //   }

  //   decrypt(data: string) {
  //     return data;
  //   }

  async encryptCreateChemical(data: ChemicalDto) {
    const encryptedChemical = this.encryptChemical(data);
    var savedChemical = await this.chemicalRepository.save(encryptedChemical);
    data.items.forEach(async (item) => {
      item.chemicalId = savedChemical.id;
      console.log(item);
      const newItem = new ChemicalItem();

      const encryptedChemicalItem = this.encryptChemicalItem(item);
      newItem.name = encryptedChemicalItem.name;
      newItem.chemical = savedChemical;
      newItem.description = encryptedChemicalItem.description;
      newItem.qty = encryptedChemicalItem.qty;

      await this.chemicalitemRepository.save(newItem);
    });
    return savedChemical;
  }

  async updateEncrptedChemical(data: any, id: number) {
    const encryptedChemical = this.encryptChemical(data);

    await this.chemicalRepository.update({ id }, encryptedChemical);
    data.items.forEach(async (item) => {
      console.log(item);
      const itemId = item.id;
      //update item
      const encryptedChemicalItem = this.encryptChemicalItem(item);

      this.updateItem(itemId, encryptedChemicalItem);
    });
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

  encryptChemical(data: ChemicalDto): any {
    return {
      name: encrypt(data.name),
      description: encrypt(data.description),
      timeline: encrypt(data.timeline),
    };
  }
  encryptChemicalItem(data: ChemicalItemDto): any {
    return {
      name: encrypt(data.name),
      description: encrypt(data.description),
      qty: encrypt(data.qty),
    };
  }
  decryptChemicalItem(data: any): any {
    return {
      name: decrypt(data.name),
      description: decrypt(data.description),
      qty: decrypt(data.qty),
    };
  }

  decryptChemical(data: any): any {
    var newDecrptedItems = [];
    data.items.forEach((item) => {
      newDecrptedItems.push(this.decryptChemicalItem(item));
    });
    return {
      id: data.id,
      name: decrypt(data.name),
      description: decrypt(data.description),
      timeline: decrypt(data.timeline),
      items: newDecrptedItems,
    };
  }

  async searchChemical(queryString: string) {
    //
  }
}
