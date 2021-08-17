import { Controller, Param, Get, Put } from 'routing-controllers';
import { ElevatorRepository } from '../repositories/ElevatorRepository';
import { DoorState } from '../models/elevator';
import { ElevatorDto } from '../dto/elevator';

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
  async GetAll(): Promise<ElevatorDto[]> {
    return await this.repo.GetAll();
  }

  /**
   * Returns a single elevator
   *
   * @returns Elevator
   * @memberof ElevatorController
   */
  @Get('/elevators/:id')
  async GetOne(@Param('id') id: number): Promise<ElevatorDto> {
    return await this.repo.Get(id);
  }

  /**
 * moves elevator to given floor if that floor exists
 *
 * @returns array of Elevators
 * @memberof ElevatorController
 */
  @Put('/elevators/:id/floor/:floorNumber')
  async MoveToFloor(@Param('id') id: number, @Param('floorNumber') floorNumber: number): Promise<boolean> {
    return await this.repo.MoveToFloor(id, floorNumber);
  }

  /**
* opens an elevator door
*
* @returns boolean indicating success
* @memberof ElevatorController
*/
  @Put('/elevators/:id/open')
  async Open(@Param('id') id: number): Promise<boolean> {
    return await this.repo.SetDoorState(id, DoorState.Open);
  }

  /**
 * closes an elevator door
 *
 * @returns boolean indicating success
 * @memberof ElevatorController
 */
  @Put('/elevators/:id/close')
  async Close(@Param('id') id: number): Promise<boolean> {
    return await this.repo.SetDoorState(id, DoorState.Closed);
  }
}