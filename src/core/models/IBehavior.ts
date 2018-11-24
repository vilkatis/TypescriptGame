namespace Arch {
    export interface IBehavior {
        name: string;
        owner: SimObject;
        updateReady(): void;
        update(time: number): void;
        apply(userData: any): void;
    }
}
