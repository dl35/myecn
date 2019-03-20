export interface ILogin {
    id: string;
    user: string;
    passwd: string;
    icon?: string;
    color?: string;
    profile: 'admin' | 'user' | 'ent' ;
}
