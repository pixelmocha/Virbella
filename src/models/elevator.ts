export class Elevator {
    public id: number;
    public status: Status;
    public currentFloor: number;
    public availableFloors: number;
    public buildingId: number;
    public doorState: DoorState;
}

export enum Status {
    OutOfService = 0,
    Active = 1
}

export enum DoorState {
    Closed = 0,
    Open = 1
}