import { clsx } from 'clsx';

export const Card = ({ children, className, ...props }) => (
  <div className={clsx('card', className)} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ children, className, ...props }) => (
  <div className={clsx('card-header', className)} {...props}>
    {children}
  </div>
);

export const CardContent = ({ children, className, ...props }) => (
  <div className={clsx('card-content', className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className, ...props }) => (
  <h3 className={clsx('card-title', className)} {...props}>
    {children}
  </h3>
);

export const Button = ({
  children,
  variant = 'primary',
  disabled,
  className,
  ...props
}) => (
  <button
    className={clsx(
      'btn',
      variant === 'primary' && 'btn-primary',
      variant === 'secondary' && 'btn-secondary',
      className,
    )}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

export const Alert = ({ children, variant = 'info', className, ...props }) => (
  <div
    className={clsx(
      'alert',
      variant === 'info' && 'alert-info',
      variant === 'success' && 'alert-success',
      variant === 'warning' && 'alert-warning',
      variant === 'error' && 'alert-error',
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export const Input = ({ label, className, ...props }) => (
  <div className="space-y-1">
    {label && (
      <label className="block text-sm font-medium text-gray-700">{label}</label>
    )}
    <input
      className={clsx(
        'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
        className,
      )}
      {...props}
    />
  </div>
);

export const Select = ({ label, options, className, ...props }) => (
  <div className="space-y-1">
    {label && (
      <label className="block text-sm font-medium text-gray-700">{label}</label>
    )}
    <select
      className={clsx(
        'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
        className,
      )}
      {...props}
    >
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
