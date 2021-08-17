export class Elevator {
    public id: number;
    public status: Status;
    public currentFloor: number;
    public availableFloors: number;
    public buildingId: number;
}

export enum Status {
    "out of service" = 0,
    "active" = 1
}