export class Elevator {
    public id: number;
    public status: Status;
    public currentFloor: number;
    public availableFloors: number;
    public buildingId: number;
    public doorState: DoorState;
}

export enum Status {
    "out of service" = 0,
    "active" = 1
}

export enum DoorState {
    closed = 0,
    open = 1
}