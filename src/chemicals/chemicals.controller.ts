import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import mysqldump from 'mysqldump';
import { ChemicalsService } from './chemicals.service';
import { ChemicalDto } from './dto/chemical.dto';
import { ChemicalItemDto } from './dto/chemical_item.dto';

@Controller('chemicals')
@UseGuards(AuthGuard('jwt'))
export class ChemicalController {
  constructor(private chemicalService: ChemicalsService) {}

  @Get('')
  async showAllChemicals() {
    const chemicals = await this.chemicalService.showAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Chemicals fetched successfully',
      chemicals,
    };
  }
  @Get('reports')
  async showAllReports() {
    const reports = await this.chemicalService.showReport();
    return {
      statusCode: HttpStatus.OK,
      message: 'Reports fetched successfully',
      reports,
    };
  }

  @Post('create')
  async createChemical(@Body() data: ChemicalDto, @Request() req) {
    //get loged on user

    const checmical = await this.chemicalService.create(
      data,
      req.user.username,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Chemical created successfully',
      checmical,
    };
  }

  @Get(':id')
  async readChemical(@Param('id') id: number) {
    const data = await this.chemicalService.read(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Chemical fetched successfully',
      data,
    };
  }

  @Patch(':id')
  async updateChemical(
    @Param('id') id: number,
    @Body() data: Partial<ChemicalDto>,
    @Request() req,
  ) {
    const updatedChemical = await this.chemicalService.update(
      id,
      data,
      req.user.username,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Chemical updated successfully',
      updatedChemical,
    };
  }

  @Post(':id')
  async addItem(
    @Param('id') id: number,
    @Body() data: Partial<ChemicalItemDto>,
  ) {
    const updatedChemical = await this.chemicalService.addItem(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Chemical Item Added successfully',
      updatedChemical,
    };
  }
  // @Patch('item/:id')
  // async updateItem(
  //   @Param('id') id: number,
  //   @Body() data: Partial<ChemicalItemDto>,
  // ) {
  //   const updatedChemicalItem = await this.chemicalService.updateItem(id, data);
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'Chemical Item updated successfully',
  //     updatedChemicalItem,
  //   };
  // }

  @Delete(':id')
  async deleteChemical(@Param('id') id: number) {
    await this.chemicalService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Chemical deleted successfully',
    };
  }

  @Post('search/mix')
  async searchChemical(@Body() data: any) {
    const chemicals = await this.chemicalService.search(data.query);
    return {
      statusCode: HttpStatus.OK,
      message: 'Search Results',
      chemicals,
    };
  }

  @Post('backup/database')
  async backupDataBase(@Body() data: any) {

    //create date timestap
    const date = new Date();
    const timestamp = date.getTime();

    mysqldump({
      connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'phamasecure',
      },
      dumpToFile: './backups/dump'+timestamp+'.sql',
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Database Backup',
    };
  }
}
