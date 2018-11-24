namespace Arch {
    export class SimObject {
        public name: string;
        public transform: Transform = new Transform();
        private readonly _id: number;
        private _children: SimObject[] = [];
        private _scene: Scene;
        private _components: IComponent[] = [];
        private _behaviors: IBehavior[] = [];
        private _localMatrix: Matrix4x4 = Matrix4x4.identity();
        private _worldMatrix: Matrix4x4 = Matrix4x4.identity();
        private _parent: SimObject;
        private _isLoaded: boolean = false;

        public constructor(id: number, name: string, scene?: Scene) {
            this._id = id;
            this.name = name;
            this._scene = scene;
        }

        get id(): number {
            return this._id;
        }

        get worldMatrix(): Matrix4x4 {
            return this._worldMatrix;
        }

        get parent(): SimObject {
            return this._parent;
        }

        get isLoaded(): boolean {
            return this._isLoaded;
        }

        public addChild(child: SimObject): void {
            child._parent = this;
            this._children.push(child);
            child.onAdded(this._scene);
        }

        public removeChild(child: SimObject): void {
            const index: number = this._children.indexOf(child);
            if (index !== -1) {
                child._parent = undefined;
                this._children.splice(index, 1);
            }
        }

        public getComponentByName(name: string): IComponent {
            for (const component of this._components) {
                if (component.name === name) {
                    return component;
                }
            }
            for (const child of this._children) {
                const component: IComponent = child.getComponentByName(name);
                if (component !== undefined) {
                    return component;
                }
            }
            return undefined;
        }

        public getBehaviorByName(name: string): IBehavior {
            for (const behavior of this._behaviors) {
                if (behavior.name === name) {
                    return behavior;
                }
            }
            for (const child of this._children) {
                const behavior: IBehavior = child.getBehaviorByName(name);
                if (behavior !== undefined) {
                    return behavior;
                }
            }
            return undefined;
        }

        public getObjectByName(name: string): SimObject {
            if (this.name === name) {
                return this;
            }
            for (const child of this._children) {
                const result = child.getObjectByName(name);
                if (result !== undefined) {
                    return result;
                }
            }
            return undefined;
        }

        public addComponent(component: IComponent): void {
            this._components.push(component);
            component.owner = (this);
        }

        public addBehavior(behavior: IBehavior): void {
            this._behaviors.push(behavior);
            behavior.owner = (this);
        }

        public load(): void {
            this._isLoaded = true;
            for (const component of this._components) {
                component.load();
            }
            for (const child of this._children) {
                child.load();
            }
        }

        public updateReady(): void {
            for (const component of this._components) {
                component.updateReady();
            }
            for (const behavior of this._behaviors) {
                behavior.updateReady();
            }
            for (const child of this._children) {
                child.updateReady();
            }
        }

        public update(time: number): void {
            this._localMatrix = this.transform.getTransformationMatrix();
            this._updateWorldMatrix((this._parent !== undefined) ? this._parent.worldMatrix : undefined);
            for (const component of this._components) {
                component.update(time);
            }
            for (const behavior of this._behaviors) {
                behavior.update(time);
            }
            for (const child of this._children) {
                child.update(time);
            }
        }

        public render(shader: Shader): void {
            for (const component of this._components) {
                component.render(shader);
            }
            for (const child of this._children) {
                child.render(shader);
            }
        }

        protected onAdded(scene: Scene): void {
            this._scene = scene;
        }

        private _updateWorldMatrix(parentWorldMatrix: Matrix4x4): void {
            if (parentWorldMatrix !== undefined) {
                this._worldMatrix = Matrix4x4.multiply(parentWorldMatrix, this._localMatrix);
            } else {
                this._worldMatrix.copyFrom(this._localMatrix);
            }
        }
    }
}
