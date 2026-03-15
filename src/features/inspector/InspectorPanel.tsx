import type { SceneObject } from "../../domain/objects/objectTypes";
import { ActionButton } from "./inspectors/shared";
import RenderInspector from "./renderInspector";

export type InspectorObjectLike = SceneObject | null;

type InspectorPanelProps = {
  selectedObject: InspectorObjectLike;
  onUpdateObject: (objectId: string, patch: Partial<SceneObject>) => void;
  onDeleteObject: (objectId: string) => void;
  onDuplicateObject: (objectId: string) => void;
};

function getObjectTypeLabel(object: SceneObject) {
  switch (object.type) {
    case "membrane":
      return "膜";
    case "region":
      return "区域";
    case "particle":
      return "粒子";
    case "protein":
      return "蛋白";
    case "marker":
      return "标记";
    case "text":
      return "文本";
    case "arrow":
      return "箭头";
    default:
      return "未知对象";
  }
}

function getObjectTitle(object: SceneObject) {
  if (
    "text" in object &&
    typeof object.text === "string" &&
    object.text.trim()
  ) {
    return object.text.trim();
  }

  if ("particleName" in object && object.particleName?.trim()) {
    return object.particleName.trim();
  }

  if (
    "label" in object &&
    typeof object.label === "string" &&
    object.label.trim()
  ) {
    return object.label.trim();
  }

  if (object.name?.trim()) {
    return object.name.trim();
  }

  return getObjectTypeLabel(object);
}

export function InspectorPanel({
  selectedObject,
  onUpdateObject,
  onDeleteObject,
  onDuplicateObject,
}: InspectorPanelProps) {
  return (
    <aside
      style={{
        height: "100%",
        minHeight: 0,
        boxSizing: "border-box",
        padding: 0,
        overflow: "hidden",
        borderLeft: "1px solid #e5e7eb",
        background: "#f3f4f6",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          padding: 12,
          borderBottom: "1px solid #e5e7eb",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#6b7280",
            marginBottom: 8,
            letterSpacing: 0.3,
          }}
        >
          属性面板
        </div>

        {selectedObject ? (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: 12,
                  color: "#6b7280",
                  marginBottom: 3,
                }}
              >
                {getObjectTypeLabel(selectedObject)}
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#111827",
                  lineHeight: 1.3,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={getObjectTitle(selectedObject)}
              >
                {getObjectTitle(selectedObject)}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 6,
                flexShrink: 0,
              }}
            >
              <ActionButton
                label="复制"
                onClick={() => onDuplicateObject(selectedObject.id)}
              />
              <ActionButton
                label="删除"
                onClick={() => onDeleteObject(selectedObject.id)}
              />
            </div>
          </div>
        ) : (
          <div
            style={{
              fontSize: 13,
              color: "#6b7280",
            }}
          >
            当前未选中对象
          </div>
        )}
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          padding: 12,
        }}
      >
        <RenderInspector
          selectedObject={selectedObject}
          onUpdateObject={onUpdateObject}
        />
      </div>
    </aside>
  );
}
