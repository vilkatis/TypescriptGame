namespace Arch {
    export class KeyboardMovementBehaviorBuilder implements IBehaviorBuilder {
        public get type(): string {
            return 'keyboardMovement';
        }

        public buildFromJson(json: any): IBehavior {
            const data: KeyboardMovementBehaviorData = new KeyboardMovementBehaviorData();
            data.setFromJson(json);
            return new KeyboardMovementBehavior(data);
        }

    }
}