namespace Arch {
    export abstract class Behavior implements IBehavior {
        public name: string;
        protected _data: IBehaviorData;
        protected _owner: SimObject;
        protected constructor(data: IBehaviorData) {
            this._data = data;
            this.name = this._data.name;
        }

        public set owner(owner: SimObject) {
            this._owner = owner;
        }

        public updateReady(): void {
        }

        public update(time: number): void {
        }

        public apply(userData: any): void {
        }
    }
}
