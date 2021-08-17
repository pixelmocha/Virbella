import { Controller, Param, Get } from 'routing-controllers';
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
  async GetOne(@Param('id') id: number) {
    return await this.repo.Get(id);
  }

  /**
   * Returns all the elevators of a given building
   *
   * @returns Building
   * @memberof BuildingController
   */
  @Get('/buildings/:id/elevators')
  async GetElevators(@Param('id') id: number) {
    return await this.repo.GetElevators(id);
  }
}