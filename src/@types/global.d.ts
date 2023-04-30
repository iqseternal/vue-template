import type {
  PropType as VuePropType
} from 'vue'

declare global {
  declare type PropType<T> = VuePropType<T>;
}
