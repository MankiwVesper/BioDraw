import { ActionButton } from "../../features/inspector/inspectors/shared";

interface TopToolbarProps {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export function TopToolbar({
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}: TopToolbarProps) {
  return (
    <div
      style={{
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        boxSizing: "border-box",
        background: "#ffffff",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          minWidth: 0,
        }}
      >
        <div
          style={{
            fontSize: 15,
            fontWeight: 800,
            color: "#111827",
            letterSpacing: 0.2,
          }}
        >
          BioDraw
        </div>

        <div
          style={{
            fontSize: 12,
            color: "#6b7280",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          生物动态示意图编辑器
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <ActionButton
          label="撤销"
          onClick={onUndo}
          disabled={!canUndo}
          title="撤销（Ctrl/Cmd + Z）"
        />
        <ActionButton
          label="重做"
          onClick={onRedo}
          disabled={!canRedo}
          title="重做（Ctrl+Y / Ctrl/Cmd+Shift+Z）"
        />
      </div>
    </div>
  );
}
