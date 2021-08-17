import axios from "axios";
import { BadRequestError } from "routing-controllers";
import { ElevatorDto } from "../dto/elevator";
import { DoorState, Elevator, Status } from "../models/elevator";
import { BaseRepository } from "./BaseRepository";
import { BuildingRepository } from "./BuildingRepository";

export class ElevatorRepository extends BaseRepository {
    private buildingRepo = new BuildingRepository();

    public async GetAll(): Promise<Elevator[]> {
        try {
            const resp = await axios.get(`${this.baseUrl}/elevators`);
            return resp.data as Elevator[];
        } catch (err) {
            return err;
        }
    }

    public async Get(id: number): Promise<ElevatorDto> {
        try {
            const resp = await axios.get(`${this.baseUrl}/elevators/${id}`);
            // if (param) {
            //     if (resp.data[param]) return resp.data[param];
            // }
            return await this.ToDto(resp.data) as ElevatorDto;
        } catch (err) {
            return err;
        }
    }

    public async MoveToFloor(id: number, floorNumber: number) {
        try {
            const elevator = await this.Get(id);
            if (floorNumber > elevator.availableFloors) {
                throw new BadRequestError('Requested floor does not exist for this elevator');
            }
            if (floorNumber === elevator.availableFloors) {
                return true;
            }
            elevator.currentFloor = floorNumber;
            await axios.put(`${this.baseUrl}/elevators/${id}`, elevator);
            return true;
        } catch (err) {
            return err;
        }
    }

    public async SetDoorState(id: number, state: DoorState): Promise<boolean> {
        try {
            const resp = await axios.get(`${this.baseUrl}/elevators/${id}`);
            const elevator = resp.data;
            elevator.doorState = state;
            await axios.put(`${this.baseUrl}/elevators/${id}`, elevator);
            return true;
        } catch (err) {
            return err;
        }
    }

    private async ToDto(elevator: Elevator): Promise<ElevatorDto> {
        return {
            id: elevator.id,
            status: Status[elevator.status],
            currentFloor: elevator.currentFloor,
            availableFloors: elevator.availableFloors,
            building: await this.buildingRepo.Get(elevator.buildingId),
            doorState: DoorState[elevator.doorState]
        };
    }
}