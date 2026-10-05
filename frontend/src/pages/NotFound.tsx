import ButtonLink from '../components/ButtonLink.tsx'
import PageHero from '../components/PageHero.tsx'

export default function NotFound() {
  return (
    <PageHero
      title="Page not found"
      intro="The page you are looking for does not exist or has moved."
    >
      <ButtonLink to="/">Back to Home</ButtonLink>
    </PageHero>
  )
}
