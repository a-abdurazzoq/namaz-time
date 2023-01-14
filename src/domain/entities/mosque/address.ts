import {City} from "../city";
import {District} from "../district";

export class Address {
    constructor(
        private city: City,
        private district: District,
        private street: string,
        private home: string
    ) {
        this.isCity(city)
        this.isDistrict(district)
        this.isStreet(street)
        this.isHome(home)
    }

    public getCity(): City {
        return this.city
    }

    public getDistrict(): District {
        return this.district
    }

    public getStreet(): string {
        return this.street
    }

    public getHome(): string {
        return this.home
    }

    private isCity(city: City): void {
        if(city.constructor !== City) {
            throw new Error("city is not string")
        }
    }

    private isDistrict(district: District): void {
        if(district.constructor !== District) {
            throw new Error("district is not string")
        }
    }

    private isStreet(street: string): void {
        if(street.constructor !== String) {
            throw new Error("street is not string")
        }
    }

    private isHome(home: string): void {
        if(home.constructor !== String) {
            throw new Error("home is not string")
        }
    }

}