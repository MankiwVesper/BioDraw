import type { SceneObject } from "../../domain/objects/objectTypes";
import { ArrowInspector } from "./inspectors/ArrowInspector";
import { CommonInspector } from "./inspectors/CommonInspector";
import { MarkerInspector } from "./inspectors/MarkerInspector";
import { MembraneInspector } from "./inspectors/MembraneInspector";
import { ParticleInspector } from "./inspectors/ParticleInspector";
import { ProteinInspector } from "./inspectors/ProteinInspector";
import { RegionInspector } from "./inspectors/RegionInspector";
import { TextInspector } from "./inspectors/TextInspector";
import { EmptyInspector } from "./inspectors/shared";

type RenderInspectorProps = {
  selectedObject: SceneObject | null;
  onUpdateObject: (objectId: string, patch: Partial<SceneObject>) => void;
};

function SpecificInspector(props: {
  object: SceneObject;
  onUpdateObject: (objectId: string, patch: Partial<SceneObject>) => void;
}) {
  const { object, onUpdateObject } = props;

  switch (object.type) {
    case "membrane":
      return (
        <MembraneInspector object={object} onUpdateObject={onUpdateObject} />
      );
    case "region":
      return (
        <RegionInspector object={object} onUpdateObject={onUpdateObject} />
      );
    case "particle":
      return (
        <ParticleInspector object={object} onUpdateObject={onUpdateObject} />
      );
    case "protein":
      return (
        <ProteinInspector object={object} onUpdateObject={onUpdateObject} />
      );
    case "marker":
      return (
        <MarkerInspector object={object} onUpdateObject={onUpdateObject} />
      );
    case "text":
      return <TextInspector object={object} onUpdateObject={onUpdateObject} />;
    case "arrow":
      return <ArrowInspector object={object} onUpdateObject={onUpdateObject} />;
    default:
      return null;
  }
}

export default function RenderInspector({
  selectedObject,
  onUpdateObject,
}: RenderInspectorProps) {
  if (!selectedObject) {
    return <EmptyInspector />;
  }

  const isLocked = Boolean(selectedObject.locked);

  return (
    <div
      style={{
        display: "grid",
        gap: 0,
      }}
    >
      <CommonInspector
        object={selectedObject}
        onUpdateObject={onUpdateObject}
      />

      <div
        style={{
          opacity: isLocked ? 0.55 : 1,
          pointerEvents: isLocked ? "none" : "auto",
          transition: "opacity 120ms ease",
        }}
      >
        <SpecificInspector
          object={selectedObject}
          onUpdateObject={onUpdateObject}
        />
      </div>
    </div>
  );
}
