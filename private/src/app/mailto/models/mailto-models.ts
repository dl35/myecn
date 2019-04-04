
export interface IMailto {

    lic: ILic[];
    comp: IComp[];
    from: IFrom[];
    ins: string;
}


interface IFrom {
    value: string;
    text: string;
}

interface IComp {
    id: number;
    nom: string;
    lieu: string;
}

interface ILic {
    id: string;
    nom: string;
    prenom: string;
    categorie: string;
    rang: string;
    officiel: string;
}
