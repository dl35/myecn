import { Categories } from './categories';

export interface IDataCompet {
    bassin: string;
    categories: Categories;
    choixnages: boolean;
    commentaires?: string;
    debut: Date;
    del?: boolean;
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
