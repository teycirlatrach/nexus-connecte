interface FieldErrorProps {
  id: string;
  message?: string;
}

const FieldError = ({ id, message }: FieldErrorProps) => {
  if (!message) return null;
  return (
    <p id={id} className="text-xs text-red-400 mt-0.5">
      {message}
    </p>
  );
};

export default FieldError;
