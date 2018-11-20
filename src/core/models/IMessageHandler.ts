import { Message } from '../message/message';

export interface IMessageHandler {
    onMessage(message: Message): void;
}
