import type {
  ArrowObject,
  SceneObject,
} from "../../../domain/objects/objectTypes";
import {
  ColorInput,
  FieldGrid,
  FormField,
  NumberInput,
  ReadonlyValue,
  Section,
  TextInput,
} from "./shared";

interface ArrowInspectorProps {
  object: ArrowObject;
  onUpdateObject: (objectId: string, patch: Partial<SceneObject>) => void;
}

export function ArrowInspector({
  object,
  onUpdateObject,
}: ArrowInspectorProps) {
  return (
    <Section title="箭头属性">
      <FieldGrid columns={2}>
        <FormField label="终点 X2">
          <ReadonlyValue value={object.x2} />
        </FormField>

        <FormField label="终点 Y2">
          <ReadonlyValue value={object.y2} />
        </FormField>
      </FieldGrid>

      <div style={{ height: 8 }} />

      <FieldGrid columns={1}>
        <FormField label="颜色">
          <ColorInput
            value={object.color}
            onChange={(value) => onUpdateObject(object.id, { color: value })}
          />
        </FormField>
      </FieldGrid>

      <div style={{ height: 8 }} />

      <FieldGrid columns={2}>
        <FormField label="线宽">
          <NumberInput
            value={object.lineWidth ?? 1}
            onChange={(value) =>
              onUpdateObject(object.id, { lineWidth: value })
            }
          />
        </FormField>

        <FormField label="线型">
          <ReadonlyValue value={object.arrowStyle ?? "-"} />
        </FormField>
      </FieldGrid>

      <div style={{ height: 8 }} />

      <FieldGrid columns={1}>
        <FormField label="标签">
          <TextInput
            value={object.label ?? ""}
            onChange={(value) => onUpdateObject(object.id, { label: value })}
          />
        </FormField>
      </FieldGrid>
    </Section>
  );
}
