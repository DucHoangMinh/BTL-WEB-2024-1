import {useToast} from 'vue-toast-notification';
const $toast = useToast();

const showMessages = {
    success: (message) => {
        $toast.success(message, {
            position: 'top-right'
        });
    },
    error: (message) => {
        $toast.error(message,{
            position: 'top-right'
        });
    },
    warning: (message) => {
        $toast.warning(message,{
            position: 'top-right'
        });
    }
}
export default showMessages;