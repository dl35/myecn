export interface ILogin {
    id: string;
    user: string;
    passwd: string;
    icon?: string;
    color?: string;
    profile: 'admin' | 'user' | 'ent' ;
}


export interface Ifilter {
    profile: null | 'admin' | 'user' | 'ent' ;
    user: string;

}
