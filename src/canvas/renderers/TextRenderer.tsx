import type { TextObject } from '../../domain/objects/objectTypes'

interface TextRendererProps {
  object: TextObject
  selected: boolean
  onSelect: (id: string | null) => void
}

export function TextRenderer({
  object,
  selected,
  onSelect,
}: TextRendererProps) {
  if (!object.visible) return null

  return (
    <g
      onClick={(event) => {
        event.stopPropagation()
        onSelect(object.id)
      }}
      style={{ cursor: 'pointer' }}
    >
      <text
        x={object.x}
        y={object.y}
        fontSize={object.fontSize}
        fill={object.color}
        fontWeight={object.fontWeight ?? 'normal'}
        textAnchor={
          object.align === 'center'
            ? 'middle'
            : object.align === 'right'
              ? 'end'
              : 'start'
        }
        stroke={selected ? '#2563eb' : 'none'}
        strokeWidth={selected ? 1 : 0}
      >
        {object.text}
      </text>
    </g>
  )
}