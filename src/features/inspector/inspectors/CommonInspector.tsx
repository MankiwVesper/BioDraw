import type { SceneObject } from "../../../domain/objects/objectTypes";
import {
  InlineField,
  NumberInput,
  ReadonlyValue,
  Section,
  TextInput,
} from "./shared";

interface CommonInspectorProps {
  object: SceneObject;
  onUpdateObject: (objectId: string, patch: Partial<SceneObject>) => void;
}

function hasLabelField(
  object: SceneObject,
): object is SceneObject & { label?: string } {
  return "label" in object;
}

export function CommonInspector({
  object,
  onUpdateObject,
}: CommonInspectorProps) {
  const isLocked = Boolean(object.locked);

  return (
    <>
      <Section title="基础信息">
        <div
          style={{
            display: "grid",
            gap: 6,
          }}
        >
          <InlineField
            label="名称"
            labelWidth={28}
            hint={isLocked ? "对象已锁定，不能修改名称" : undefined}
          >
            <TextInput
              value={object.name ?? ""}
              disabled={isLocked}
              onChange={(value) => onUpdateObject(object.id, { name: value })}
            />
          </InlineField>

          {hasLabelField(object) ? (
            <InlineField label="标签" labelWidth={28}>
              <TextInput
                value={object.label ?? ""}
                disabled={isLocked}
                onChange={(value) =>
                  onUpdateObject(object.id, { label: value })
                }
              />
            </InlineField>
          ) : null}
        </div>
      </Section>

      <Section title="位置与尺寸" description={isLocked ? "已锁定" : undefined}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 6,
          }}
        >
          <InlineField
            label="X"
            labelWidth={16}
            hint={isLocked ? "锁定时不可修改" : undefined}
          >
            <NumberInput
              value={object.x}
              disabled={isLocked}
              onChange={(value) => onUpdateObject(object.id, { x: value })}
            />
          </InlineField>

          <InlineField
            label="Y"
            labelWidth={16}
            hint={isLocked ? "锁定时不可修改" : undefined}
          >
            <NumberInput
              value={object.y}
              disabled={isLocked}
              onChange={(value) => onUpdateObject(object.id, { y: value })}
            />
          </InlineField>

          <InlineField label="层级" labelWidth={28}>
            <ReadonlyValue value={object.zIndex ?? "-"} />
          </InlineField>
        </div>

        <div style={{ height: 6 }} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 6,
          }}
        >
          <InlineField label="宽" labelWidth={16}>
            <ReadonlyValue value={object.width ?? "-"} />
          </InlineField>

          <InlineField label="高" labelWidth={16}>
            <ReadonlyValue value={object.height ?? "-"} />
          </InlineField>

          <InlineField label="旋转" labelWidth={28}>
            <ReadonlyValue value={object.rotation ?? "-"} />
          </InlineField>
        </div>
      </Section>
    </>
  );
}
