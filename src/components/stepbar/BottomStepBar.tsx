import type { StepDefinition } from '../../domain/animation/animationTypes'

interface BottomStepBarProps {
  steps: StepDefinition[]
}

export function BottomStepBar({ steps }: BottomStepBarProps) {
  return (
    <div className="bottom-stepbar">
      <div className="bottom-stepbar-title">步骤栏</div>
      <div className="step-list">
        {steps.map((step) => (
          <div key={step.id} className="step-item">
            <span className="step-order">{step.order}</span>
            <span className="step-name">{step.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}