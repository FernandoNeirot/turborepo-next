import React from "react";
import { Button } from "../../form/button";

export type AlertModalVariant = "success" | "error" | "warning" | "default";

export interface AlertModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  variant?: AlertModalVariant;
  onClose?: () => void;
  onCancel?: () => void;
  onContinue?: () => void;
  cancelLabel?: string;
  continueLabel?: string;
}

const AlertModal = ({
  isOpen,
  title,
  description,
  variant = "default",
  onClose,
  onCancel,
  onContinue,
  cancelLabel = "Cancelar",
  continueLabel = "Continuar",
}: AlertModalProps) => {
  if (!isOpen) return null;

  const variantStyles = {
    success: {
      border: "border-l-4 border-l-green-500",
      title: "text-green-700",
      bg: "bg-green-50",
    },
    error: {
      border: "border-l-4 border-l-red-500",
      title: "text-red-700",
      bg: "bg-red-50",
    },
    warning: {
      border: "border-l-4 border-l-yellow-500",
      title: "text-yellow-700",
      bg: "bg-yellow-50",
    },
    default: {
      border: "",
      title: "text-gray-900",
      bg: "bg-white",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={`${styles.bg} ${styles.border} rounded-lg shadow-xl p-6 max-w-md w-full mx-4`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={`text-xl font-semibold ${styles.title} mb-3`}>
          {title}
        </h2>
        <p className="text-gray-600 mb-4">{description}</p>

        {(onCancel || onContinue) && (
          <div className="flex gap-3 justify-end mt-4">
            {onCancel && (
              <Button
                label={cancelLabel}
                onClick={onCancel}
                backgroundColor="TRANSPARENT"
                textColor="#6b7280"
                size="default"
              />
            )}
            {onContinue && (
              <Button
                label={continueLabel}
                onClick={onContinue}
                backgroundColor={
                  variant === "error"
                    ? "RED"
                    : variant === "warning"
                      ? "PURPLE"
                      : variant === "success"
                        ? "GREEN"
                        : "BLUE"
                }
                size="default"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertModal;
