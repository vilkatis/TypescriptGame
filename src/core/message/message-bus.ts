namespace Arch {
    export class MessageBus {
        private static _subscriptions: Record<string, IMessageHandler[]> = {};
        private static _normalQueueMessagePerUpdate: number = 10;
        private static _normalMessageQueue: MessageSubscriptionNode[] = [];

        public static addSubscription(code: string, handler: IMessageHandler): void {
            if (MessageBus._subscriptions[code] === undefined) {
                MessageBus._subscriptions[code] = [];
            }

            if (MessageBus._subscriptions[code].indexOf(handler) !== -1) {
                console.warn(`Attempting to add a duplicated handler to code: ${code} . Subscription not added.`)
            } else {
                MessageBus._subscriptions[code].push(handler);
            }
        }

        public static removeSubscription(code: string, handler: IMessageHandler): void {
            if (MessageBus._subscriptions[code] === undefined) {
                console.warn(`Cannot unsubscribe handler from code: ${code} because that code is not subscribed to`);
                return;
            }

            let nodeIndex: number = MessageBus._subscriptions[code].indexOf(handler);
            if (nodeIndex !== -1) {
                MessageBus._subscriptions[code].splice(nodeIndex, 1);
            }
        }

        public static post(message: Message): void {
            console.log(`Message posted: ${message}`);
            let handlers: IMessageHandler[] = MessageBus._subscriptions[message.code];
            if (handlers === undefined) {
                return;
            }

            for (let handler of handlers) {
                if (message.priority === MessagePriority.HIGH) {
                    handler.onMessage(message);
                } else {
                    MessageBus._normalMessageQueue.push(new MessageSubscriptionNode(message, handler));
                }
            }
        }

        public static update(time: number): void {
            if (MessageBus._normalMessageQueue.length === 0) {
                return;
            }
            let messageLimit: number = Math.min(MessageBus._normalQueueMessagePerUpdate, MessageBus._normalMessageQueue.length);
            for (let i = 0; i < messageLimit; ++i) {
                let node: MessageSubscriptionNode = MessageBus._normalMessageQueue.pop();
                node.handler.onMessage(node.message);
            }
        }
    }
}