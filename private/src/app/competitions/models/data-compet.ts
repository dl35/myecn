import { IDataCompet } from './idata-compet';
import { Categories } from './categories';

export class DataCompet implements IDataCompet {
    bassin = '25';
    categories: Categories = {'av': true, 'dep': true, 'je': true, 'ma': true, 'nat': true, 'reg': true};
    choixnages = false;
    commentaires = '';
    debut: Date = null;
    del = false ;
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
/*constructor(compet?: IDataCompet ) {
   // if ( compet == null )  return;
    this.bassin = compet.bassin;
    this.choixnages = compet.choixnages ;
    this.commentaires = compet.commentaires;
    this.debut = compet.debut;
    this.fin =  compet.fin ;
    this.limite = compet.limite;
    this.heure = compet.heure;
    this.max = compet.max;
    this.type = compet.type;
    this.verif = compet.verif;
    this.nom = compet.nom ;
    this.id = compet.id ;
    this.lieu = compet.lieu;
    this.del = compet.del;
}*/



}
