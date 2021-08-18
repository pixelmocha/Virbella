import axios from "axios";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { ElevatorDto } from "../dto/elevatorDto";
import { DoorState, Elevator, Status } from "../models/elevator";
import { BaseRepository } from "./BaseRepository";
import { BuildingRepository } from "./BuildingRepository";

export class ElevatorRepository extends BaseRepository {
    private buildingRepo = new BuildingRepository;
    private static instance: ElevatorRepository;
    public static getInstance(): ElevatorRepository {
        if (!ElevatorRepository.instance) {
            ElevatorRepository.instance = new ElevatorRepository();
        }
        return ElevatorRepository.instance;
    }

    public async GetAll(): Promise<ElevatorDto[]> {
        try {
            const resp = await axios.get(`${this.baseUrl}/elevators`);
            let elevators: ElevatorDto[] = await Promise.all(resp.data.map(async (d) => {
                try {
                    const item = await ElevatorRepository.ToDto(d);
                    return item;
                } catch (err) {
                    throw err;
                }
            }));
            return elevators;
        } catch (err) {
            return err;
        }
    }

    public async Get(id: number): Promise<ElevatorDto> {
        try {
            const elevator = await this.GetElevatorData(id);
            return await ElevatorRepository.ToDto(elevator) as ElevatorDto;
        } catch (err) {
            return err;
        }
    }

    private async GetElevatorData(id: number): Promise<Elevator> {
        try {
            const resp = await axios.get(`${this.baseUrl}/elevators/${id}`);
            if (!resp.data) {
                throw new NotFoundError('Elevator not found!');
            }
            return resp.data;
        } catch (err) {
            return err;
        }
    }

    public async MoveToFloor(id: number, floorNumber: number): Promise<boolean> {
        try {
            const elevator = await this.GetElevatorData(id);
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
            const elevator = await this.GetElevatorData(id);
            elevator.doorState = state;
            await axios.put(`${this.baseUrl}/elevators/${id}`, elevator);
            return true;
        } catch (err) {
            return err;
        }
    }

    public static async ToDto(elevator: Elevator, includeBuildings: boolean = true): Promise<ElevatorDto> {
        const dto = new ElevatorDto();
        dto.id = elevator.id;
        dto.status = Status[elevator.status];
        dto.currentFloor = elevator.currentFloor;
        dto.availableFloors = elevator.availableFloors;
        dto.doorState = DoorState[elevator.doorState];
        if (includeBuildings) dto.building = await this.getInstance().buildingRepo.Get(elevator.buildingId, false);
        return dto;
    }
}