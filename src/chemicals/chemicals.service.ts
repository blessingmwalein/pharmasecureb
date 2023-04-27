import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, UpdateResult } from 'typeorm';
import { ChemicalDto } from './dto/chemical.dto';
import { ChemicalItemDto } from './dto/chemical_item.dto';
import { Chemical } from './entities/chemical.entity';
import { ChemicalItem } from './entities/item.entity';
import { HpencryptionService } from 'src/hpEncrption/hpencryption.service';
import { decrypt } from 'src/utils/nodeSeal';
import { Report } from './entities/report.entity';
@Injectable()
export class ChemicalsService {
  constructor(
    @InjectRepository(Chemical)
    private chemicalRepository: Repository<Chemical>,
    @InjectRepository(ChemicalItem)
    private chemicalitemRepository: Repository<ChemicalItem>,

    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    private hpEcryptionService: HpencryptionService,
  ) {}

  async showAll() {
    var data = await this.chemicalRepository.find({
      relations: ['items'],
    });
    var newData = [];
    data.forEach((item) => {
      newData.push(this.hpEcryptionService.decryptChemical(item));
    });
    return newData;

    // return await this.hpEcryptionService.decryptChemical(data);
  }
  async showReport() {
    return await this.reportRepository.find(
      { relations: ['chemical'] },
    );
  }



  async create(data: ChemicalDto, user: string) {
    const savedChemical = await this.hpEcryptionService.encryptCreateChemical(
      data,
    );

    this.createReport(savedChemical, 'create', user);
    return savedChemical;
  }

  async read(id: number) {
    var data = await this.chemicalRepository.findOne({
      where: { id: id },
      relations: ['items'],
    });
    return this.hpEcryptionService.decryptChemical(data);
  }

  //create function to create report
  async createReport(chemical: Chemical, type: string, user: string) {
    //get loged on user

    const newReport = new Report();
    newReport.user = user;
    newReport.chemical = chemical;
    newReport.date = new Date().toString();
    newReport.reportType = type;
    return await this.reportRepository.save(newReport);
  }

  //create update method
  async update(id: number, data: Partial<ChemicalDto>, user: string) {
    var updatedChemical = await this.hpEcryptionService.updateEncrptedChemical(
      data,
      id,
    );

    var chemical = await this.chemicalRepository.findOne({
      where: { id: id },
      relations: ['items'],
    });
    this.createReport(chemical, 'update', user);

    return updatedChemical;
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

  //create function ton search by name and description
  async search(queryString: string) {
    var data = await this.chemicalRepository.find({
      relations: ['items'],
    });

    return data
      .filter((item) => {
        var name = decrypt(item.name);
        var description = decrypt(item.description);
        return (
          name.toLowerCase().includes(queryString.toLowerCase()) ||
          description.toLowerCase().includes(queryString.toLowerCase())
        );
      })
      .map((item) => {
        return this.hpEcryptionService.decryptChemical(item);
      });
  }

  //create function to backup database
  async backup() {
  }
}
