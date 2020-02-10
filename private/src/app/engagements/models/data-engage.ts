interface ICompetEngage {

    id: number;
    label: string;
}


interface IEngage {

    day: string;
    presence: string;
    edid: string;
}

export class CompetEngage implements ICompetEngage {
    id = null;
    label = '';
    constructor() { }

}

export class MessageResponse {

    success: boolean;
    message: string;

}







export class LicEngage {

    id: number;
    nom: string;
    prenom: string;
    categorie: string;
    rang: string;
    sexe?: string;
    notification: string;
    extranat: number;
    commentaire: string;
    eng: Array<IEngage>;
}


