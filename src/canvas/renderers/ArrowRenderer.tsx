import type { ArrowObject } from '../../domain/objects/objectTypes'

interface ArrowRendererProps {
  object: ArrowObject
  selected: boolean
  onSelect: (id: string | null) => void
}

export function ArrowRenderer({
  object,
  selected,
  onSelect,
}: ArrowRendererProps) {
  if (!object.visible) return null

  const dashArray = object.arrowStyle === 'dashed' ? '8 6' : undefined

  return (
    <g
      onClick={(event) => {
        event.stopPropagation()
        onSelect(object.id)
      }}
      style={{ cursor: 'pointer' }}
    >
      <defs>
        <marker
          id={`arrowhead-${object.id}`}
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill={object.color} />
        </marker>
      </defs>

      <line
        x1={object.x}
        y1={object.y}
        x2={object.x2}
        y2={object.y2}
        stroke={selected ? '#2563eb' : object.color}
        strokeWidth={selected ? 5 : object.lineWidth ?? 2}
        strokeDasharray={dashArray}
        markerEnd={`url(#arrowhead-${object.id})`}
      />

      {object.label && (
        <text
          x={(object.x + object.x2) / 2}
          y={(object.y + object.y2) / 2 - 10}
          textAnchor="middle"
          fontSize="16"
          fill={selected ? '#2563eb' : object.color}
          fontWeight="600"
        >
          {object.label}
        </text>
      )}
    </g>
  )
}