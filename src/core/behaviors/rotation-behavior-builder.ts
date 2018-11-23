namespace Arch {
    export class RotationBehaviorBuilder implements IBehaviorBuilder {
        public get type(): string {
            return 'rotation';
        }

        public buildFromJson(json: any): IBehavior {
            const data: RotationBehaviorData = new RotationBehaviorData();
            data.setFromJson(json);
            return new RotationBehavior(data);
        }

    }
}