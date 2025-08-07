import { clsx } from 'clsx';
import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A reusable Card component.
 * @param {CardProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const Card: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => (
  <div className={clsx('card', className)} {...props}>
    {children}
  </div>
);

/**
 * A reusable CardHeader component.
 * @param {CardProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const CardHeader: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => (
  <div className={clsx('card-header', className)} {...props}>
    {children}
  </div>
);

/**
 * A reusable CardContent component.
 * @param {CardProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const CardContent: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => (
  <div className={clsx('card-content', className)} {...props}>
    {children}
  </div>
);

/**
 * A reusable CardTitle component.
 * @param {CardProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const CardTitle: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => (
  <h3 className={clsx('card-title', className)} {...props}>
    {children}
  </h3>
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

/**
 * A reusable Button component.
 * @param {ButtonProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  ...props
}) => (
  <button
    className={clsx(
      'btn',
      {
        'btn-primary': variant === 'primary',
        'btn-secondary': variant === 'secondary',
      },
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  className?: string;
}

/**
 * A reusable Input component.
 * @param {InputProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const Input: React.FC<InputProps> = ({
  id,
  label,
  className,
  ...props
}) => (
  <div className="flex flex-col">
    {label && (
      <label htmlFor={id} className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <input 
      id={id} 
      className={clsx(
        'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900', 
        className
      )} 
      {...props} 
    />
  </div>
);

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label?: string;
  children?: React.ReactNode;
  className?: string;
  options?: { value: string; label: string }[];
}

/**
 * A reusable Select component.
 * @param {SelectProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const Select: React.FC<SelectProps> = ({
  id,
  label,
  children,
  className,
  options,
  ...props
}) => (
  <div className="flex flex-col">
    {label && (
      <label htmlFor={id} className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <select 
      id={id} 
      className={clsx(
        'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900', 
        className
      )} 
      {...props}
    >
      {options
        ? options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        : children}
    </select>
  </div>
);

export interface AlertProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * A reusable Alert component.
 * @param {AlertProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const Alert: React.FC<AlertProps> = ({
  title,
  children,
  className,
  ...props
}) => (
  <div className={clsx('alert', className)} {...props}>
    <h4 className="font-bold">{title}</h4>
    <p>{children}</p>
  </div>
);
