import type {
  SceneObject,
  TextObject,
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

interface TextInspectorProps {
  object: TextObject;
  onUpdateObject: (objectId: string, patch: Partial<SceneObject>) => void;
}

export function TextInspector({ object, onUpdateObject }: TextInspectorProps) {
  return (
    <Section title="文本属性">
      <FieldGrid columns={1}>
        <FormField label="文本内容">
          <TextInput
            value={object.text}
            onChange={(value) => onUpdateObject(object.id, { text: value })}
          />
        </FormField>
      </FieldGrid>

      <div style={{ height: 8 }} />

      <FieldGrid columns={2}>
        <FormField label="字体大小">
          <NumberInput
            value={object.fontSize}
            onChange={(value) => onUpdateObject(object.id, { fontSize: value })}
          />
        </FormField>

        <FormField label="颜色">
          <ColorInput
            value={object.color}
            onChange={(value) => onUpdateObject(object.id, { color: value })}
          />
        </FormField>
      </FieldGrid>

      <div style={{ height: 8 }} />

      <FieldGrid columns={2}>
        <FormField label="对齐">
          <ReadonlyValue value={object.align ?? "-"} />
        </FormField>

        <FormField label="字重">
          <ReadonlyValue value={object.fontWeight ?? "-"} />
        </FormField>
      </FieldGrid>
    </Section>
  );
}
