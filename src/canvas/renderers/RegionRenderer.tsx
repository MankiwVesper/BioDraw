import type { RegionObject } from '../../domain/objects/objectTypes'

interface RegionRendererProps {
  object: RegionObject
  selected: boolean
  onSelect: (id: string | null) => void
}

export function RegionRenderer({
  object,
  selected,
  onSelect,
}: RegionRendererProps) {
  if (!object.visible) return null

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
        width={object.width ?? 0}
        height={object.height ?? 0}
        fill={object.backgroundStyle ?? '#f8fafc'}
        stroke={selected ? '#2563eb' : '#dbe3ef'}
        strokeWidth={selected ? 3 : 1}
        rx="8"
      />
      <text
        x={object.x + 16}
        y={object.y + 28}
        fontSize="20"
        fill="#334155"
        fontWeight="600"
      >
        {object.label}
      </text>
    </g>
  )
}