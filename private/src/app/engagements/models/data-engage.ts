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



/*
export class LicEngage implements ILicEngage {
    id = null;
    nom: null;
    prenom: null;
    categorie: null;
    rang: null ;
    constructor() { }

}


interface ILicEngage {

    id: number;
    nom: string;
    prenom: string;
    categorie: string;
    rang: string;
}
*/
