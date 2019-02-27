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
    tarif: number;
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
    nbre_chvac10: number;
    nbre_chvac20: number;
    especes: number;
    valide: boolean;
    auto_parentale: boolean;
    cert_medical: boolean;
    fiche_medicale: boolean;
    photo: boolean;
    paye: boolean;
    reglement: boolean;

    commentaires: string;
}







