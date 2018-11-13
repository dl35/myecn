

export class DataCompet implements IDataCompet {
    bassin = '25';
    categories: Categories = {'av': true, 'dep': true, 'je': true, 'ma': true, 'nat': true, 'reg': true};
    choixnages = false;
    commentaires = '';
    debut: Date = null;
    nb = 0 ;
    entraineur = '';
    fin: Date  = null;
    heure = '07';
    id = null;
    lien = '';
    lieu = '';
    limite: Date  = null;
    max = 0;
    nom = '';
    type = 'compet';
    verif = false;

    constructor() { }

}

 interface Categories {

    av: boolean;
    dep: boolean;
    je: boolean;
    ma: boolean;
    nat: boolean;
    reg: boolean;
}


 interface IDataCompet {
    bassin: string;
    categories: Categories;
    choixnages: boolean;
    commentaires?: string;
    debut: Date;
    nb: number;
    entraineur: string;
    fin: Date;
    heure: string;
    id: number;
    lien?: string;
    lieu: string;
    limite: Date;
    max: number;
    nom: string;
    type: string;
    verif: boolean;

}
