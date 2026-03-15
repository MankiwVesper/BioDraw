import type {
  MarkerObject,
  SceneObject,
} from "../../../domain/objects/objectTypes";
import {
  ColorInput,
  FieldGrid,
  FormField,
  Section,
  SelectInput,
  TextInput,
} from "./shared";

interface MarkerInspectorProps {
  object: MarkerObject;
  onUpdateObject: (objectId: string, patch: Partial<SceneObject>) => void;
}

const markerTypeOptions = [
  { label: "custom", value: "custom" },
  { label: "atp", value: "atp" },
  { label: "gradient", value: "gradient" },
  { label: "energy", value: "energy" },
];

export function MarkerInspector({
  object,
  onUpdateObject,
}: MarkerInspectorProps) {
  return (
    <Section title="标记属性">
      <FieldGrid columns={1}>
        <FormField label="标记类型">
          <SelectInput
            value={object.markerType}
            options={markerTypeOptions}
            onChange={(value) =>
              onUpdateObject(object.id, {
                markerType: value as MarkerObject["markerType"],
              })
            }
          />
        </FormField>
      </FieldGrid>

      <div style={{ height: 8 }} />

      <FieldGrid columns={1}>
        <FormField label="文本">
          <TextInput
            value={object.text ?? ""}
            onChange={(value) => onUpdateObject(object.id, { text: value })}
          />
        </FormField>
      </FieldGrid>

      <div style={{ height: 8 }} />

      <FieldGrid columns={1}>
        <FormField label="颜色">
          <ColorInput
            value={object.color ?? "#000000"}
            onChange={(value) => onUpdateObject(object.id, { color: value })}
          />
        </FormField>
      </FieldGrid>
    </Section>
  );
}
