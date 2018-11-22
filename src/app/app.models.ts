import { FormGroup } from '@angular/forms';
import { StaticInjector } from '@angular/core/src/di/injector';

export interface AppViewModel{
    address: string;
    latitude: number;
    longitude: number;
    baseGoogleUrl: string;
    googleApiKey: string;
    errorMessage: string;
}

export interface GoogleResult{
    results: Array<LocationData>;
    status: string;
}

export interface LocationData{
    address_components: Array<any>;
    formatted_address: string;
    geometry: Geometry;
    partial_match: boolean;
    place_id: string;
    plus_code: any;
    types: Array<string>;    
}

export interface Geometry{
    location: Location;
    location_type: string;
    viewport: any;    
}

export interface Location{
    lat: number;
    lng: number;
}
