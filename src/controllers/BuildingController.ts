import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { Building } from '../models/buildings';
import { BuildingRepository } from '../repositories/BuildingRepository';

@Controller()
export class BuildingController {
  private repo = new BuildingRepository()

  /**
   * Returns all buildings
   *
   * @returns array of Buildings
   * @memberof BuildingController
   */
  @Get('/buildings')
  async GetAll(): Promise<Building[]> {
    return await this.repo.GetAll();
  }

  /**
   * Returns data, including elevators, of building
   *
   * @returns Building
   * @memberof BuildingController
   */
  @Get('/buildings/:id')
  async getOne(@Param('id') id: number) {
    return await this.repo.Get(id);
  }
}