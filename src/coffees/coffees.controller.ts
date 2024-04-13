import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query
} from '@nestjs/common';
import {CoffeesService} from "./coffees.service";
import {CreateCoffeeDto} from "./dto/create-coffee.dto";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) {}
    @Get()
    findAll(@Query() paginationQuery) {
        // const {limit, offset} = paginationQuery;
        return this.coffeesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        const coffees = this.coffeesService.findOne(id);
        if (!coffees) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }

        return this.coffeesService.findOne(id);
    }

    @Post()
    create(@Body() createCoffeeDTO: CreateCoffeeDto) {
        return this.coffeesService.create(createCoffeeDTO);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDTO: UpdateCoffeeDto) {
        return this.coffeesService.update(id, updateCoffeeDTO);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeesService.remove(id);
    }
}
