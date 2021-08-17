import axios from "axios";
import { BadRequestError } from "routing-controllers";
import { DoorState, Elevator } from "../models/elevator";
import { BaseRepository } from "./BaseRepository";

export class ElevatorRepository extends BaseRepository {

    public async GetAll(): Promise<Elevator[]> {
        try {
            const resp = await axios.get(`${this.baseUrl}/elevators`);
            return resp.data as Elevator[];
        } catch (err) {
            return err;
        }
    }

    public async Get(id: number): Promise<Elevator> {
        try {
            const resp = await axios.get(`${this.baseUrl}/elevators/${id}`);
            return resp.data as Elevator;
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
            const elevator = await this.Get(id);
            elevator.doorState = state;
            await axios.put(`${this.baseUrl}/elevators/${id}`, elevator);
            return true;
        } catch (err) {
            return err;
        }
    }
}