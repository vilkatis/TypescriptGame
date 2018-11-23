namespace Arch {
    export enum Keys {
        LEFT = 37,
        UP = 38,
        RIGHT = 39,
        DOWN = 40
    }

    export class MouseContext {
        public leftMouseDown: boolean;
        public rightMouseDown: boolean;
        public position: Vector2;

        public constructor(leftMouseDown: boolean, rightMouseDown: boolean, position: Vector2) {
            this.leftMouseDown = leftMouseDown;
            this.rightMouseDown = rightMouseDown;
            this.position = position;
        }
    }
    export class InputManager {
        private static _keys: boolean[] = [];
        private static _previousMouseX: number;
        private static _previousMouseY: number;
        private static _mouseX: number;
        private static _mouseY: number;
        private static _leftMouseDown: boolean;
        private static _rightMouseDown: boolean;

        public static initialize(): void {
            for (let i = 0; i < 255; ++i) {
                InputManager._keys[i] = false;
            }
            window.addEventListener('keydown',  InputManager._onKeyDown);
            window.addEventListener('keyup',  InputManager._onKeyUp);
            window.addEventListener('mousemove', InputManager._onMouseMove);
            window.addEventListener('mousedown', InputManager._onMouseDown);
            window.addEventListener('mouseup', InputManager._onMouseUp);
        }

        public static isKeyDown(key: Keys): boolean {
            return InputManager._keys[key];
        }

        public static getMousePosition(): Vector2 {
            return new Vector2(InputManager._mouseX, InputManager._mouseY);
        }

        private static _onKeyDown(event: KeyboardEvent): boolean {
            InputManager._keys[event.keyCode] = true;
            return true;
            // event.preventDefault();
            // event.stopPropagation();
            // return false;
        }

        private static _onKeyUp(event: KeyboardEvent): boolean {
            InputManager._keys[event.keyCode] = false;
            return true;
            // event.preventDefault();
            // event.stopPropagation();
            // return false;
        }

        private static _onMouseMove(event: MouseEvent): void {
            InputManager._previousMouseX = InputManager._mouseX;
            InputManager._previousMouseY = InputManager._mouseY;
            InputManager._mouseX = event.clientX;
            InputManager._mouseY = event.clientY;
        }

        private static _onMouseDown(event: MouseEvent): void {
            if (event.button === 0) {
                this._leftMouseDown = true;
            } else if (event.button === 2) {
                this._rightMouseDown = true;
            }

            Message.send(Constants.MOUSE_DOWN, this, new MouseContext(InputManager._leftMouseDown, InputManager._rightMouseDown, InputManager.getMousePosition()));
        }

        private static _onMouseUp(event: MouseEvent): void {
            if (event.button === 0) {
                this._leftMouseDown = false;
            } else if (event.button === 2) {
                this._rightMouseDown = false;
            }

            Message.send(Constants.MOUSE_UP, this, new MouseContext(InputManager._leftMouseDown, InputManager._rightMouseDown, InputManager.getMousePosition()));
        }
    }
}
