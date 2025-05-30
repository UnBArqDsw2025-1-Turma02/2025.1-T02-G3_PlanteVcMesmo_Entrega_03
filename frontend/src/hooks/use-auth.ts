import type { User } from '@/types/models/user';

import { ref } from 'vue';

const user = ref<User>();

export function useAuth() {
  return {
    user
  };
}
