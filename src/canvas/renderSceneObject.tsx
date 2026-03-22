import type { PointerEvent as ReactPointerEvent } from "react";
import type { SceneObject } from "../domain/objects/objectTypes";
import { ArrowRenderer } from "./renderers/ArrowRenderer";
import { MarkerRenderer } from "./renderers/MarkerRenderer";
import { MembraneRenderer } from "./renderers/MembraneRenderer";
import { ParticleRenderer } from "./renderers/ParticleRenderer";
import { ProteinRenderer } from "./renderers/ProteinRenderer";
import { RegionRenderer } from "./renderers/RegionRenderer";
import { TextRenderer } from "./renderers/TextRenderer";

export type ArrowDragMode = "move" | "arrow-start" | "arrow-end";

export interface SceneObjectRendererProps {
  object: SceneObject;
  selected: boolean;
  onSelect: (id: string | null) => void;
  onDragStart?: (
    event: ReactPointerEvent<SVGElement>,
    objectId: string,
    dragMode?: ArrowDragMode,
  ) => void;
}

export function SceneObjectRenderer({
  object,
  selected,
  onSelect,
  onDragStart,
}: SceneObjectRendererProps) {
  switch (object.type) {
    case "text":
      return (
        <TextRenderer
          object={object}
          selected={selected}
          onSelect={onSelect}
          onDragStart={onDragStart}
        />
      );

    case "region":
      return (
        <RegionRenderer
          object={object}
          selected={selected}
          onSelect={onSelect}
          onDragStart={onDragStart}
        />
      );

    case "particle":
      return (
        <ParticleRenderer
          object={object}
          selected={selected}
          onSelect={onSelect}
          onDragStart={onDragStart}
        />
      );

    case "protein":
      return (
        <ProteinRenderer
          object={object}
          selected={selected}
          onSelect={onSelect}
          onDragStart={onDragStart}
        />
      );

    case "membrane":
      return (
        <MembraneRenderer
          object={object}
          selected={selected}
          onSelect={onSelect}
          onDragStart={onDragStart}
        />
      );

    case "marker":
      return (
        <MarkerRenderer
          object={object}
          selected={selected}
          onSelect={onSelect}
          onDragStart={onDragStart}
        />
      );

    case "arrow":
      return (
        <ArrowRenderer
          object={object}
          selected={selected}
          onSelect={onSelect}
          onDragStart={onDragStart}
        />
      );

    default:
      return null;
  }
}
