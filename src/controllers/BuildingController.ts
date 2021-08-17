import { Controller, Param, Get } from 'routing-controllers';
import { BuildingDto } from '../dto/buildingDto';
import { ElevatorDto } from '../dto/elevatorDto';
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
  async GetAll(): Promise<BuildingDto[]> {
    const buildings = await this.repo.GetAll();

    return await this.repo.GetAll();
  }

  /**
   * Returns data, including elevators, of building
   *
   * @returns Building
   * @memberof BuildingController
   */
  @Get('/buildings/:id')
  async GetOne(@Param('id') id: number): Promise<BuildingDto>  {
    return await this.repo.Get(id);
  }

  /**
   * Returns all the elevators of a given building
   *
   * @returns Building
   * @memberof BuildingController
   */
  @Get('/buildings/:id/elevators')
  async GetElevators(@Param('id') id: number): Promise<ElevatorDto[]>  {
    return await this.repo.GetElevators(id);
  }
}