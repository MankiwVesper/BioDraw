import type {
  SceneObject,
  TextObject,
} from "../../../domain/objects/objectTypes";
import {
  ColorInput,
  FieldGrid,
  FormField,
  NumberInput,
  Section,
  SelectInput,
  TextareaInput,
} from "./shared";

interface TextInspectorProps {
  object: TextObject;
  onUpdateObject: (objectId: string, patch: Partial<SceneObject>) => void;
}

const alignOptions: Array<{ label: string; value: string }> = [
  { label: "左对齐", value: "left" },
  { label: "居中", value: "center" },
  { label: "右对齐", value: "right" },
];

const fontWeightOptions: Array<{ label: string; value: string }> = [
  { label: "常规", value: "normal" },
  { label: "加粗", value: "bold" },
];

export function TextInspector({ object, onUpdateObject }: TextInspectorProps) {
  return (
    <Section title="文本属性">
      <FieldGrid columns={1}>
        <FormField label="文本内容">
          <TextareaInput
            value={object.text}
            rows={4}
            onChange={(value: string) =>
              onUpdateObject(object.id, { text: value })
            }
          />
        </FormField>
      </FieldGrid>

      <div style={{ height: 8 }} />

      <FieldGrid columns={2}>
        <FormField label="字号">
          <NumberInput
            value={object.fontSize}
            onChange={(value: number) =>
              onUpdateObject(object.id, { fontSize: value })
            }
          />
        </FormField>

        <FormField label="颜色">
          <ColorInput
            value={object.color}
            onChange={(value: string) =>
              onUpdateObject(object.id, { color: value })
            }
          />
        </FormField>
      </FieldGrid>

      <div style={{ height: 8 }} />

      <FieldGrid columns={2}>
        <FormField label="对齐">
          <SelectInput
            value={object.align ?? "left"}
            options={alignOptions}
            onChange={(value: string) =>
              onUpdateObject(object.id, {
                align: value as TextObject["align"],
              })
            }
          />
        </FormField>

        <FormField label="字重">
          <SelectInput
            value={object.fontWeight ?? "normal"}
            options={fontWeightOptions}
            onChange={(value: string) =>
              onUpdateObject(object.id, {
                fontWeight: value as TextObject["fontWeight"],
              })
            }
          />
        </FormField>
      </FieldGrid>
    </Section>
  );
}
