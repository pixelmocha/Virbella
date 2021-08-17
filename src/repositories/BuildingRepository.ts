import axios from "axios";
import { BuildingDto } from "../dto/buildingDto";
import { ElevatorDto } from "../dto/elevatorDto";
import { Building } from "../models/buildings";
import { BaseRepository } from "./BaseRepository";
import { ElevatorRepository } from "./ElevatorRepository";

export class BuildingRepository extends BaseRepository {
    private static instance: BuildingRepository;
    public static getInstance(): BuildingRepository {
        if (!BuildingRepository.instance) {
            BuildingRepository.instance = new BuildingRepository();
        }
        return BuildingRepository.instance;
    }

    public async GetAll(): Promise<BuildingDto[]> {
        try {
            const resp = await axios.get(`${this.baseUrl}/buildings`);
            let buildings: BuildingDto[] = await Promise.all(resp.data.map(async (d) => {
                try {
                    const item = await BuildingRepository.ToDto(d);
                    return item;
                } catch (err) {
                    throw err;
                }
            }));

            return buildings;
        } catch (err) {
            return err;
        }
    }

    public async Get(id: number, includeElevators: boolean = true): Promise<BuildingDto> {
        try {
            const resp = await axios.get(`${this.baseUrl}/buildings/${id}`);
            return BuildingRepository.ToDto(resp.data);
        } catch (err) {
            return err;
        }
    }

    public async GetElevators(id: number): Promise<ElevatorDto[]> {
        try {
            const resp = await axios.get(`${this.baseUrl}/elevators?buildingId=${id}`);
            console.log(resp.data)
            let elevators: ElevatorDto[] = await Promise.all(resp.data.map(async (d) => {
                try {
                    const item = await ElevatorRepository.ToDto(d, false);
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

    public static async ToDto(building: Building, includeElevators: boolean = true): Promise<BuildingDto> {
        const dto = new BuildingDto();
        dto.id = building.id;
        dto.name = building.name;
        if (includeElevators) dto.elevators = await BuildingRepository.getInstance().GetElevators(building.id);
        return dto;
    }
}
