import { ElevatorDto } from "./elevatorDto";

export class BuildingDto {
    public id: number;
    public name: string;
    public elevators: ElevatorDto[];
}