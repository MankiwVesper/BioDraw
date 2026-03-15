import type { ChangeEvent, ReactNode } from "react";

export function Section(props: {
  title: string;
  children: ReactNode;
  description?: string;
}) {
  const { title, children, description } = props;

  return (
    <section
      style={{
        marginBottom: 10,
        padding: 12,
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        background: "#ffffff",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#111827",
            letterSpacing: 0.2,
          }}
        >
          {title}
        </div>

        {description ? (
          <div
            style={{
              fontSize: 11,
              color: "#9ca3af",
              lineHeight: 1.3,
              textAlign: "right",
            }}
          >
            {description}
          </div>
        ) : null}
      </div>

      {children}
    </section>
  );
}

export function FieldGrid(props: { children: ReactNode; columns?: 1 | 2 }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          props.columns === 1 ? "1fr" : "repeat(2, minmax(0, 1fr))",
        gap: 8,
      }}
    >
      {props.children}
    </div>
  );
}

export function FormField(props: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  const { label, children, hint } = props;

  return (
    <div style={{ minWidth: 0 }}>
      <div
        style={{
          fontSize: 11,
          color: "#6b7280",
          marginBottom: 4,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={label}
      >
        {label}
      </div>

      {children}

      {hint ? (
        <div
          style={{
            marginTop: 3,
            fontSize: 10,
            color: "#9ca3af",
            lineHeight: 1.2,
          }}
        >
          {hint}
        </div>
      ) : null}
    </div>
  );
}

export function ReadonlyValue(props: { value: ReactNode }) {
  return (
    <div
      style={{
        minHeight: 34,
        display: "flex",
        alignItems: "center",
        padding: "0 2px",
        fontSize: 13,
        color: "#111827",
        lineHeight: 1.3,
      }}
    >
      {props.value}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 34,
  boxSizing: "border-box",
  padding: "6px 10px",
  fontSize: 13,
  border: "1px solid #d1d5db",
  borderRadius: 8,
  background: "#ffffff",
  outline: "none",
};

export function TextInput(props: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      value={props.value}
      onChange={(event) => props.onChange(event.target.value)}
      style={inputStyle}
    />
  );
}

export function NumberInput(props: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <input
      type="number"
      value={Number.isFinite(props.value) ? props.value : 0}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        props.onChange(Number(event.target.value))
      }
      style={inputStyle}
    />
  );
}

export function CheckboxInput(props: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}) {
  return (
    <label
      style={{
        minHeight: 34,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 13,
        color: "#111827",
      }}
    >
      <input
        type="checkbox"
        checked={props.checked}
        onChange={(event) => props.onChange(event.target.checked)}
      />
      <span>{props.label ?? (props.checked ? "是" : "否")}</span>
    </label>
  );
}

export function SelectInput(props: {
  value: string;
  options: Array<{ label: string; value: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <select
      value={props.value}
      onChange={(event) => props.onChange(event.target.value)}
      style={inputStyle}
    >
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function ColorInput(props: {
  value: string;
  onChange: (value: string) => void;
}) {
  const normalizedValue = /^#([0-9a-fA-F]{6})$/.test(props.value)
    ? props.value
    : "#000000";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "36px minmax(0, 1fr)",
        gap: 8,
        alignItems: "center",
      }}
    >
      <input
        type="color"
        value={normalizedValue}
        onChange={(event) => props.onChange(event.target.value)}
        title="选择颜色"
        style={{
          width: 36,
          height: 34,
          padding: 0,
          border: "1px solid #d1d5db",
          borderRadius: 8,
          background: "#ffffff",
          cursor: "pointer",
        }}
      />
      <input
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        style={inputStyle}
      />
    </div>
  );
}

export function ActionButton(props: {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
      title={props.title}
      style={{
        height: 32,
        padding: "0 10px",
        fontSize: 12,
        fontWeight: 600,
        border: "1px solid #d1d5db",
        borderRadius: 8,
        background: props.disabled ? "#f3f4f6" : "#ffffff",
        color: props.disabled ? "#9ca3af" : "#111827",
        cursor: props.disabled ? "not-allowed" : "pointer",
      }}
    >
      {props.label}
    </button>
  );
}

export function EmptyInspector() {
  return (
    <div
      style={{
        padding: 14,
        fontSize: 13,
        color: "#6b7280",
        lineHeight: 1.6,
        border: "1px dashed #d1d5db",
        borderRadius: 10,
        background: "#fcfcfc",
      }}
    >
      当前未选中对象。
      <br />
      请在画布中点击一个对象查看其属性。
    </div>
  );
}
