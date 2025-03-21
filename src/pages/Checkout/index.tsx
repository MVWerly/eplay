import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputMask from 'react-input-mask'

import Card from '../../components/Card'
import Button from '../../components/Button'

import barCode from '../../assets/images/boleto.png'
import creditCard from '../../assets/images/cartao.png'

import { RootReducer } from '../../store'
import { usePurchaseMutation } from '../../services/api'
import { getTotalPrice, parseToBrl } from '../../utils'
import { clear } from '../../store/reducers/cart'

import * as S from './styles'

type Installment = {
  quantity: number
  amount: number
  formattedAmount: string
}

const Checkout = () => {
  const dispatch = useDispatch()
  const [payWithCard, setPayWithCard] = useState(false)
  const [purchase, { isSuccess, data, isLoading }] = usePurchaseMutation()
  const { items } = useSelector((state: RootReducer) => state.cart)
  const [installments, setInstallments] = useState<Installment[]>([])

  const totalPrice = getTotalPrice(items)

  const form = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      cpf: '',
      deliveryEmail: '',
      confirmDeliveryEmail: '',
      cardOwner: '',
      cpfCardOwner: '',
      cardDisplayName: '',
      cardNumber: '',
      expireMonth: '',
      expireYear: '',
      cardCode: '',
      installments: 1
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(5, 'O campo precisa ter pelo menos 5 caracteres')
        .required('O campo é obrigatório'),
      email: Yup.string()
        .email('E-mail inválido')
        .required('O campo é obrigatório'),
      cpf: Yup.string()
        .min(14, 'O campo precisa ter 14 caracteres')
        .max(14, 'O campo precisa ter 14 caracteres'),
      deliveryEmail: Yup.string()
        .email('E-mail inválido')
        .required('O campo é obrigatório'),
      confirmDeliveryEmail: Yup.string()
        .oneOf([Yup.ref('deliveryEmail')], 'Os e-mails são diferentes')
        .required('O campo é obrigatório'),
      // credit card fields
      cardOwner: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cpfCardOwner: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardDisplayName: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardNumber: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      expireMonth: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      expireYear: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardCode: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      installments: Yup.number().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      )
    }),
    onSubmit: (values) => {
      purchase({
        billing: {
          name: values.fullName,
          email: values.email,
          document: values.cpf
        },
        delivery: {
          email: values.confirmDeliveryEmail
        },
        payment: {
          card: {
            active: payWithCard,
            owner: {
              name: values.cardOwner,
              document: values.cpfCardOwner
            },
            name: values.cardDisplayName,
            number: values.cardNumber,
            expires: {
              month: Number(values.expireMonth),
              year: Number(values.expireYear)
            },
            code: Number(values.cardCode)
          },
          installments: values.installments
        },
        products: items.map((item) => ({
          id: item.id,
          price: item.prices.current as number
        }))
      })
    }
  })

  useEffect(() => {
    const calculateInstallments = () => {
      const isntallmentsArray: Installment[] = []

      for (let i = 1; i <= 6; i++) {
        isntallmentsArray.push({
          quantity: i,
          amount: totalPrice / i,
          formattedAmount: parseToBrl(totalPrice / i)
        })
      }

      return isntallmentsArray
    }

    if (totalPrice > 0) {
      setInstallments(calculateInstallments())
    }
  }, [totalPrice])

  useEffect(() => {
    if (isSuccess) {
      dispatch(clear())
    }
  }, [isSuccess, dispatch])

  const checkInputHasError = (fieldName: string) => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors
    const hasError = isTouched && isInvalid

    return hasError
  }

  if (items.length === 0 && !isSuccess) {
    return <Navigate to="/" />
  }

  return (
    <div className="container">
      {isSuccess && data ? (
        <>
          <Card title="Muito obrigado">
            <>
              <p>
                É com sastifação que informamos que recebemos seu pedido com
                sucesso! <br />
                Abaixo estão os detalhes de sua compra: <br />
                Número do pedido: {data.orderId} <br />
                Forma de pagamento:{' '}
                {payWithCard ? 'Cartão de crédito' : 'Boleto bancário'}.
              </p>
              <p className="margin-top">
                Caso tenha optado pelo pagamento via boleto bancário, lembre-se
                de que a confirmação pode levar até 3 dias úteis. Após a
                aprovação do pagamento, enviaremos um e-mail contendo o código
                de ativação do jogo.
              </p>
              <p className="margin-top">
                Se você optou pelo pagamento com cartão de crédito, a liberação
                do código de ativação ocorrerá após a aprovação da transação
                pela operadora do cartão. Você receberá o código no e-mail
                cadastrado em nossa loja.
              </p>
              <p className="margin-top">
                Pedimos que verifique sua caixa de entrada e a pasta de spam
                para garantir que receba nossa comunicação. Caso tenha alguma
                dúvida ou necessite de mais informações, por favor, entre em
                contato conosco através dos nossos canais de atendimento ao
                cliente.
              </p>
              <p className="margin-top">
                Agradecemos por escolher a EPLAY e esperamos que desfrute seu
                jogo.
              </p>
            </>
          </Card>
        </>
      ) : (
        <>
          <form onSubmit={form.handleSubmit}>
            <Card title="Dados de cobrança">
              <>
                <S.Row>
                  <S.InputGroup>
                    <label htmlFor="fullName">Nome completo</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={form.values.fullName}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={checkInputHasError('fullName') ? 'error' : ''}
                    />
                  </S.InputGroup>
                  <S.InputGroup>
                    <label htmlFor="email">E-mail</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.values.email}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={checkInputHasError('email') ? 'error' : ''}
                    />
                  </S.InputGroup>
                  <S.InputGroup>
                    <label htmlFor="cpf">CPF</label>
                    <InputMask
                      mask="999.999.999-99"
                      type="text"
                      id="cpf"
                      name="cpf"
                      value={form.values.cpf}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={checkInputHasError('cpf') ? 'error' : ''}
                    />
                  </S.InputGroup>
                </S.Row>
                <h3 className="margin-top">
                  Dados de entrega - conteúdo digital
                </h3>
                <S.Row>
                  <S.InputGroup>
                    <label htmlFor="deliveryEmail">E-mail</label>
                    <input
                      type="email"
                      id="deliveryEmail"
                      name="deliveryEmail"
                      value={form.values.deliveryEmail}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={
                        checkInputHasError('deliveryEmail') ? 'error' : ''
                      }
                    />
                  </S.InputGroup>
                  <S.InputGroup>
                    <label htmlFor="confirmDeliveryEmail">
                      Confirme o e-mail
                    </label>
                    <input
                      type="email"
                      id="confirmDeliveryEmail"
                      name="confirmDeliveryEmail"
                      value={form.values.confirmDeliveryEmail}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={
                        checkInputHasError('confirmDeliveryEmail')
                          ? 'error'
                          : ''
                      }
                    />
                  </S.InputGroup>
                </S.Row>
              </>
            </Card>
            <Card title="Pagamento">
              <>
                <S.TabButton
                  $isActive={!payWithCard}
                  type="button"
                  onClick={() => setPayWithCard(false)}
                >
                  <div>
                    <img src={barCode} alt="Boleto" />
                    Boleto bancário
                  </div>
                </S.TabButton>
                <S.TabButton
                  $isActive={payWithCard}
                  type="button"
                  onClick={() => setPayWithCard(true)}
                >
                  <div>
                    <img src={creditCard} alt="Cartão de crédito" />
                    Cartão de crédito
                  </div>
                </S.TabButton>
                <div className="margin-top">
                  {payWithCard ? (
                    <>
                      <S.Row>
                        <S.InputGroup>
                          <label htmlFor="cardOwner">
                            Nome do titular do cartão
                          </label>
                          <input
                            type="text"
                            id="cardOwner"
                            name="cardOwner"
                            value={form.values.cardOwner}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            className={
                              checkInputHasError('cardOwner') ? 'error' : ''
                            }
                          />
                        </S.InputGroup>
                        <S.InputGroup>
                          <label htmlFor="cpfCardOwner">
                            CPF do titular do cartão
                          </label>
                          <InputMask
                            mask="999.999.999-99"
                            type="text"
                            id="cpfCardOwner"
                            name="cpfCardOwner"
                            value={form.values.cpfCardOwner}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            className={
                              checkInputHasError('cpfCardOwner') ? 'error' : ''
                            }
                          />
                        </S.InputGroup>
                      </S.Row>
                      <S.Row $marginTop="24px">
                        <S.InputGroup>
                          <label htmlFor="cardDisplayName">
                            Nome no cartão
                          </label>
                          <input
                            type="text"
                            id="cardDisplayName"
                            name="cardDisplayName"
                            value={form.values.cardDisplayName}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            className={
                              checkInputHasError('cardDisplayName')
                                ? 'error'
                                : ''
                            }
                          />
                        </S.InputGroup>
                        <S.InputGroup>
                          <label htmlFor="cardNumber">Número do cartão</label>
                          <InputMask
                            mask="9999 9999 9999 9999"
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={form.values.cardNumber}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            className={
                              checkInputHasError('cardNumber') ? 'error' : ''
                            }
                          />
                        </S.InputGroup>
                        <S.InputGroup $maxWidth="123px">
                          <label htmlFor="expireMonth">Mês de expiração</label>
                          <InputMask
                            mask="99"
                            type="text"
                            id="expireMonth"
                            name="expireMonth"
                            value={form.values.expireMonth}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            className={
                              checkInputHasError('expireMonth') ? 'error' : ''
                            }
                          />
                        </S.InputGroup>
                        <S.InputGroup $maxWidth="123px">
                          <label htmlFor="expireYear">Ano de expiração</label>
                          <InputMask
                            mask="99"
                            type="text"
                            id="expireYear"
                            name="expireYear"
                            value={form.values.expireYear}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            className={
                              checkInputHasError('expireYear') ? 'error' : ''
                            }
                          />
                        </S.InputGroup>
                        <S.InputGroup $maxWidth="48px">
                          <label htmlFor="cardCode">CVV</label>
                          <InputMask
                            mask="999"
                            type="text"
                            id="cardCode"
                            name="cardCode"
                            value={form.values.cardCode}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            className={
                              checkInputHasError('cardCode') ? 'error' : ''
                            }
                          />
                        </S.InputGroup>
                      </S.Row>
                      <S.Row $marginTop="24px">
                        <S.InputGroup $maxWidth="150px">
                          <label htmlFor="installments">Parcelamento</label>
                          <select
                            id="installments"
                            name="installments"
                            value={form.values.installments}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                          >
                            {installments.map((installment, index) => (
                              <>
                                <option
                                  value={installment.quantity}
                                  key={index}
                                >
                                  {installment.quantity}x de{' '}
                                  {installment.formattedAmount}
                                </option>
                              </>
                            ))}
                          </select>
                        </S.InputGroup>
                      </S.Row>
                    </>
                  ) : (
                    <>
                      <p>
                        Ao optar por essa forma de pagamento, é importante
                        lembrar que a confirmação pode levar até 3 dias úteis,
                        devido aos prazos estabelecidos pelas instituições
                        financeiras. Portanto, a liberação do código de ativação
                        do jogo adquirido ocorrerá somente após a aprovação do
                        pagamento do boleto.
                      </p>
                    </>
                  )}
                </div>
              </>
            </Card>
            <Button
              type="submit"
              title="Clique aqui para finalizar a compra"
              onClick={form.handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Finalizando compra...' : 'Finalizar compra'}
            </Button>
          </form>
        </>
      )}
    </div>
  )
}

export default Checkout
