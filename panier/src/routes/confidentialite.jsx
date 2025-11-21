import { createFileRoute } from "@tanstack/react-router";
import ConfidentialitePage from "../pages/ConfidentialitePage.jsx";

export const Route = createFileRoute("/confidentialite")({
  component: ConfidentialitePage,
});
