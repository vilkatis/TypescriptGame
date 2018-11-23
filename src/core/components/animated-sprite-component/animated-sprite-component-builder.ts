namespace Arch {
    export class AnimatedSpriteComponentBuilder implements IComponentBuilder {
        public get type(): string {
            return 'animatedSprite';
        }

        public buildFromJson(json: any): IComponent {
            const data: AnimatedSpriteComponentData = new AnimatedSpriteComponentData();
            data.setFromJson(json);
            return new AnimatedSpriteComponent(data);
        }

    }
}