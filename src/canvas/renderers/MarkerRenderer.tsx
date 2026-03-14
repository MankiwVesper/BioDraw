import type { MarkerObject } from '../../domain/objects/objectTypes'

interface MarkerRendererProps {
  object: MarkerObject
  selected: boolean
  onSelect: (id: string | null) => void
}

export function MarkerRenderer({
  object,
  selected,
  onSelect,
}: MarkerRendererProps) {
  if (!object.visible) return null

  const width = object.width ?? 80
  const height = object.height ?? 32

  return (
    <g
      onClick={(event) => {
        event.stopPropagation()
        onSelect(object.id)
      }}
      style={{ cursor: 'pointer' }}
    >
      <rect
        x={object.x}
        y={object.y}
        width={width}
        height={height}
        rx="8"
        fill={object.color ?? '#fbbf24'}
        stroke={selected ? '#2563eb' : '#b45309'}
        strokeWidth={selected ? 4 : 2}
      />
      <text
        x={object.x + width / 2}
        y={object.y + height / 2 + 5}
        textAnchor="middle"
        fontSize="16"
        fill="#111827"
        fontWeight="700"
      >
        {object.text ?? object.markerType}
      </text>
    </g>
  )
}