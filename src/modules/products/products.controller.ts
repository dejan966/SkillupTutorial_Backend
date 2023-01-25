import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Product } from 'entities/product.entity'
import { isFileExtensionSafe, removeFile, saveImageToStorage } from 'helpers/imageStorage'
import { PaginatedResult } from 'interfaces/paginated-result.interface'
import { join } from 'path'
import { CreateUpdateProductDto } from './dto/create-update-product.dto'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Param('id') id: string): Promise<Product> {
    return this.productsService.findById(id)
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Query('page') page: number): Promise<PaginatedResult> {
    return this.productsService.paginate(page)
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createProductDto: CreateUpdateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto)
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', saveImageToStorage))
  @HttpCode(HttpStatus.OK)
  async upload(@UploadedFile() file: Express.Multer.File, @Param('id') productId: string): Promise<Product> {
    const filename = file?.filename

    if (!filename) throw new BadRequestException('File must be either a png or jpg/jpeg')

    const imagesFolderPath = join(process.cwd(), 'files')
    const fullImagePath = join(imagesFolderPath + '/' + file.filename)
    if (await isFileExtensionSafe(fullImagePath)) {
      return this.productsService.updateProductImage(productId, filename)
    }
    removeFile(fullImagePath)
    throw new BadRequestException('File content does not match extension!')
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateProductDto: CreateUpdateProductDto): Promise<Product> {
    return this.productsService.update(id, updateProductDto)
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(id)
  }
}
