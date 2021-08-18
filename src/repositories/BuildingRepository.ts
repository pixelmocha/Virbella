import axios from "axios";
import { NotFoundError } from "routing-controllers";
import { BuildingDto } from "../dto/buildingDto";
import { ElevatorDto } from "../dto/elevatorDto";
import { Building } from "../models/buildings";
import { BaseRepository } from "./BaseRepository";
import { ElevatorRepository } from "./ElevatorRepository";

export class BuildingRepository extends BaseRepository {

    // singleton pattern for the instance allows 
    // resuse of the same repo instance and can, in some cases,
    // prevent stack errors resulting from mutual dependence 
    // of 2 repos. See BaseRepository for more details.
    private static instance: BuildingRepository;
    public static getInstance(): BuildingRepository {
        if (!BuildingRepository.instance) {
            BuildingRepository.instance = new BuildingRepository();
        }
        return BuildingRepository.instance;
    }

    /**
     * gets all buildings in dto form
     *
     * @returns {Promise<BuildingDto[]>}
     * @memberof BuildingRepository
     */
    public async GetAll(): Promise<BuildingDto[]> {
        try {
            const resp = await axios.get(`${this.baseUrl}/buildings`);

            // using Promise.all all to run these mappings to dto to allow us to run the promises
            // in parallel rather than in series. This mapping would probably be better
            // done using a proper ORM. This is quite rudimentary.
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

    /**
     * gets a single building in dto form
     *
     * @param {number} id
     * @param {boolean} [includeElevators=true]
     * @returns {Promise<BuildingDto>}
     * @memberof BuildingRepository
     */
    public async Get(id: number, includeElevators: boolean = true): Promise<BuildingDto> {
        try {
            const building = await this.GetBuildingData(id);
            return BuildingRepository.ToDto(building, includeElevators);
        } catch (err) {
            return err;
        }
    }

    /**
     * gets a single building in raw data form for internal repo use. This
     * is used ubiquitously, and serves as a first check as to the building's 
     * existence
     *
     * @private
     * @param {number} id
     * @returns {Promise<Building>}
     * @memberof BuildingRepository
     */
     private async GetBuildingData(id: number): Promise<Building> {
        try {
            const resp = await axios.get(`${this.baseUrl}/buildings/${id}`);
            return resp.data;
        } catch {
            throw new NotFoundError('Building not found!');
        }
    }

    /**
     * gets all elevators in dto form for a single building
     *
     * @param {number} id
     * @returns {Promise<ElevatorDto[]>}
     * @memberof BuildingRepository
     */
    public async GetElevators(id: number): Promise<ElevatorDto[]> {
        try {
            const resp = await axios.get(`${this.baseUrl}/elevators?buildingId=${id}`);
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

    /**
     * This method allows the easy conversion of a raw data structure to a readable 
     * data transfer object. This could have been placed 
     * in the model itself, but some of the data, like the nested elevators object, need
     * to be queried from the database, and data queries do not belong in a model method.
     *
     * @static
     * @param {Building} building
     * @param {boolean} [includeElevators=true]
     * @returns {Promise<BuildingDto>}
     * @memberof BuildingRepository
     */
    public static async ToDto(building: Building, includeElevators: boolean = true): Promise<BuildingDto> {
        const dto = new BuildingDto();
        dto.id = building.id;
        dto.name = building.name;
        if (includeElevators) dto.elevators = await BuildingRepository.getInstance().GetElevators(building.id);
        return dto;
    }
}
