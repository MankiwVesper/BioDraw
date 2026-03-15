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

function canUpdateLockedObject(patch: Partial<SceneObject>) {
  const keys = Object.keys(patch);
  return keys.every((key) => key === "locked" || key === "visible");
}

export function InspectorPanel({
  selectedObject,
  onUpdateObject,
  onDeleteObject,
  onDuplicateObject,
}: InspectorPanelProps) {
  const isLocked = Boolean(selectedObject?.locked);

  function handleUpdateObject(objectId: string, patch: Partial<SceneObject>) {
    if (selectedObject?.locked && !canUpdateLockedObject(patch)) {
      return;
    }

    onUpdateObject(objectId, patch);
  }

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
          padding: 10,
          borderBottom: "1px solid #e5e7eb",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#6b7280",
            marginBottom: 6,
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
              gap: 8,
            }}
          >
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 2,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "#6b7280",
                    minWidth: 0,
                  }}
                >
                  {getObjectTypeLabel(selectedObject)}
                </div>

                {isLocked ? (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      height: 18,
                      padding: "0 7px",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#92400e",
                      background: "#fef3c7",
                      border: "1px solid #fcd34d",
                      borderRadius: 999,
                      flexShrink: 0,
                    }}
                  >
                    已锁定
                  </span>
                ) : null}
              </div>

              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#111827",
                  lineHeight: 1.25,
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
                gap: 5,
                flexShrink: 0,
              }}
            >
              <ActionButton
                label="复制"
                disabled={isLocked}
                title={isLocked ? "对象已锁定，不能复制" : "复制对象"}
                onClick={() => onDuplicateObject(selectedObject.id)}
              />
              <ActionButton
                label="删除"
                disabled={isLocked}
                title={isLocked ? "对象已锁定，不能删除" : "删除对象"}
                onClick={() => onDeleteObject(selectedObject.id)}
              />
            </div>
          </div>
        ) : (
          <div
            style={{
              fontSize: 12,
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
          padding: 8,
        }}
      >
        {isLocked ? (
          <div
            style={{
              marginBottom: 8,
              padding: "8px 10px",
              fontSize: 11,
              lineHeight: 1.5,
              color: "#92400e",
              background: "#fffbeb",
              border: "1px solid #fde68a",
              borderRadius: 8,
            }}
          >
            该对象当前处于锁定状态。
            <br />
            可继续切换“可见”和“锁定”，其余属性不可编辑。
          </div>
        ) : null}

        <RenderInspector
          selectedObject={selectedObject}
          onUpdateObject={handleUpdateObject}
        />
      </div>
    </aside>
  );
}
