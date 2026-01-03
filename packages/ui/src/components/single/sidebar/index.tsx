import React, { useEffect } from "react";

export interface SidebarMobileProps {
  isOpen: boolean;
  onClose: () => void;
  user?: string | null;
  isAuth?: boolean;
  onDashboardClick?: () => void;
  onLogoutClick?: () => void;
  onLoginClick?: () => void;
}

const SidebarMobile = ({
  isOpen,
  onClose,
  user,
  isAuth = false,
  onDashboardClick,
  onLogoutClick,
  onLoginClick,
}: SidebarMobileProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleDashboard = () => {
    onDashboardClick?.();
    onClose();
  };

  const handleLogout = () => {
    onLogoutClick?.();
    onClose();
  };

  const handleLogin = () => {
    onLoginClick?.();
    onClose();
  };

  return (
    <>
      <div
        className={` fixed inset-0 bg-black z-90 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar que se desliza de derecha a izquierda */}
      <div
        className={`fixed top-0 right-0 h-full z-100 bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "auto", minWidth: "280px" }}
      >
        <div className="flex flex-col h-full">
          {/* Cabecera */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                {isAuth && user ? `Hola, ${user}` : "Menú"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Cerrar menú"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Contenido */}
          <div className="flex-1 overflow-y-auto p-6">
            {isAuth ? (
              <nav className="flex flex-col gap-4">
                {onDashboardClick && (
                  <button
                    onClick={handleDashboard}
                    className="text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                  >
                    Mi Dashboard
                  </button>
                )}
                {onLogoutClick && (
                  <button
                    onClick={handleLogout}
                    className="text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                  >
                    Cerrar sesión
                  </button>
                )}
              </nav>
            ) : (
              <nav className="flex flex-col gap-4">
                {onLoginClick && (
                  <button
                    onClick={handleLogin}
                    className="text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                  >
                    Ingresar con Google
                  </button>
                )}
              </nav>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarMobile;
