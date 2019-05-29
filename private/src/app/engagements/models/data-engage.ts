export class CompetEngage implements ICompetEngage {
    id = null;
    label = '';
    constructor() { }

}

export class MessageResponse {

    success: boolean;
    message: string;

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
    notification: number;
    extranat: number;
    eng: Array<IEngage>;
}


