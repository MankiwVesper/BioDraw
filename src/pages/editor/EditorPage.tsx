import { useCallback, useState } from "react";

import { EditorLayout } from "../../components/layout/EditorLayout";
import type { SceneObject } from "../../domain/objects/objectTypes";
import { mockProject } from "../../domain/project/mockProject";
import type { ProjectDocument } from "../../domain/project/projectTypes";

interface HistoryState {
  past: ProjectDocument[];
  present: ProjectDocument;
  future: ProjectDocument[];
}

function createDuplicatedObject(source: SceneObject): SceneObject {
  const nextId = `${source.id}-copy-${Date.now()}`;

  switch (source.type) {
    case "arrow":
      return {
        ...source,
        id: nextId,
        x: source.x + 24,
        y: source.y + 24,
        x2: source.x2 + 24,
        y2: source.y2 + 24,
        name: source.name ? `${source.name} 副本` : source.name,
      };

    case "membrane":
    case "region":
    case "particle":
    case "protein":
    case "marker":
    case "text":
      return {
        ...source,
        id: nextId,
        x: source.x + 24,
        y: source.y + 24,
        name: source.name ? `${source.name} 副本` : source.name,
      };
  }
}

function pushHistory(
  current: HistoryState,
  nextProject: ProjectDocument,
): HistoryState {
  if (nextProject === current.present) {
    return current;
  }

  return {
    past: [...current.past, current.present],
    present: nextProject,
    future: [],
  };
}

function canUpdateLockedObject(patch: Partial<SceneObject>) {
  const keys = Object.keys(patch);
  return keys.every((key) => key === "locked" || key === "visible");
}

export function EditorPage() {
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: mockProject,
    future: [],
  });

  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);

  const project = history.present;

  const handleUpdateObject = useCallback(
    (objectId: string, patch: Partial<SceneObject>) => {
      setHistory((prev) => {
        const currentObject =
          prev.present.objects.find((object) => object.id === objectId) ?? null;

        if (!currentObject) {
          return prev;
        }

        if (currentObject.locked && !canUpdateLockedObject(patch)) {
          return prev;
        }

        const nextProject: ProjectDocument = {
          ...prev.present,
          objects: prev.present.objects.map((object) =>
            object.id === objectId
              ? ({ ...object, ...patch } as SceneObject)
              : object,
          ),
        };

        return pushHistory(prev, nextProject);
      });
    },
    [],
  );

  const handleDeleteObject = useCallback((objectId: string) => {
    setHistory((prev) => {
      const currentObject =
        prev.present.objects.find((object) => object.id === objectId) ?? null;

      if (!currentObject || currentObject.locked) {
        return prev;
      }

      const nextProject: ProjectDocument = {
        ...prev.present,
        objects: prev.present.objects.filter(
          (object) => object.id !== objectId,
        ),
      };

      return pushHistory(prev, nextProject);
    });

    setSelectedObjectId((prev) => (prev === objectId ? null : prev));
  }, []);

  const handleDuplicateObject = useCallback((objectId: string) => {
    let createdObjectId: string | null = null;

    setHistory((prev) => {
      const sourceObject =
        prev.present.objects.find((object) => object.id === objectId) ?? null;

      if (!sourceObject || sourceObject.locked) {
        return prev;
      }

      const duplicatedObject = createDuplicatedObject(sourceObject);
      createdObjectId = duplicatedObject.id;

      const nextProject: ProjectDocument = {
        ...prev.present,
        objects: [...prev.present.objects, duplicatedObject],
      };

      return pushHistory(prev, nextProject);
    });

    if (createdObjectId) {
      setSelectedObjectId(createdObjectId);
    }
  }, []);

  const handleDeleteSelected = useCallback(() => {
    if (!selectedObjectId) {
      return;
    }

    handleDeleteObject(selectedObjectId);
  }, [handleDeleteObject, selectedObjectId]);

  const handleDuplicateSelected = useCallback(() => {
    if (!selectedObjectId) {
      return;
    }

    handleDuplicateObject(selectedObjectId);
  }, [handleDuplicateObject, selectedObjectId]);

  const handleUndo = useCallback(() => {
    setHistory((prev) => {
      if (prev.past.length === 0) {
        return prev;
      }

      const previousProject = prev.past[prev.past.length - 1];
      const nextPast = prev.past.slice(0, -1);

      return {
        past: nextPast,
        present: previousProject,
        future: [prev.present, ...prev.future],
      };
    });
  }, []);

  const handleRedo = useCallback(() => {
    setHistory((prev) => {
      if (prev.future.length === 0) {
        return prev;
      }

      const nextProject = prev.future[0];
      const nextFuture = prev.future.slice(1);

      return {
        past: [...prev.past, prev.present],
        present: nextProject,
        future: nextFuture,
      };
    });
  }, []);

  return (
    <EditorLayout
      project={project}
      selectedObjectId={selectedObjectId}
      onSelectObject={setSelectedObjectId}
      onUpdateObject={handleUpdateObject}
      onDeleteObject={handleDeleteObject}
      onDuplicateObject={handleDuplicateObject}
      onDeleteSelected={handleDeleteSelected}
      onDuplicateSelected={handleDuplicateSelected}
      onUndo={handleUndo}
      onRedo={handleRedo}
      canUndo={history.past.length > 0}
      canRedo={history.future.length > 0}
    />
  );
}
