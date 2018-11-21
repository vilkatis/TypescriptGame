namespace Arch {
    export interface IMessageHandler {
        onMessage(message: Message): void;
    }
}
