import type { SceneObject } from "../../../domain/objects/objectTypes";
import {
  CheckboxInput,
  InlineField,
  NumberInput,
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
            gap: 4,
          }}
        >
          <InlineField
            label="名称"
            labelWidth={32}
            hint={isLocked ? "对象已锁定，不能修改名称" : undefined}
          >
            <TextInput
              value={object.name ?? ""}
              disabled={isLocked}
              onChange={(value) => onUpdateObject(object.id, { name: value })}
            />
          </InlineField>

          {hasLabelField(object) ? (
            <InlineField
              label="标签"
              labelWidth={32}
              hint={isLocked ? "对象已锁定，不能修改标签" : undefined}
            >
              <TextInput
                value={object.label ?? ""}
                disabled={isLocked}
                onChange={(value) =>
                  onUpdateObject(object.id, { label: value })
                }
              />
            </InlineField>
          ) : null}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 4,
            }}
          >
            <InlineField label="可见" labelWidth={32}>
              <CheckboxInput
                checked={object.visible}
                onChange={(checked) =>
                  onUpdateObject(object.id, { visible: checked })
                }
              />
            </InlineField>

            <InlineField label="锁定" labelWidth={32}>
              <CheckboxInput
                checked={Boolean(object.locked)}
                onChange={(checked) =>
                  onUpdateObject(object.id, { locked: checked })
                }
              />
            </InlineField>
          </div>
        </div>
      </Section>

      <Section title="位置与尺寸" description={isLocked ? "已锁定" : undefined}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 4,
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

          <InlineField
            label="层级"
            labelWidth={32}
            hint={isLocked ? "锁定时不可修改" : undefined}
          >
            <NumberInput
              value={object.zIndex ?? 0}
              disabled={isLocked}
              onChange={(value) => onUpdateObject(object.id, { zIndex: value })}
            />
          </InlineField>
        </div>

        <div style={{ height: 4 }} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 4,
          }}
        >
          <InlineField
            label="宽"
            labelWidth={16}
            hint={isLocked ? "锁定时不可修改" : undefined}
          >
            <NumberInput
              value={object.width ?? 0}
              disabled={isLocked}
              onChange={(value) => onUpdateObject(object.id, { width: value })}
            />
          </InlineField>

          <InlineField
            label="高"
            labelWidth={16}
            hint={isLocked ? "锁定时不可修改" : undefined}
          >
            <NumberInput
              value={object.height ?? 0}
              disabled={isLocked}
              onChange={(value) => onUpdateObject(object.id, { height: value })}
            />
          </InlineField>

          <InlineField
            label="旋转"
            labelWidth={32}
            hint={isLocked ? "锁定时不可修改" : undefined}
          >
            <NumberInput
              value={object.rotation ?? 0}
              disabled={isLocked}
              onChange={(value) =>
                onUpdateObject(object.id, { rotation: value })
              }
            />
          </InlineField>
        </div>
      </Section>
    </>
  );
}
