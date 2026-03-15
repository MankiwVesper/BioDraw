import { useMemo, useState } from "react";

import type { SceneObject } from "../../domain/objects/objectTypes";

interface ObjectListPanelProps {
  objects: SceneObject[];
  selectedObjectId: string | null;
  onSelectObject: (id: string | null) => void;
  onToggleObjectVisible: (objectId: string, visible: boolean) => void;
  onToggleObjectLocked: (objectId: string, locked: boolean) => void;
}

type ObjectTypeFilter = SceneObject["type"] | "all";

function getTypeIndex(objects: SceneObject[], object: SceneObject) {
  const sameTypeObjects = objects.filter((item) => item.type === object.type);
  const index = sameTypeObjects.findIndex((item) => item.id === object.id);
  return index >= 0 ? index + 1 : 1;
}

function getProteinTitle(
  objects: SceneObject[],
  object: Extract<SceneObject, { type: "protein" }>,
) {
  if (object.label?.trim()) {
    return object.label.trim();
  }

  switch (object.proteinType) {
    case "channel":
      return `通道蛋白 ${getTypeIndex(objects, object)}`;
    case "carrier":
      return `载体蛋白 ${getTypeIndex(objects, object)}`;
  }
}

function getRegionTitle(
  objects: SceneObject[],
  object: Extract<SceneObject, { type: "region" }>,
) {
  if (object.label?.trim()) {
    return object.label.trim();
  }

  switch (object.regionRole) {
    case "inside":
      return "内部区域";
    case "outside":
      return "外部区域";
    case "custom":
      return `自定义区域 ${getTypeIndex(objects, object)}`;
  }
}

function getMembraneTitle(
  objects: SceneObject[],
  object: Extract<SceneObject, { type: "membrane" }>,
) {
  if (object.label?.trim()) {
    return object.label.trim();
  }

  switch (object.styleVariant) {
    case "basic":
      return `基础膜 ${getTypeIndex(objects, object)}`;
    case "detailed":
      return `细节膜 ${getTypeIndex(objects, object)}`;
    default:
      return `膜 ${getTypeIndex(objects, object)}`;
  }
}

function getMarkerTitle(
  objects: SceneObject[],
  object: Extract<SceneObject, { type: "marker" }>,
) {
  if (object.text?.trim()) {
    return object.text.trim();
  }

  switch (object.markerType) {
    case "custom":
      return `自定义标记 ${getTypeIndex(objects, object)}`;
    case "atp":
      return `ATP 标记 ${getTypeIndex(objects, object)}`;
    case "gradient":
      return `梯度标记 ${getTypeIndex(objects, object)}`;
    case "energy":
      return `能量标记 ${getTypeIndex(objects, object)}`;
  }
}

function getArrowTitle(
  objects: SceneObject[],
  object: Extract<SceneObject, { type: "arrow" }>,
) {
  return (
    object.label?.trim() ||
    object.name?.trim() ||
    `箭头 ${getTypeIndex(objects, object)}`
  );
}

function getParticleTitle(
  objects: SceneObject[],
  object: Extract<SceneObject, { type: "particle" }>,
) {
  return (
    object.particleName?.trim() ||
    object.label?.trim() ||
    object.name?.trim() ||
    `粒子 ${getTypeIndex(objects, object)}`
  );
}

function getTextTitle(
  objects: SceneObject[],
  object: Extract<SceneObject, { type: "text" }>,
) {
  return object.text?.trim() || `文本 ${getTypeIndex(objects, object)}`;
}

function getObjectTitle(objects: SceneObject[], object: SceneObject) {
  switch (object.type) {
    case "text":
      return getTextTitle(objects, object);
    case "particle":
      return getParticleTitle(objects, object);
    case "protein":
      return getProteinTitle(objects, object);
    case "region":
      return getRegionTitle(objects, object);
    case "marker":
      return getMarkerTitle(objects, object);
    case "membrane":
      return getMembraneTitle(objects, object);
    case "arrow":
      return getArrowTitle(objects, object);
  }
}

function getRegionRoleLabel(role: "inside" | "outside" | "custom") {
  switch (role) {
    case "inside":
      return "内部";
    case "outside":
      return "外部";
    case "custom":
      return "自定义";
  }
}

function getMarkerTypeLabel(type: "custom" | "atp" | "gradient" | "energy") {
  switch (type) {
    case "custom":
      return "自定义";
    case "atp":
      return "ATP";
    case "gradient":
      return "梯度";
    case "energy":
      return "能量";
  }
}

function getMembraneVariantLabel(variant: "basic" | "detailed" | undefined) {
  switch (variant) {
    case "basic":
      return "基础";
    case "detailed":
      return "细节";
    default:
      return "默认";
  }
}

function getObjectSubtitle(objects: SceneObject[], object: SceneObject) {
  const index = getTypeIndex(objects, object);

  switch (object.type) {
    case "text":
      return `文本 · ${index}`;
    case "protein":
      return `蛋白 · ${object.proteinType} · ${index}`;
    case "particle":
      return `粒子 · ${object.shape ?? "circle"} · ${index}`;
    case "region":
      return `区域 · ${getRegionRoleLabel(object.regionRole)}`;
    case "marker":
      return `标记 · ${getMarkerTypeLabel(object.markerType)} · ${index}`;
    case "membrane":
      return `膜 · ${getMembraneVariantLabel(object.styleVariant)} · ${index}`;
    case "arrow":
      return `箭头 · ${index}`;
  }
}

