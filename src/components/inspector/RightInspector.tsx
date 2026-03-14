import type { ProjectDocument } from '../../domain/project/projectTypes'

interface RightInspectorProps {
  project: ProjectDocument
  selectedObjectId: string | null
}

export function RightInspector({
  project,
  selectedObjectId,
}: RightInspectorProps) {
  const selectedObject =
    project.objects.find((object) => object.id === selectedObjectId) ?? null

  return (
    <div className="right-inspector">
      <h3>属性面板</h3>

      <div className="inspector-section">
        <p>
          <strong>工程标题：</strong>
          {project.metadata.title}
        </p>
        <p>
          <strong>对象数量：</strong>
          {project.objects.length}
        </p>
        <p>
          <strong>步骤数量：</strong>
          {project.steps.length}
        </p>
      </div>

      <div className="inspector-section">
        {!selectedObject ? (
          <p>当前未选择对象</p>
        ) : (
          <>
            <p>
              <strong>ID：</strong>
              {selectedObject.id}
            </p>
            <p>
              <strong>类型：</strong>
              {selectedObject.type}
            </p>
            <p>
              <strong>名称：</strong>
              {selectedObject.name ?? '-'}
            </p>
            <p>
              <strong>X：</strong>
              {selectedObject.x}
            </p>
            <p>
              <strong>Y：</strong>
              {selectedObject.y}
            </p>
            <p>
              <strong>可见：</strong>
              {selectedObject.visible ? '是' : '否'}
            </p>

            {'label' in selectedObject && selectedObject.label !== undefined && (
              <p>
                <strong>标签：</strong>
                {selectedObject.label}
              </p>
            )}

            {'particleName' in selectedObject && (
              <p>
                <strong>粒子名称：</strong>
                {selectedObject.particleName}
              </p>
            )}

            {'proteinType' in selectedObject && (
              <p>
                <strong>蛋白类型：</strong>
                {selectedObject.proteinType}
              </p>
            )}

            {'text' in selectedObject && typeof selectedObject.text === 'string' && (
              <p>
                <strong>文本：</strong>
                {selectedObject.text}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}