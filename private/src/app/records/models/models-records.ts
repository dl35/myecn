export interface IRecords {

    age: string;
    nom: string ;
    prenom: string ;
    bassin: '25'|'50';
    date: Date;
    distance: number;
    lieu: string;
    modif: Date;
    nage: 'NL'|'BRA'|'PAP'|'DOS';
    points: number ;
    sexe: 'F' | 'H' ;
    temps: number;
    type: 'CLUB'|'DEP'|'REG'|'NAT';

}

