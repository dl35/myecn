export interface IDataLicencies {
    id: string;
    nom: string;
    prenom: string;
    date: Date;
    sexe: 'F' | 'H' ;
    adresse: string;
    code_postal: number;
    ville: string;
    email1: string;
    email2: string;
    email3: string;
    telephone1: string;
    telephone2: string;
    telephone3: string;
    type: 'N' |'R' ;
    categorie: string;
    rang: string;
    officiel: string;
    entr: boolean ;
    licence: number;
    total: number;
    cotisation: number;
    banque: string;
    cheque1: number;
    cheque2: number;
    cheque3: number;
    num_cheque1: string;
    num_cheque2: string;
    num_cheque3: string;
    ch_sport: number;
    num_sport: string;
    coup_sport: number;
    num_coupsport: string;
    cheque_vac: number;
    especes: number;
    valide: boolean;
    auto_parentale: boolean;
    cert_medical: boolean;
    fiche_medicale: boolean;
    date_certmedical: Date | null ;
    ass_ffn: boolean | null;
    photo: boolean;
    paye: boolean;
    reglement: boolean;
    inscription: string;

    commentaires: string;
}

export interface IBanque {
    id: string;
    value: string;
}

export interface ICarte {
    id: string;
    value: string;
}



