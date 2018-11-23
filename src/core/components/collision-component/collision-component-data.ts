namespace Arch {
    export class CollisionComponentData implements IComponentData {
        public name: string;
        public shape: IShape2D;

        public setFromJson(json: any): void {
            if (json.name !== undefined) {
                this.name = String(json.name);
            }
            if (json.shape === undefined) {
                throw new Error('CollisionComponentData requires shape to be present.');
            } else {
                if (json.shape.type === undefined) {
                    throw new Error('CollisionComponentData requires shape.type to be present.');
                }
                const shapeType: string = String(json.shape.type).toLowerCase();
                switch (shapeType) {
                    case 'rectangle':
                        this.shape = new Rectangle2D();
                        break;
                    case 'circle':
                        this.shape = new Circle2D();
                        break;
                    default:
                        throw new Error(`Unsupported shape type: ${shapeType}.`);
                }
                this.shape.setFromJson(json.shape);
            }
        }
    }
}