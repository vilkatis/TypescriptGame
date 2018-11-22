namespace Arch {
    export class ComponentManager {
        private static _registeredBuilders: Record<string, IComponentBuilder> = {};

        public static registerBuilder(builder: IComponentBuilder): void {
            ComponentManager._registeredBuilders[builder.type] = builder;
        }

        public static extractComponent(json: any): IComponent {
            if (json.type !== undefined) {
                const builder: IComponentBuilder = ComponentManager._registeredBuilders[String(json.type)];
                if (builder !== undefined) {
                    return builder.buildFromJson(json);
                } else {
                    throw new Error(`Component error - builder is not registered for type ${json.type}`);
                }
            } else {
                throw new Error('Component error - type is missing');
            }
        }
    }
}
