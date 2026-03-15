import type { ChangeEvent, ReactNode } from 'react'
import type {
  ArrowObject,
  MarkerObject,
  MembraneObject,
  ParticleObject,
  ProteinObject,
  RegionObject,
  SceneObject,
  TextObject,
} from '../../domain/objects/objectTypes'

type RenderInspectorProps = {
  selectedObject: SceneObject | null
  onUpdateObject: (objectId: string, patch: Partial<SceneObject>) => void
}

function Section(props: { title: string; children: ReactNode }) {
  const { title, children } = props

  return (
    <div
      style={{
        marginBottom: 16,
        padding: 12,
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        background: '#fafafa',
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: '#374151',
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  )
}

function Row(props: { label: string; value: ReactNode }) {
  const { label, value } = props

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '88px 1fr',
        columnGap: 8,
        alignItems: 'center',
        marginBottom: 8,
        fontSize: 12,
        lineHeight: 1.5,
      }}
    >
      <div style={{ color: '#6b7280' }}>{label}</div>
      <div style={{ color: '#111827', wordBreak: 'break-word' }}>{value}</div>
    </div>
  )
}

function TextInput(props: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <input
      value={props.value}
      onChange={(event) => props.onChange(event.target.value)}
      style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: '6px 8px',
        fontSize: 12,
        border: '1px solid #d1d5db',
        borderRadius: 6,
        background: '#fff',
      }}
    />
  )
}

function NumberInput(props: {
  value: number
  onChange: (value: number) => void
}) {
  return (
    <input
      type="number"
      value={Number.isFinite(props.value) ? props.value : 0}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        props.onChange(Number(event.target.value))
      }
      style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: '6px 8px',
        fontSize: 12,
        border: '1px solid #d1d5db',
        borderRadius: 6,
        background: '#fff',
      }}
    />
  )
}

function CheckboxInput(props: {
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 12,
        color: '#111827',
      }}
    >
      <input
        type="checkbox"
        checked={props.checked}
        onChange={(event) => props.onChange(event.target.checked)}
      />
      <span>{props.checked ? '是' : '否'}</span>
    </label>
  )
}

function EmptyInspector() {
  return (
    <div
      style={{
        padding: 12,
        fontSize: 13,
        color: '#6b7280',
        lineHeight: 1.6,
        border: '1px dashed #d1d5db',
        borderRadius: 8,
        background: '#fcfcfc',
      }}
    >
      当前未选中对象。
      <br />
      请在画布中点击一个对象查看其属性。
    </div>
  )
}

function CommonInspector(props: {
  object: SceneObject
  onUpdateObject: (objectId: string, patch: Partial<SceneObject>) => void
}) {
  const { object, onUpdateObject } = props

  return (
    <>
      <Section title="基础信息">
        <Row label="ID" value={object.id} />
        <Row label="类型" value={object.type} />
        <Row
          label="名称"
          value={
            <TextInput
              value={object.name ?? ''}
              onChange={(value) => onUpdateObject(object.id, { name: value })}
            />
          }
        />
        <Row
          label="可见"
          value={
            <CheckboxInput
              checked={object.visible}
              onChange={(checked) =>
                onUpdateObject(object.id, { visible: checked })
              }
            />
          }
        />
        <Row label="锁定" value={object.locked ? '是' : '否'} />
        <Row label="层级" value={object.zIndex ?? '-'} />
      </Section>

      <Section title="位置与尺寸">
        <Row
          label="X"
          value={
            <NumberInput
              value={object.x}
              onChange={(value) => onUpdateObject(object.id, { x: value })}
            />
          }
        />
        <Row
          label="Y"
          value={
            <NumberInput
              value={object.y}
              onChange={(value) => onUpdateObject(object.id, { y: value })}
            />
          }
        />
        <Row label="宽度" value={object.width ?? '-'} />
        <Row label="高度" value={object.height ?? '-'} />
        <Row label="旋转" value={object.rotation ?? '-'} />
      </Section>
    </>
  )
}

