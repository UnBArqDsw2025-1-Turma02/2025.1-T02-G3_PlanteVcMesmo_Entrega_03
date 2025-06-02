import { type InjectionKey, type ComputedRef } from 'vue';

export const IsActive: InjectionKey<ComputedRef<boolean>> = Symbol('is-active');
