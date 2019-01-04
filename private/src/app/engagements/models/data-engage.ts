export class CompetEngage implements ICompetEngage {
    id = null;
    label = '';
    constructor() { }

}


interface ICompetEngage {

    id: number;
    label: string;
}


interface IEngage {

    day: string;
    presence: string;
    edid: string;
}



export class LicEngage {

    id: number;
    nom: string;
    prenom: string;
    categorie: string;
    rang: string;
    presence: string;
    notification: string;
    extranat: string;
    eng: Array<IEngage>;
}


