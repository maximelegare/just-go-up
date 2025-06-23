import { CMSLinkType } from '@app/components/Link'

import { cn } from '@app/utilities/cn'
import { BaseButton } from '../Base'

export const UnderlineButton: React.FC<CMSLinkType> = (props) => {
  const { isCurrentlySelected, appearance } = props
  return (
    <>
      <BaseButton {...props} />
      {(appearance === 'underline' || appearance === 'link') && (
        <LineUnderButton
          baseWidth={appearance === 'link' ? 'w-0' : 'w-1/3'}
          isActive={isCurrentlySelected}
        />
      )}
    </>
  )
}

const LineUnderButton = ({
  baseWidth,
  isActive,
  className,
}: {
  baseWidth: string
  isActive?: boolean
  className?: string
}) => (
  <span
    className={cn(
      `absolute  bottom-[-3px] left-0 h-[1px] bg-foreground transition-all duration-300 ${baseWidth}`,
      isActive ? 'w-full' : 'group-hover:w-full',
      className,
    )}
  ></span>
)
