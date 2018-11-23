namespace Arch {
    export class SpriteComponentBuilder implements IComponentBuilder {
        public get type(): string {
            return 'sprite';
        }

        public buildFromJson(json: any): IComponent {
            const data: SpriteComponentData = new SpriteComponentData();
            data.setFromJson(json);
            return new SpriteComponent(data);
        }

    }
}