import type { ProjectDocument } from '../../domain/project/projectTypes'
import { CanvasPanel } from '../canvas/CanvasPanel'
import { RightInspector } from '../inspector/RightInspector'
import { LeftSidebar } from '../sidebar/LeftSidebar'
import { BottomStepBar } from '../stepbar/BottomStepBar'
import { TopToolbar } from '../toolbar/TopToolbar'

interface EditorLayoutProps {
  project: ProjectDocument
  selectedObjectId: string | null
  onSelectObject: (id: string | null) => void
}

export function EditorLayout({
  project,
  selectedObjectId,
  onSelectObject,
}: EditorLayoutProps) {
  return (
    <div className="editor-shell">
      <header className="editor-header">
        <TopToolbar />
      </header>

      <main className="editor-main">
        <aside className="editor-left">
          <LeftSidebar />
        </aside>

        <section className="editor-center">
          <CanvasPanel
            project={project}
            selectedObjectId={selectedObjectId}
            onSelectObject={onSelectObject}
          />
        </section>

        <aside className="editor-right">
          <RightInspector
            project={project}
            selectedObjectId={selectedObjectId}
          />
        </aside>
      </main>

      <footer className="editor-footer">
        <BottomStepBar steps={project.steps} />
      </footer>
    </div>
  )
}