import { cn } from '@/lib/utils'

export default function ProductPrice({
  value,
  className,
}: {
  value: string
  // value: number
  className?: string
}) {
  //Ensure two decimal places
  const stringValue = value
  //get int and float
  const intvalue = stringValue.split('.')[0]
  const floatValue = stringValue.split('.')[1]

  return (
    <p className={cn('text-2xl', className)}>
      <span className='text-xs align-super'>$</span>
      {intvalue}
      <span className='text-xs align-super'>.{floatValue}</span>
    </p>
  )
}
