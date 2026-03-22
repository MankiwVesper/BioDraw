import type {
  ArrowObject,
  SceneObject,
} from "../../../domain/objects/objectTypes";
import {
  ColorInput,
  FieldGrid,
  FormField,
  NumberInput,
  Section,
  SelectInput,
} from "./shared";

interface ArrowInspectorProps {
  object: ArrowObject;
  onUpdateObject: (objectId: string, patch: Partial<SceneObject>) => void;
}

const arrowStyleOptions = [
  { label: "实线", value: "solid" },
  { label: "虚线", value: "dashed" },
];

export function ArrowInspector({
  object,
  onUpdateObject,
}: ArrowInspectorProps) {
  return (
    <Section title="箭头属性">
      <FieldGrid columns={2}>
        <FormField label="终点 X2">
          <NumberInput
            value={object.x2}
            onChange={(value) => onUpdateObject(object.id, { x2: value })}
          />
        </FormField>

        <FormField label="终点 Y2">
          <NumberInput
            value={object.y2}
            onChange={(value) => onUpdateObject(object.id, { y2: value })}
          />
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
          <SelectInput
            value={object.arrowStyle ?? "solid"}
            options={arrowStyleOptions}
            onChange={(value) =>
              onUpdateObject(object.id, {
                arrowStyle: value as ArrowObject["arrowStyle"],
              })
            }
          />
        </FormField>
      </FieldGrid>
    </Section>
  );
}