function getObjectTypeFilterLabel(type: ObjectTypeFilter) {
  switch (type) {
    case "all":
      return "全部类型";
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
  }
}

function getSearchText(objects: SceneObject[], object: SceneObject) {
  const title = getObjectTitle(objects, object);
  const subtitle = getObjectSubtitle(objects, object);

  const parts = [
    title,
    subtitle,
    object.name,
    "label" in object ? object.label : "",
    "text" in object ? object.text : "",
    "particleName" in object ? object.particleName : "",
    "proteinType" in object ? object.proteinType : "",
    "regionRole" in object ? object.regionRole : "",
    "markerType" in object ? object.markerType : "",
  ];

  return parts
    .filter(
      (value): value is string =>
        typeof value === "string" && value.trim().length > 0,
    )
    .join(" ")
    .toLowerCase();
}

function ToolButton(props: {
  label: string;
  title: string;
  active: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      title={props.title}
      style={{
        minWidth: 30,
        height: 24,
        padding: "0 6px",
        fontSize: 11,
        border: "1px solid #d1d5db",
        borderRadius: 6,
        background: "#ffffff",
        color: props.active ? "#111827" : "#9ca3af",
        cursor: "pointer",
      }}
    >
      {props.label}
    </button>
  );
}

export function ObjectListPanel({
  objects,
  selectedObjectId,
  onSelectObject,
  onToggleObjectVisible,
  onToggleObjectLocked,
}: ObjectListPanelProps) {
  const [keyword, setKeyword] = useState("");
  const [typeFilter, setTypeFilter] = useState<ObjectTypeFilter>("all");

  const filteredObjects = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return objects.filter((object) => {
      if (typeFilter !== "all" && object.type !== typeFilter) {
        return false;
      }

      if (!normalizedKeyword) {
        return true;
      }

      return getSearchText(objects, object).includes(normalizedKeyword);
    });
  }, [keyword, objects, typeFilter]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      <div
        style={{
          padding: "12px 12px 10px",
          borderBottom: "1px solid #e5e7eb",
          flexShrink: 0,
          background: "#fafafa",
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#111827",
            marginBottom: 4,
          }}
        >
          对象列表
        </div>
        <div
          style={{
            fontSize: 12,
            color: "#6b7280",
            marginBottom: 10,
          }}
        >
          共 {filteredObjects.length} / {objects.length} 个对象
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 104px",
            gap: 8,
            alignItems: "center",
          }}
        >
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="搜索对象..."
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "7px 9px",
              fontSize: 12,
              border: "1px solid #d1d5db",
              borderRadius: 8,
              background: "#fff",
              outline: "none",
            }}
          />

          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(event.target.value as ObjectTypeFilter)
            }
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "7px 9px",
              fontSize: 12,
              border: "1px solid #d1d5db",
              borderRadius: 8,
              background: "#fff",
              outline: "none",
            }}
          >
            {(
              [
                "all",
                "membrane",
                "region",
                "particle",
                "protein",
                "marker",
                "text",
                "arrow",
              ] as const
            ).map((type) => (
              <option key={type} value={type}>
                {getObjectTypeFilterLabel(type)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          padding: 10,
          background: "#ffffff",
        }}
      >
        {filteredObjects.length === 0 ? (
          <div
            style={{
              padding: 12,
              fontSize: 12,
              color: "#6b7280",
              lineHeight: 1.6,
            }}
          >
            没有匹配的对象。
          </div>
        ) : (
          filteredObjects.map((object) => {
            const selected = object.id === selectedObjectId;
            const title = getObjectTitle(objects, object);
            const subtitle = getObjectSubtitle(objects, object);

            return (
              <button
                key={object.id}
                type="button"
                onClick={() => onSelectObject(object.id)}
                title={object.id}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "8px 10px",
                  marginBottom: 8,
                  border: selected ? "1px solid #60a5fa" : "1px solid #e5e7eb",
                  borderRadius: 10,
                  background: selected ? "#eff6ff" : "#ffffff",
                  cursor: "pointer",
                  opacity: object.visible ? 1 : 0.6,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#111827",
                        marginBottom: 3,
                        lineHeight: 1.4,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {title}
                    </div>

                    <div
                      style={{
                        fontSize: 11,
                        color: "#6b7280",
                        lineHeight: 1.4,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {subtitle}
                      {!object.visible ? " · 已隐藏" : ""}
                      {object.locked ? " · 已锁定" : ""}
                    </div>
                  </div>

                  <div
                    style={{
                      width: 70,
                      flexShrink: 0,
                      display: "flex",
                      gap: 4,
                      justifyContent: "flex-end",
                    }}
                  >
                    <ToolButton
                      label={object.visible ? "显" : "隐"}
                      title={object.visible ? "隐藏对象" : "显示对象"}
                      active={object.visible}
                      onClick={(event) => {
                        event.stopPropagation();
                        onToggleObjectVisible(object.id, !object.visible);
                      }}
                    />
                    <ToolButton
                      label={object.locked ? "锁" : "开"}
                      title={object.locked ? "解锁对象" : "锁定对象"}
                      active={Boolean(object.locked)}
                      onClick={(event) => {
                        event.stopPropagation();
                        onToggleObjectLocked(object.id, !object.locked);
                      }}
                    />
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
