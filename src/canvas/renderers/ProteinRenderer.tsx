import type { ProteinObject } from '../../domain/objects/objectTypes'

interface ProteinRendererProps {
  object: ProteinObject
  selected: boolean
  onSelect: (id: string | null) => void
}

export function ProteinRenderer({
  object,
  selected,
  onSelect,
}: ProteinRendererProps) {
  if (!object.visible) return null

  const width = object.width ?? 0
  const height = object.height ?? 0
  const fill = object.proteinType === 'carrier' ? '#c7d2fe' : '#bfdbfe'
  const stroke = selected
    ? '#2563eb'
    : object.proteinType === 'carrier'
      ? '#6366f1'
      : '#2563eb'

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
        rx="24"
        fill={fill}
        stroke={stroke}
        strokeWidth={selected ? 5 : 3}
      />
      <text
        x={object.x + width / 2}
        y={object.y + height / 2}
        textAnchor="middle"
        fontSize="16"
        fill="#1e293b"
        fontWeight="700"
      >
        {object.label ?? object.proteinType}
      </text>
    </g>
  )
}