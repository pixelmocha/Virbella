import axios from "axios";
import { Building } from "../models/buildings";
import { BaseRepository } from "./BaseRepository";
import { ElevatorRepository } from "./ElevatorRepository";

export class BuildingRepository extends BaseRepository {
    private elevatorRepo = new ElevatorRepository();

    public async GetAll(): Promise<Building[]> {
        try {
            const resp = await axios.get(`${this.baseUrl}/buildings`);
            const buildings: Building[] = resp.data;
            buildings.forEach(async (b: Building) => {
                b.elevators = await this.elevatorRepo.GetElevatorsForBuilding(b.id);
            });
            return buildings;
        } catch (err) {
            return err;
        }
    }

    public async Get(id: number): Promise<Building> {
        try {
            const resp = await axios.get(`${this.baseUrl}/buildings/${id}`);
            const building: Building = resp.data;
            building.elevators = await this.elevatorRepo.GetElevatorsForBuilding(id);
            return building;
        } catch (err) {
            return err;
        }
    }
}