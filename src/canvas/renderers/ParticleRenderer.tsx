import type { ParticleObject } from '../../domain/objects/objectTypes'

interface ParticleRendererProps {
  object: ParticleObject
  selected: boolean
  onSelect: (id: string | null) => void
}

export function ParticleRenderer({
  object,
  selected,
  onSelect,
}: ParticleRendererProps) {
  if (!object.visible) return null

  const circles = []
  const count = Math.max(1, object.count)
  const gap = 24

  for (let i = 0; i < count; i += 1) {
    const cx = object.x + (i % 3) * gap + 16
    const cy = object.y + Math.floor(i / 3) * gap + 16

    circles.push(
      <circle
        key={`${object.id}-${i}`}
        cx={cx}
        cy={cy}
        r={object.size / 2}
        fill={object.color}
        stroke={selected ? '#2563eb' : '#1e3a8a'}
        strokeWidth={selected ? 3 : 1}
      />,
    )
  }

  return (
    <g
      onClick={(event) => {
        event.stopPropagation()
        onSelect(object.id)
      }}
      style={{ cursor: 'pointer' }}
    >
      {circles}
      <text
        x={object.x}
        y={object.y - 10}
        fontSize="18"
        fill="#1f2937"
        fontWeight="600"
      >
        {object.label ?? object.particleName}
      </text>
    </g>
  )
}