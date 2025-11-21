import { createFileRoute } from '@tanstack/react-router'
import PokemonList from '../components/PokemonList'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><PokemonList /></div>
}
