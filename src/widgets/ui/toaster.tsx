import { useToast } from '@/src/shared/model/useToast';
import { Toast, ToastProvider, ToastTitle, ToastViewport } from '@/src/shared/ui/toast';

//Toaster가 있어야 toast를 사용할 수 있다.
export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, action, duration = 2500, ...props }) {
        return (
          <Toast key={id} {...props} className="flex flex-col" duration={duration}>
            {title && <ToastTitle>{title}</ToastTitle>}
            {action}
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
