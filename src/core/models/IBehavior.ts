namespace Arch {
    export interface IBehavior {
        name: string;
        owner: SimObject;
        update(time: number): void;
        apply(userData: any): void;
    }
}
