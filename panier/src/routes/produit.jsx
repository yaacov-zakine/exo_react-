import { createFileRoute } from '@tanstack/react-router'
import ProduitPage from '../pages/ProduitPage.jsx'

export const Route = createFileRoute('/produit')({
  component: ProduitPage,
})