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
import { AssetsService } from '../services/assets.service.js';
import { CreateAssetDto } from '../dto/create-asset.dto.js';
import { UpdateAssetDto } from '../dto/update-asset.dto.js';
import { AssetStatus } from '../entities/status.enum.js';
import {
  paginateArray,
  PaginationParams,
} from '../../../common/pagination/paginate.js';

@ApiTags('assets')
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  @ApiOperation({ summary: 'Create asset' })
  @ApiBody({ type: CreateAssetDto })
  async create(@Body() body: CreateAssetDto) {
    return await this.assetsService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'List assets' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findAll(@Query() query: PaginationParams) {
    const items = await this.assetsService.findAll();
    return paginateArray(items, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get asset by id' })
  @ApiParam({ name: 'id', example: 'cku9m2f3d0001assetid' })
  async findOne(@Param('id') id: string) {
    return await this.assetsService.findOne(id);
  }

  @Get('company/:companyId')
  @ApiOperation({ summary: 'List assets by company' })
  @ApiParam({ name: 'companyId', example: 'cku9m2f3d0001abcxyz' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findByCompany(
    @Param('companyId') companyId: string,
    @Query() query: PaginationParams,
  ) {
    const items = await this.assetsService.findByCompany(companyId);
    return paginateArray(items, query);
  }

  @Get('company/:companyId/available')
  @ApiOperation({ summary: 'List available assets by company' })
  @ApiParam({ name: 'companyId', example: 'cku9m2f3d0001abcxyz' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findCompanyAvailable(
    @Param('companyId') companyId: string,
    @Query() query: PaginationParams,
  ) {
    const items = await this.assetsService.findCompanyAvailable(companyId);
    return paginateArray(items, query);
  }

  @Get('employee/:employeeId')
  @ApiOperation({ summary: 'List assets by employee' })
  @ApiParam({ name: 'employeeId', example: 'cku9m2f3d0001empid' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findByEmployee(
    @Param('employeeId') employeeId: string,
    @Query() query: PaginationParams,
  ) {
    const items = await this.assetsService.findByEmployee(employeeId);
    return paginateArray(items, query);
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'List assets by status' })
  @ApiParam({ name: 'status', enum: AssetStatus, example: AssetStatus.EM_USO })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findByStatus(
    @Param('status') status: AssetStatus,
    @Query() query: PaginationParams,
  ) {
    const items = await this.assetsService.findByStatus(status);
    return paginateArray(items, query);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update asset' })
  @ApiParam({ name: 'id', example: 'cku9m2f3d0001assetid' })
  @ApiBody({ type: UpdateAssetDto })
  async update(@Param('id') id: string, @Body() body: UpdateAssetDto) {
    return await this.assetsService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete asset' })
  @ApiParam({ name: 'id', example: 'cku9m2f3d0001assetid' })
  async remove(@Param('id') id: string) {
    return await this.assetsService.remove(id);
  }

  @Post(':id/assign/:employeeId')
  @ApiOperation({ summary: 'Assign asset to employee' })
  @ApiParam({ name: 'id', example: 'cku9m2f3d0001assetid' })
  @ApiParam({ name: 'employeeId', example: 'cku9m2f3d0001empid' })
  async assign(
    @Param('id') id: string,
    @Param('employeeId') employeeId: string,
  ) {
    return await this.assetsService.assign(id, employeeId);
  }

  @Post(':id/unassign')
  @ApiOperation({ summary: 'Unassign asset from employee' })
  @ApiParam({ name: 'id', example: 'cku9m2f3d0001assetid' })
  async unassign(@Param('id') id: string) {
    return await this.assetsService.unassign(id);
  }
}
