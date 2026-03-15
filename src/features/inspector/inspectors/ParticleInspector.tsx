import type {
  ParticleObject,
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

interface ParticleInspectorProps {
  object: ParticleObject;
  onUpdateObject: (objectId: string, patch: Partial<SceneObject>) => void;
}

const shapeOptions = [
  { label: "circle", value: "circle" },
  { label: "dot", value: "dot" },
  { label: "square", value: "square" },
  { label: "triangle", value: "triangle" },
];

export function ParticleInspector({
  object,
  onUpdateObject,
}: ParticleInspectorProps) {
  return (
    <Section title="粒子属性">
      <FieldGrid columns={1}>
        <FormField label="颜色">
          <ColorInput
            value={object.color}
            onChange={(value) => onUpdateObject(object.id, { color: value })}
          />
        </FormField>

        <FormField label="形状">
          <SelectInput
            value={object.shape ?? "circle"}
            options={shapeOptions}
            onChange={(value) =>
              onUpdateObject(object.id, {
                shape: value as ParticleObject["shape"],
              })
            }
          />
        </FormField>

        <FormField label="大小">
          <NumberInput
            value={object.size}
            onChange={(value) => onUpdateObject(object.id, { size: value })}
          />
        </FormField>
      </FieldGrid>
    </Section>
  );
}
