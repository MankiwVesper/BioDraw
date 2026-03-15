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
        marginBottom: 8,
        padding: 9,
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        background: "#ffffff",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 6,
          marginBottom: 6,
        }}
      >
        <div
          style={{
            fontSize: 11,
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
              fontSize: 10,
              color: "#9ca3af",
              lineHeight: 1.25,
              textAlign: "left",
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

export function FieldGrid(props: { children: ReactNode; columns?: 1 | 2 | 3 }) {
  const columns = props.columns ?? 2;

  const gridTemplateColumns =
    columns === 1
      ? "1fr"
      : columns === 2
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(3, minmax(0, 1fr))";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns,
        gap: 6,
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
          fontSize: 10,
          color: "#6b7280",
          marginBottom: 3,
          lineHeight: 1.15,
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
            marginTop: 2,
            fontSize: 10,
            color: "#9ca3af",
            lineHeight: 1.15,
          }}
        >
          {hint}
        </div>
      ) : null}
    </div>
  );
}

export function InlineField(props: {
  label: string;
  children: ReactNode;
  labelWidth?: number;
  hint?: string;
}) {
  const { label, children, labelWidth = 40, hint } = props;

  return (
    <div style={{ minWidth: 0 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `${labelWidth}px minmax(0, 1fr)`,
          alignItems: "center",
          gap: 3,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: 24,
            fontSize: 12,
            color: "#4b5563",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>

        <div style={{ minWidth: 0 }}>{children}</div>
      </div>

      {hint ? (
        <div
          style={{
            marginTop: 2,
            marginLeft: labelWidth + 3,
            fontSize: 10,
            color: "#9ca3af",
            lineHeight: 1.15,
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
        minHeight: 28,
        display: "flex",
        alignItems: "center",
        padding: "0 2px",
        fontSize: 12,
        color: "#111827",
        lineHeight: 1.25,
      }}
    >
      {props.value}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 24,
  boxSizing: "border-box",
  padding: "8px 8px",
  fontSize: 12,
  border: "1px solid #d1d5db",
  borderRadius: 7,
  background: "#ffffff",
  outline: "none",
};

function getDisabledInputStyle(disabled?: boolean): React.CSSProperties {
  if (!disabled) {
    return {};
  }

  return {
    background: "#f9fafb",
    color: "#9ca3af",
    cursor: "not-allowed",
  };
}

export function TextInput(props: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <input
      value={props.value}
      disabled={props.disabled}
      onChange={(event) => props.onChange(event.target.value)}
      style={{
        ...inputStyle,
        ...getDisabledInputStyle(props.disabled),
      }}
    />
  );
}

export function NumberInput(props: {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}) {
  return (
    <input
      type="number"
      value={Number.isFinite(props.value) ? props.value : 0}
      disabled={props.disabled}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        props.onChange(Number(event.target.value))
      }
      style={{
        ...inputStyle,
        ...getDisabledInputStyle(props.disabled),
      }}
    />
  );
}

export function CheckboxInput(props: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}) {
  return (
    <label
      style={{
        minHeight: 28,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12,
        color: props.disabled ? "#9ca3af" : "#111827",
        cursor: props.disabled ? "not-allowed" : "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={props.checked}
        disabled={props.disabled}
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
  disabled?: boolean;
}) {
  return (
    <select
      value={props.value}
      disabled={props.disabled}
      onChange={(event) => props.onChange(event.target.value)}
      style={{
        ...inputStyle,
        ...getDisabledInputStyle(props.disabled),
      }}
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
  disabled?: boolean;
}) {
  const normalizedValue = /^#([0-9a-fA-F]{6})$/.test(props.value)
    ? props.value
    : "#000000";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "30px minmax(0, 1fr)",
        gap: 6,
        alignItems: "center",
      }}
    >
      <input
        type="color"
        value={normalizedValue}
        disabled={props.disabled}
        onChange={(event) => props.onChange(event.target.value)}
        title="选择颜色"
        style={{
          width: 30,
          height: 28,
          padding: 0,
          border: "1px solid #d1d5db",
          borderRadius: 7,
          background: props.disabled ? "#f9fafb" : "#ffffff",
          cursor: props.disabled ? "not-allowed" : "pointer",
        }}
      />
      <input
        value={props.value}
        disabled={props.disabled}
        onChange={(event) => props.onChange(event.target.value)}
        style={{
          ...inputStyle,
          ...getDisabledInputStyle(props.disabled),
        }}
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
        height: 28,
        padding: "0 8px",
        fontSize: 11,
        fontWeight: 600,
        border: "1px solid #d1d5db",
        borderRadius: 7,
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
        padding: 10,
        fontSize: 12,
        color: "#6b7280",
        lineHeight: 1.5,
        border: "1px dashed #d1d5db",
        borderRadius: 8,
        background: "#fcfcfc",
      }}
    >
      当前未选中对象。
      <br />
      请在画布中点击一个对象查看其属性。
    </div>
  );
}
