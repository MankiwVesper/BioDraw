import type { SceneObject } from '../domain/objects/objectTypes'
import { ArrowRenderer } from './renderers/ArrowRenderer'
import { MarkerRenderer } from './renderers/MarkerRenderer'
import { MembraneRenderer } from './renderers/MembraneRenderer'
import { ParticleRenderer } from './renderers/ParticleRenderer'
import { ProteinRenderer } from './renderers/ProteinRenderer'
import { RegionRenderer } from './renderers/RegionRenderer'
import { TextRenderer } from './renderers/TextRenderer'

interface RenderContext {
  selected: boolean
  onSelect: (id: string | null) => void
}

export function renderSceneObject(object: SceneObject, context: RenderContext) {
  switch (object.type) {
    case 'membrane':
      return <MembraneRenderer key={object.id} object={object} {...context} />
    case 'region':
      return <RegionRenderer key={object.id} object={object} {...context} />
    case 'particle':
      return <ParticleRenderer key={object.id} object={object} {...context} />
    case 'protein':
      return <ProteinRenderer key={object.id} object={object} {...context} />
    case 'marker':
      return <MarkerRenderer key={object.id} object={object} {...context} />
    case 'text':
      return <TextRenderer key={object.id} object={object} {...context} />
    case 'arrow':
      return <ArrowRenderer key={object.id} object={object} {...context} />
    default:
      return null
  }
}