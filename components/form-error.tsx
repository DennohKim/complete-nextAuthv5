import  { ExclamationTriangleIcon } from "@radix-ui/react-icons";


interface FormErrorMessageProps {
  message?: string;
}

export const FormError = ({message}: FormErrorMessageProps) => {
	if(!message) return null;

	return (
	<div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
	  <ExclamationTriangleIcon className="h-4 w-4" />
	  <span>{message}</span>
	</div>
  );
}                  