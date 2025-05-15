import { useToast } from '@/hooks/useToast';
import { Toast, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';

//Toaster가 있어야 toast를 사용할 수 있다.
export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, action, ...props }) {
        return (
          <Toast key={id} {...props} className="flex flex-col" duration={2500}>
            {title && <ToastTitle>{title}</ToastTitle>}
            {action}
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
