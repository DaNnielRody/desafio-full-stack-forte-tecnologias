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
import { EmployeeService } from '../services/employee.service.js';
import { CreateEmployeeDto } from '../dto/create-employee.dto.js';
import { UpdateEmployeeDto } from '../dto/update-employee.dto.js';
import {
  paginateArray,
  PaginationParams,
} from '../../../common/pagination/paginate.js';

@ApiTags('employees')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiOperation({ summary: 'Create employee' })
  @ApiBody({ type: CreateEmployeeDto })
  async create(@Body() body: CreateEmployeeDto) {
    return await this.employeeService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'List employees' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findAll(@Query() query: PaginationParams) {
    const items = await this.employeeService.findAll();
    return paginateArray(items, query);
  }

  @Get('company/:companyId')
  @ApiOperation({ summary: 'List employees by company' })
  @ApiParam({ name: 'companyId', example: 'cku9m2f3d0001abcxyz' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findAllByCompany(
    @Param('companyId') companyId: string,
    @Query() query: PaginationParams,
  ) {
    const items = await this.employeeService.findAllByCompany(companyId);
    return paginateArray(items, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get employee by id' })
  @ApiParam({ name: 'id', example: 'cku9m2f3d0001empid' })
  async findOne(@Param('id') id: string) {
    return await this.employeeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update employee' })
  @ApiParam({ name: 'id', example: 'cku9m2f3d0001empid' })
  @ApiBody({ type: UpdateEmployeeDto })
  async update(@Param('id') id: string, @Body() body: UpdateEmployeeDto) {
    return await this.employeeService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete employee' })
  @ApiParam({ name: 'id', example: 'cku9m2f3d0001empid' })
  async remove(@Param('id') id: string) {
    return await this.employeeService.remove(id);
  }
}
