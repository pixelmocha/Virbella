import axios from "axios";
import { BadRequestError } from "routing-controllers";
import { Elevator } from "../models/elevator";
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

    public async GetElevatorsForBuilding(buildingId: number): Promise<Elevator[]> {
        try {
            const resp = await axios.get(`${this.baseUrl}/elevators?buildingId=${buildingId}`);
            return resp.data as Elevator[];
        } catch (err) {
            return err;
        }
    }

    public async MoveElevator(id: number, floorNumber: number) {
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
}