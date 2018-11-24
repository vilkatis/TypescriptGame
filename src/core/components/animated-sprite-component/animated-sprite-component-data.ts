/// <reference path="../sprite-component/sprite-component-data.ts" />

namespace Arch {
    export class AnimatedSpriteComponentData extends SpriteComponentData {
        public frameWidth: number;
        public frameHeight: number;
        public frameCount: number;
        public frameSequence: number[] = [];
        public autoPlay: boolean = true;

        public setFromJson(json: any): void {
            super.setFromJson(json);

            if (json.autoPlay !== undefined) {
                this.autoPlay = Boolean(json.autoPlay);
            }

            if (json.frameWidth === undefined) {
                throw new Error('AnimatedSpriteComponentData required frameWidth to be defined.');
            } else {
                this.frameWidth = Number(json.frameWidth);
            }

            if (json.frameHeight === undefined) {
                throw new Error('AnimatedSpriteComponentData required frameHeight to be defined.');
            } else {
                this.frameHeight = Number(json.frameHeight);
            }

            if (json.frameCount === undefined) {
                throw new Error('AnimatedSpriteComponentData required frameCount to be defined.');
            } else {
                this.frameCount = Number(json.frameCount);
            }

            if (json.frameSequence === undefined) {
                throw new Error('AnimatedSpriteComponentData required frameSequence to be defined.');
            } else {
                this.frameSequence = json.frameSequence;
            }
        }
    }
}