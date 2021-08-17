import { Building } from "../models/buildings";

export class ElevatorDto {
    public id: number;
    public status: string;
    public currentFloor: number;
    public availableFloors: number;
    public building: Building;
    public doorState: string;
}