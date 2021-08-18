import axios from "axios";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { ElevatorDto } from "../dto/elevatorDto";
import { DoorState, Elevator, Status } from "../models/elevator";
import { BaseRepository } from "./BaseRepository";
import { BuildingRepository } from "./BuildingRepository";

export class ElevatorRepository extends BaseRepository {

    // singleton pattern for the instance allows 
    // resuse of the same repo instance and can, in some cases,
    // prevent stack errors resulting from mutual dependence 
    // of 2 repos. See BaseRepository for more details.
    private buildingRepo = new BuildingRepository;
    private static instance: ElevatorRepository;
    public static getInstance(): ElevatorRepository {
        if (!ElevatorRepository.instance) {
            ElevatorRepository.instance = new ElevatorRepository();
        }
        return ElevatorRepository.instance;
    }

    /**
     * returns all stored elevators in dto form
     *
     * @returns {Promise<ElevatorDto[]>}
     * @memberof ElevatorRepository
     */
    public async GetAll(): Promise<ElevatorDto[]> {
        try {
            const resp = await axios.get(`${this.baseUrl}/elevators`);

            // using Promise.all all to run these mappings to dto to allow us to run the promises
            // in parallel rather than in series. This mapping would probably be better
            // done using a proper ORM. This is quite rudimentary.
            let elevators: ElevatorDto[] = await Promise.all(resp.data.map(async (d) => {
                try {
                    const item = await ElevatorRepository.ToDto(d);
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
     * gets a single elevator in dto form
     *
     * @param {number} id
     * @returns {Promise<ElevatorDto>}
     * @memberof ElevatorRepository
     */
    public async Get(id: number): Promise<ElevatorDto> {
        try {
            const elevator = await this.GetElevatorData(id);
            return await ElevatorRepository.ToDto(elevator) as ElevatorDto;
        } catch (err) {
            return err;
        }
    }

    /**
     * gets a single elevator in raw data form for internal repo use. This
     * is used ubiquitously, and serves as a first check as to the elevator's 
     * existence
     *
     * @private
     * @param {number} id
     * @returns {Promise<Elevator>}
     * @memberof ElevatorRepository
     */
    private async GetElevatorData(id: number): Promise<Elevator> {
        try {
            const resp = await axios.get(`${this.baseUrl}/elevators/${id}`);
            if (!resp.data) {
                throw new NotFoundError('Elevator not found!');
            }
            return resp.data;
        } catch (err) {
            return err;
        }
    }

    /**
     * moves an elevator to a new floor. First checks if the floor exists; does nothing
     * if the elevator is already there.
     *
     * @param {number} id
     * @param {number} floorNumber
     * @returns {Promise<boolean>}
     * @memberof ElevatorRepository
     */
    public async MoveToFloor(id: number, floorNumber: number): Promise<boolean> {
        try {
            const elevator = await this.GetElevatorData(id);
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

    /**
     * opens and closes the elevator door by changing its door state. A proper
     * ORM like Mongoose would make this a bit more elegant.
     *
     * @param {number} id
     * @param {DoorState} state
     * @returns {Promise<boolean>}
     * @memberof ElevatorRepository
     */
    public async SetDoorState(id: number, state: DoorState): Promise<boolean> {
        try {
            const elevator = await this.GetElevatorData(id);
            elevator.doorState = state;
            await axios.put(`${this.baseUrl}/elevators/${id}`, elevator);
            return true;
        } catch (err) {
            return err;
        }
    }

    /**
     * This method allows the easy conversion of a raw data structure to a readable 
     * data transfer object. Fields like status and door state can be translated to 
     * human readable strings like "open" or "active". This could have been placed 
     * in the model itself, but some of the data, like the nested building object, need
     * to be queried from the database, and data queries do ont belong in a model method.
     *
     * @static
     * @param {Elevator} elevator
     * @param {boolean} [includeBuildings=true]
     * @returns {Promise<ElevatorDto>}
     * @memberof ElevatorRepository
     */
    public static async ToDto(elevator: Elevator, includeBuildings: boolean = true): Promise<ElevatorDto> {
        const dto = new ElevatorDto();
        dto.id = elevator.id;
        dto.status = Status[elevator.status];
        dto.currentFloor = elevator.currentFloor;
        dto.availableFloors = elevator.availableFloors;
        dto.doorState = DoorState[elevator.doorState];
        if (includeBuildings) dto.building = await this.getInstance().buildingRepo.Get(elevator.buildingId, false);
        return dto;
    }
}