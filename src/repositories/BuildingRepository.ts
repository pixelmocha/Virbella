import axios from "axios";
import { Building } from "../models/buildings";
import { Elevator } from "../models/elevator";
import { BaseRepository } from "./BaseRepository";

export class BuildingRepository extends BaseRepository {

    public async GetAll(): Promise<Building[]> {
        try {
            const resp = await axios.get(`${this.baseUrl}/buildings`);
            const buildings: Building[] = resp.data;
            buildings.forEach(async (b: Building) => {
                b.elevators = await this.GetElevators(b.id);
            });
            return buildings;
        } catch (err) {
            return err;
        }
    }

    public async Get(id: number): Promise<Building> {
        try {
            const resp = await axios.get(`${this.baseUrl}/buildings/${id}`);
            return resp.data;
        } catch (err) {
            return err;
        }
    }

    public async GetElevators(id: number): Promise<Elevator[]> {
        try {
            const resp = await axios.get(`${this.baseUrl}/elevators?buildingId=${id}`);
            return resp.data as Elevator[];
        } catch (err) {
            return err;
        }
    }
}