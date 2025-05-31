import { h } from 'vue';
import { toast } from 'vue-sonner';

const successToast = (description: string) => {
  const toastId = toast('Sucesso', {
    description: h('span', {
      class: 'text-white'
    }, description),
    action: {
      label: 'Fechar',
      onClick: () => toast.dismiss(toastId)
    },
    style: {
      backgroundColor: '#53904D',
      color: 'white'
    }
  });
};

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
  successToast,
  errorToast
};
