export class CompetEngage implements ICompetEngage {
    id = null;
    label = '';
    constructor() { }

}


interface ICompetEngage {

    id: number;
    label: string;
}


export class LicEngage {

    id: number;
    nom: string;
    prenom: string;
    categorie: string;
    rang: string;
}


