import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {

    private ninjas = [
        {id: 0, name: "Josh", weapon: "Nanuchaku"},
        {id: 9, name: "Dave", weapon: "Stick"},
    ]


    getNinjas(weapon?: "nanuchaku" | "stick") {
        if (weapon){
            return this.ninjas.filter((ninja) => ninja.weapon.toLowerCase() === weapon)
        }

        return this.ninjas
    }

    getNinja(id: number){
        
        const ninja = this.ninjas.find((ninja) => ninja.id === id)
    
        try{
            if(!ninja){
                throw new Error('ninja not found')
            }
    
        }catch(err){
            throw new NotFoundException();
        }
        
        return ninja
    }

    createNinja(createNinjaDto: CreateNinjaDto){

        const newNigga = {
            ...createNinjaDto,
            id: Date.now()
        }
        this.ninjas.push(newNigga)
    }

    updateNinja(id: number, updateNinjaDto: UpdateNinjaDto){
        this.ninjas = this.ninjas.map((ninja) => {
            if(ninja.id === id ) {
                return { ...ninja, ...updateNinjaDto}
            }

            return ninja

        })

        return this.getNinja(id)
    }

    deleteNinja(id: number){
        const toBeDeleted = this.getNinja(id)

        this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id)

        return toBeDeleted
    }

    
}
