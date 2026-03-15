import type {
  ProteinObject,
  SceneObject,
} from "../../../domain/objects/objectTypes";
import {
  CheckboxInput,
  FieldGrid,
  FormField,
  Section,
  SelectInput,
} from "./shared";

interface ProteinInspectorProps {
  object: ProteinObject;
  onUpdateObject: (objectId: string, patch: Partial<SceneObject>) => void;
}

export function ProteinInspector({
  object,
  onUpdateObject,
}: ProteinInspectorProps) {
  return (
    <Section title="蛋白属性">
      <FieldGrid columns={2}>
        <FormField label="蛋白类型">
          <SelectInput
            value={object.proteinType}
            options={[
              { label: "channel", value: "channel" },
              { label: "carrier", value: "carrier" },
            ]}
            onChange={(value) =>
              onUpdateObject(object.id, {
                proteinType: value as ProteinObject["proteinType"],
              })
            }
          />
        </FormField>
      </FieldGrid>

      <div style={{ height: 6 }} />

      <FieldGrid columns={2}>
        <FormField label="激活">
          <CheckboxInput
            checked={Boolean(object.active)}
            onChange={(checked) =>
              onUpdateObject(object.id, { active: checked })
            }
          />
        </FormField>

        <FormField label="需要 ATP">
          <CheckboxInput
            checked={Boolean(object.requiresATP)}
            onChange={(checked) =>
              onUpdateObject(object.id, { requiresATP: checked })
            }
          />
        </FormField>
      </FieldGrid>
    </Section>
  );
}
