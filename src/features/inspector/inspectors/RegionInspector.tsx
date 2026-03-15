import type {
  RegionObject,
  SceneObject,
} from "../../../domain/objects/objectTypes";
import {
  FieldGrid,
  FormField,
  Section,
  SelectInput,
  TextInput,
} from "./shared";

interface RegionInspectorProps {
  object: RegionObject;
  onUpdateObject: (objectId: string, patch: Partial<SceneObject>) => void;
}

const regionRoleOptions = [
  { label: "inside", value: "inside" },
  { label: "outside", value: "outside" },
  { label: "custom", value: "custom" },
];

export function RegionInspector({
  object,
  onUpdateObject,
}: RegionInspectorProps) {
  return (
    <Section title="区域属性">
      <FieldGrid columns={2}>
        <FormField label="区域角色">
          <SelectInput
            value={object.regionRole}
            options={regionRoleOptions}
            onChange={(value) =>
              onUpdateObject(object.id, {
                regionRole: value as RegionObject["regionRole"],
              })
            }
          />
        </FormField>

        <FormField label="背景样式">
          <TextInput
            value={object.backgroundStyle ?? ""}
            onChange={(value) =>
              onUpdateObject(object.id, {
                backgroundStyle: value as RegionObject["backgroundStyle"],
              })
            }
          />
        </FormField>
      </FieldGrid>
    </Section>
  );
}
