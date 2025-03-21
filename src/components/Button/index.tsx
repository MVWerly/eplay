import { ButtonContainer, ButtonLink } from './styles'

export type Props = {
  type: 'button' | 'link' | 'submit'
  title: string
  to?: string
  onClick?: () => void
  children: string
  $variant?: 'primary' | 'secondary'
  disabled?: boolean
}

const Button = ({
  to,
  type,
  title,
  children,
  onClick,
  $variant = 'primary',
  disabled
}: Props) => {
  if (type === 'button' || type === 'submit') {
    return (
      <ButtonContainer
        $variant={$variant}
        type={type}
        title={title}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </ButtonContainer>
    )
  }
  return (
    <ButtonLink to={to as string} title={title}>
      {children}
    </ButtonLink>
  )
}

export default Button
