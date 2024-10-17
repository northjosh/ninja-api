import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
export class NinjasController {
    constructor( private ninjaService: NinjasService){}

    @Get()
    getNinjas(@Query('weapon') weapon?: "nanuchaku" | "stick" ){
        return this.ninjaService.getNinjas(weapon)
    }

    @Get(':id')
    getOneNinja(@Param('id', ParseIntPipe) id: number){
        return this.ninjaService.getNinja(id)
    }

    @Post('create')
    createNinja(@Body() createNinjaDto: CreateNinjaDto){
        // return {
        //     name: createNinjaDto.name,
        //     weapon: createNinjaDto.weapon
        // }

        return this.ninjaService.createNinja(createNinjaDto)
    }

    @Put(':id')
    updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto){
        return this.ninjaService.updateNinja(+id, updateNinjaDto)
    }


    // @Get(':id')
    // getNinja(@Param('id') id: string){
    //     return ["ninja"]
    // }

    @Delete(':id')
    deleteNinja(@Param('id') id: string){
        return this.ninjaService.deleteNinja(+id)
    }
}
