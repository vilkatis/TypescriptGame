namespace Arch {
    export class BehaviorManager {
        private static _registeredBuilders: Record<string, IBehaviorBuilder> = {};

        public static registerBuilder(builder: IBehaviorBuilder): void {
            BehaviorManager._registeredBuilders[builder.type] = builder;
        }

        public static extractBehavior(json: any): IBehavior {
            if (json.type !== undefined) {
                const builder: IBehaviorBuilder = BehaviorManager._registeredBuilders[String(json.type)];
                if (builder !== undefined) {
                    return builder.buildFromJson(json);
                } else {
                    throw new Error(`Behavior manager error - builder is not registered for type ${json.type}`);
                }
            } else {
                throw new Error('Behavior manager error - type is missing');
            }
        }
    }
}