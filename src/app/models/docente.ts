import { Persona } from './persona';
export interface Docente {
    codDocente : number;
    email : string;
    contrasena : string;
    nivel : string;
    persona : Persona;
}
