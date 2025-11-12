import { useEffect } from "react";
import { useThemeStore } from "../stores/useThemeStore";

function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <button className="btn btn--ghost" onClick={toggleTheme}>
      {theme === "light" ? "Mode sombre" : "Mode clair"}
    </button>
  );
}

export default ThemeToggle;
