import { h } from 'vue';
import { toast } from 'vue-sonner';

const errorToast = (description: string) => {
  const toastId = toast('Houve um erro', {
    description: h('span', {
      class: 'text-white'
    }, description),
    action: {
      label: 'Fechar',
      onClick: () => toast.dismiss(toastId)
    },
    style: {
      backgroundColor: '#FF6666',
      color: 'white'
    }
  });
};

export {
  errorToast
};
