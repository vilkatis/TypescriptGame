/// <reference path="../behavior.ts" />
/// <reference path="../behavior-manager.ts" />
/// <reference path="player-behavior-builder.ts" />
namespace Arch {
    export class PlayerBehavior extends Behavior implements IMessageHandler {
        private _acceleration: Vector2;
        private _velocity: Vector2 = Vector2.zero;
        private _isAlive: boolean = true;
       private _playerCollisionComponent: string;
       private _groundCollisionComponent: string;
       private _animatedSpriteName: string;
       private _sprite: AnimatedSpriteComponent;
        public constructor(data: PlayerBehaviorData) {
            super(data);
            this._acceleration = data.acceleration;
            this._playerCollisionComponent = data.playerCollisionComponent;
            this._groundCollisionComponent = data.groundCollisionComponent;
            this._animatedSpriteName = data.animatedSpriteName;
            Message.subscribe(Constants.MOUSE_DOWN, this);
            Message.subscribe(`${Constants.COLLISION_ENTRY}::${this._playerCollisionComponent}`, this);
        }

        public updateReady(): void {
            super.updateReady();
            // Obtain a reference to the animated sprite.
            this._sprite = this._owner.getComponentByName(this._animatedSpriteName) as AnimatedSpriteComponent;
            if (this._sprite === undefined) {
                throw new Error(`AnimatedSpriteComponent named ${this._animatedSpriteName} is not attached to the owned of this component.`);
            }
        }

        public update(time: number): void {
            if (!this._isAlive) return;
            const seconds: number = time / 1000;
            this._velocity.add(this._acceleration.clone().scale(seconds));
            // Limit max speed
            if (this._velocity.y > 400) {
                this._velocity.y = 400;
            }
            // Prevent flying too high
            if (this._owner.transform.position.y < -13) {
                this._owner.transform.position.y = -13;
                this._velocity.y = 0;
            }

            this._owner.transform.position.add(this._velocity.clone().scale(seconds).toVector3());

            if (this._velocity.y < 0) {
                this._owner.transform.rotation.z -= Math.degToRad(600.0) * seconds;
                if (this._owner.transform.rotation.z < Math.degToRad(-20)) {
                    this._owner.transform.rotation.z = Math.degToRad(-20);
                }
            }

            if (this._isFalling() || !this._isAlive) {
                this._owner.transform.rotation.z += Math.degToRad(480.0) * seconds;
                if (this._owner.transform.rotation.z > Math.degToRad(90)) {
                    this._owner.transform.rotation.z = Math.degToRad(90);
                }
            }

            if (this._shouldNotFlap()) {
                this._sprite.stop();
            } else {
                if (!this._sprite.isPlaying()) {
                    this._sprite.play();
                }
            }
            super.update(time);
        }

        public onMessage(message: Arch.Message): void {
            switch (message.code) {
                case Constants.MOUSE_DOWN:
                    this._onFlap();
                    break;
                case `${Constants.COLLISION_ENTRY}::${this._playerCollisionComponent}`:
                    const data: CollisionData = message.context as CollisionData;
                    if (data.a.name === this._groundCollisionComponent || data.b.name === this._groundCollisionComponent) {
                        this._die();
                        this._decelerate();
                        Message.send(Constants.PLAYER_DEATH, this);
                    }
                    break;
            }
        }

        private _isFalling(): boolean {
            return this._velocity.y > 220.0;
        }

        private _shouldNotFlap(): boolean {
            return this._velocity.y > 220.0 || !this._isAlive;
        }

        private _die(): void {
            this._isAlive = false;
            AudioManager.playSound('dead');
        }

        private _decelerate(): void {
            this._acceleration.y = 0;
            this._velocity.y = 0;
        }

        private _onFlap(): void {
            if (this._isAlive) {
                this._velocity.y = -280;
                AudioManager.playSound('flap');
            }
        }

        private _onRestart(y: number): void {
            this._owner.transform.rotation.z = 0;
            this._owner.transform.position.set(33, y);
            this._velocity.set(0, 0);
            this._acceleration.set(0, 920);
            this._isAlive = true;
            this._sprite.play();
        }
    }
    BehaviorManager.registerBuilder(new PlayerBehaviorBuilder());
}
