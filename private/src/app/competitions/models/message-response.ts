export enum MessageType {
    POST,
    PUT,
    DELETE,
    NONE
}

export interface IMessageResponse {
    success: boolean;
    type: MessageType;
    message: string;
}



export class MessageResponse implements IMessageResponse {
    success = true;
    type = MessageType.NONE;
    message =  '';

    constructor() {}

    }




