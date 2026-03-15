import type {
  MembraneObject,
  SceneObject,
} from "../../../domain/objects/objectTypes";
import {
  CheckboxInput,
  FieldGrid,
  FormField,
  Section,
  SelectInput,
  TextInput,
} from "./shared";

interface MembraneInspectorProps {
  object: MembraneObject;
  onUpdateObject: (objectId: string, patch: Partial<SceneObject>) => void;
}

const styleVariantOptions = [
  { label: "basic", value: "basic" },
  { label: "detailed", value: "detailed" },
];

export function MembraneInspector({
  object,
  onUpdateObject,
}: MembraneInspectorProps) {
  return (
    <Section title="膜对象属性">
      <FieldGrid columns={1}>
        <FormField label="标签">
          <TextInput
            value={object.label ?? ""}
            onChange={(value) => onUpdateObject(object.id, { label: value })}
          />
        </FormField>
      </FieldGrid>

      <div style={{ height: 8 }} />

      <FieldGrid columns={2}>
        <FormField label="双层细节">
          <CheckboxInput
            checked={object.showBilayerDetail}
            onChange={(checked) =>
              onUpdateObject(object.id, { showBilayerDetail: checked })
            }
          />
        </FormField>

        <FormField label="样式变体">
          <SelectInput
            value={object.styleVariant ?? "basic"}
            options={styleVariantOptions}
            onChange={(value) =>
              onUpdateObject(object.id, {
                styleVariant: value as MembraneObject["styleVariant"],
              })
            }
          />
        </FormField>
      </FieldGrid>
    </Section>
  );
}
