import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CompanyService } from '../services/company.service.js';
import { CreateCompanyDto } from '../dto/create-company.dto.js';
import { UpdateCompanyDto } from '../dto/update-company.dto.js';
import {
  paginateArray,
  PaginationParams,
} from '../../../common/pagination/paginate.js';

@ApiTags('companies')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Create company' })
  @ApiBody({ type: CreateCompanyDto })
  async create(@Body() body: CreateCompanyDto) {
    return await this.companyService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'List companies' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findAll(@Query() query: PaginationParams) {
    const items = await this.companyService.findAll();
    return paginateArray(items, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get company by id' })
  @ApiParam({ name: 'id', example: 'cku9m2f3d0001abcxyz' })
  async findOne(@Param('id') id: string) {
    return await this.companyService.findOne(id);
  }

  @Get('cnpj/:cnpj')
  @ApiOperation({ summary: 'Get company by CNPJ' })
  @ApiParam({ name: 'cnpj', example: '11222333000144' })
  async findByCnpj(@Param('cnpj') cnpj: string) {
    return await this.companyService.findByCnpj(cnpj);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update company' })
  @ApiParam({ name: 'id', example: 'cku9m2f3d0001abcxyz' })
  @ApiBody({ type: UpdateCompanyDto })
  async update(@Param('id') id: string, @Body() body: UpdateCompanyDto) {
    return await this.companyService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete company' })
  @ApiParam({ name: 'id', example: 'cku9m2f3d0001abcxyz' })
  async remove(@Param('id') id: string) {
    return await this.companyService.remove(id);
  }
}
