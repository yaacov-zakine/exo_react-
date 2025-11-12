import { createFileRoute } from "@tanstack/react-router";
import CatalogPage from "../pages/CatalogPage.jsx";

export const Route = createFileRoute("/catalogues")({
  component: CatalogPage,
});