function MembraneInspector({ object }: { object: MembraneObject }) {
  return (
    <Section title="膜对象属性">
      <Row label="标签" value={object.label ?? '-'} />
      <Row label="双层细节" value={object.showBilayerDetail ? '是' : '否'} />
      <Row label="样式变体" value={object.styleVariant ?? '-'} />
    </Section>
  )
}

function RegionInspector({ object }: { object: RegionObject }) {
  return (
    <Section title="区域属性">
      <Row label="标签" value={object.label} />
      <Row label="区域角色" value={object.regionRole} />
      <Row label="背景样式" value={object.backgroundStyle ?? '-'} />
    </Section>
  )
}

function ParticleInspector({ object }: { object: ParticleObject }) {
  return (
    <Section title="粒子属性">
      <Row label="标签" value={object.label ?? '-'} />
      <Row label="粒子名称" value={object.particleName} />
      <Row label="颜色" value={object.color} />
      <Row label="大小" value={object.size} />
      <Row label="数量" value={object.count} />
      <Row label="形状" value={object.shape ?? '-'} />
      <Row label="可移动" value={object.movable ? '是' : '否'} />
      <Row label="源区域" value={object.sourceRegionId ?? '-'} />
      <Row label="目标区域" value={object.targetRegionId ?? '-'} />
    </Section>
  )
}

function ProteinInspector({ object }: { object: ProteinObject }) {
  return (
    <Section title="蛋白属性">
      <Row label="标签" value={object.label ?? '-'} />
      <Row label="蛋白类型" value={object.proteinType} />
      <Row label="激活" value={object.active ? '是' : '否'} />
      <Row label="需要 ATP" value={object.requiresATP ? '是' : '否'} />
    </Section>
  )
}

function MarkerInspector({ object }: { object: MarkerObject }) {
  return (
    <Section title="标记属性">
      <Row label="标记类型" value={object.markerType} />
      <Row label="文本" value={object.text ?? '-'} />
      <Row label="颜色" value={object.color ?? '-'} />
    </Section>
  )
}

function TextInspector({ object }: { object: TextObject }) {
  return (
    <Section title="文本属性">
      <Row label="文本" value={object.text} />
      <Row label="字体大小" value={object.fontSize} />
      <Row label="颜色" value={object.color} />
      <Row label="对齐" value={object.align ?? '-'} />
      <Row label="字重" value={object.fontWeight ?? '-'} />
    </Section>
  )
}

function ArrowInspector({ object }: { object: ArrowObject }) {
  return (
    <Section title="箭头属性">
      <Row label="终点 X2" value={object.x2} />
      <Row label="终点 Y2" value={object.y2} />
      <Row label="颜色" value={object.color} />
      <Row label="线宽" value={object.lineWidth ?? '-'} />
      <Row label="线型" value={object.arrowStyle ?? '-'} />
      <Row label="标签" value={object.label ?? '-'} />
    </Section>
  )
}

function SpecificInspector({ object }: { object: SceneObject }) {
  switch (object.type) {
    case 'membrane':
      return <MembraneInspector object={object} />
    case 'region':
      return <RegionInspector object={object} />
    case 'particle':
      return <ParticleInspector object={object} />
    case 'protein':
      return <ProteinInspector object={object} />
    case 'marker':
      return <MarkerInspector object={object} />
    case 'text':
      return <TextInspector object={object} />
    case 'arrow':
      return <ArrowInspector object={object} />
    default:
      return null
  }
}

export default function RenderInspector({
  selectedObject,
  onUpdateObject,
}: RenderInspectorProps) {
  if (!selectedObject) {
    return <EmptyInspector />
  }

  return (
    <>
      <CommonInspector
        object={selectedObject}
        onUpdateObject={onUpdateObject}
      />
      <SpecificInspector object={selectedObject} />
    </>
  )
}