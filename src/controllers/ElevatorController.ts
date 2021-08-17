import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { ElevatorRepository } from '../repositories/ElevatorRepository';
import { Elevator } from '../models/elevator';

@Controller()
export class ElevatorController {
  private repo = new ElevatorRepository()

  /**
   * Returns all elevators for all buildings
   *
   * @returns array of Elevators
   * @memberof ElevatorController
   */
  @Get('/elevators')
  async GetAll(): Promise<Elevator[]> {
    return await this.repo.GetAll();
  }

  /**
 * Returns all elevators for a given building id
 *
 * @returns array of Elevators
 * @memberof ElevatorController
 */
  @Get('/elevators/building/:buildingId')
  async GetElevatorsForBuilding(@Param('buildingId') buildingId: number): Promise<Elevator[]> {
    return await this.repo.GetElevatorsForBuilding(buildingId);
  }

  /**
 * moves elevator 
 *
 * @returns array of Elevators
 * @memberof ElevatorController
 */
  @Put('/elevators/:id/floor/:floorNumber')
  async MoveElevator(@Param('id') id: number, @Param('floorNumber') floorNumber: number): Promise<boolean> {
    return await this.repo.MoveElevator(id, floorNumber);
  }

  // @Post('/users')
  // post(@Body() user: any) {
  //   return 'Saving user...';
  // }

  // @Delete('/users/:id')
  // remove(@Param('id') id: number) {
  //   return 'Removing user...';
  // }
}