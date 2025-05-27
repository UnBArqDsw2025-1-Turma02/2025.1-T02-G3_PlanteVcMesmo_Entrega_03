import { ref } from 'vue';

const user = ref(false);

export function useAuth() {
  return {
    user
  };
}
