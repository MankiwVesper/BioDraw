import type {
  ParticleObject,
  SceneObject,
} from "../../../domain/objects/objectTypes";
import {
  CheckboxInput,
  ColorInput,
  FieldGrid,
  FormField,
  NumberInput,
  Section,
  SelectInput,
  TextInput,
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
        <FormField label="标签">
          <TextInput
            value={object.label ?? ""}
            onChange={(value) => onUpdateObject(object.id, { label: value })}
          />
        </FormField>
      </FieldGrid>

      <div style={{ height: 8 }} />

      <FieldGrid columns={1}>
        <FormField label="粒子名称">
          <TextInput
            value={object.particleName}
            onChange={(value) =>
              onUpdateObject(object.id, { particleName: value })
            }
          />
        </FormField>
      </FieldGrid>

      <div style={{ height: 8 }} />

      <FieldGrid columns={2}>
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
      </FieldGrid>

      <div style={{ height: 8 }} />

      <FieldGrid columns={2}>
        <FormField label="大小">
          <NumberInput
            value={object.size}
            onChange={(value) => onUpdateObject(object.id, { size: value })}
          />
        </FormField>

        <FormField label="数量">
          <NumberInput
            value={object.count}
            onChange={(value) => onUpdateObject(object.id, { count: value })}
          />
        </FormField>
      </FieldGrid>

      <div style={{ height: 8 }} />

      <FieldGrid columns={2}>
        <FormField label="可移动">
          <CheckboxInput
            checked={object.movable}
            onChange={(checked) =>
              onUpdateObject(object.id, { movable: checked })
            }
          />
        </FormField>

        <div />
      </FieldGrid>

      <div style={{ height: 8 }} />

      <FieldGrid columns={2}>
        <FormField label="源区域">
          <TextInput
            value={object.sourceRegionId ?? ""}
            onChange={(value) =>
              onUpdateObject(object.id, { sourceRegionId: value || undefined })
            }
          />
        </FormField>

        <FormField label="目标区域">
          <TextInput
            value={object.targetRegionId ?? ""}
            onChange={(value) =>
              onUpdateObject(object.id, { targetRegionId: value || undefined })
            }
          />
        </FormField>
      </FieldGrid>
    </Section>
  );
}
