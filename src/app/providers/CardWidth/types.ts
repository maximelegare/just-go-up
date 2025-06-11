export type CardWidth = number | null
export type ContainerWidth = number | null

export interface CardWidthContext {
  setCardWidth: (size: CardWidth | null) => void
  cardWidth?: CardWidth
  containerWidth: ContainerWidth
  setContainerWidth: (size: ContainerWidth | null) => void
}
