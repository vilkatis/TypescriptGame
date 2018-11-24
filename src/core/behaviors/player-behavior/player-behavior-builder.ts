namespace Arch {
    export class PlayerBehaviorBuilder implements IBehaviorBuilder {
        public get type(): string {
            return 'player';
        }

        public buildFromJson(json: any): IBehavior {
            const data: PlayerBehaviorData = new PlayerBehaviorData();
            data.setFromJson(json);
            return new PlayerBehavior(data);
        }

    }
}