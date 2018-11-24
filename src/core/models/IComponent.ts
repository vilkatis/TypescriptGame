namespace Arch {
    export interface IComponent {
        name: string;
        owner: SimObject;
        load(): void;
        updateReady(): void;
        update(time: number): void;
        render(shader: Shader): void;
    }
}