namespace Arch {
    export class CollisionComponentBuilder implements IComponentBuilder {
        public get type(): string {
            return 'collision';
        }

        public buildFromJson(json: any): IComponent {
            const data: CollisionComponentData = new CollisionComponentData();
            data.setFromJson(json);
            return new CollisionComponent(data);
        }

    }
}