import type { SceneObject } from "../../../domain/objects/objectTypes";
import {
  CheckboxInput,
  FieldGrid,
  FormField,
  NumberInput,
  ReadonlyValue,
  Section,
  TextInput,
} from "./shared";

interface CommonInspectorProps {
  object: SceneObject;
  onUpdateObject: (objectId: string, patch: Partial<SceneObject>) => void;
}

export function CommonInspector({
  object,
  onUpdateObject,
}: CommonInspectorProps) {
  return (
    <>
      <Section title="基础信息">
        <FieldGrid columns={2}>
          <FormField label="类型">
            <ReadonlyValue value={object.type} />
          </FormField>

          <FormField label="层级">
            <ReadonlyValue value={object.zIndex ?? "-"} />
          </FormField>
        </FieldGrid>

        <div style={{ height: 8 }} />

        <FieldGrid columns={1}>
          <FormField label="名称">
            <TextInput
              value={object.name ?? ""}
              onChange={(value) => onUpdateObject(object.id, { name: value })}
            />
          </FormField>
        </FieldGrid>

        <div style={{ height: 8 }} />

        <FieldGrid columns={2}>
          <FormField label="可见">
            <CheckboxInput
              checked={object.visible}
              onChange={(checked) =>
                onUpdateObject(object.id, { visible: checked })
              }
            />
          </FormField>

          <FormField label="锁定">
            <ReadonlyValue value={object.locked ? "是" : "否"} />
          </FormField>
        </FieldGrid>
      </Section>

      <Section title="位置与尺寸">
        <FieldGrid columns={2}>
          <FormField label="X">
            <NumberInput
              value={object.x}
              onChange={(value) => onUpdateObject(object.id, { x: value })}
            />
          </FormField>

          <FormField label="Y">
            <NumberInput
              value={object.y}
              onChange={(value) => onUpdateObject(object.id, { y: value })}
            />
          </FormField>
        </FieldGrid>

        <div style={{ height: 8 }} />

        <FieldGrid columns={2}>
          <FormField label="宽度">
            <ReadonlyValue value={object.width ?? "-"} />
          </FormField>

          <FormField label="高度">
            <ReadonlyValue value={object.height ?? "-"} />
          </FormField>
        </FieldGrid>

        <div style={{ height: 8 }} />

        <FieldGrid columns={2}>
          <FormField label="旋转">
            <ReadonlyValue value={object.rotation ?? "-"} />
          </FormField>

          <div />
        </FieldGrid>
      </Section>
    </>
  );
}
