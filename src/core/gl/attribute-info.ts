namespace Arch {
    /**
     * Represents the information needed for a GLBuffer attribute
     */
    export class AttributeInfo {
        /**
         * The location of this attribute.
         */
        public location: number;
        /**
         * The size (number of elements) in this attribute (i.e. Vector = 3).
         */
        public size: number;
        /**
         * The number of elements from the beginning of the buffer.
         */
        public offset: number = 0;
    }
}
