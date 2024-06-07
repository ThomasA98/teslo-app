'use client'
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import type { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from '@paypal/paypal-js'
import { paypalCheckPayment, setTransactionId } from "@/actions"

export interface PayPalButtonProps {
  orderId: string
  amount: number
}

export const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, orderId }) => {

  const [{ isPending }] = usePayPalScriptReducer()

  const roundedAmount = (Math.round(amount * 100)) / 100

  if (isPending) return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="h-11 bg-gray-300 rounded"></div>
      <div className="h-11 bg-gray-300 rounded"></div>
    </div>
  )

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: `${ roundedAmount }`,
            currency_code: 'USD'
          }
        }
      ],
      intent: 'CAPTURE'
    })

    const { ok, message } = await setTransactionId({
      orderId,
      transactionId,
    })

    if (!ok) throw new Error(message)

    return transactionId
  }

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture()

    if (!details) return;

    await paypalCheckPayment(details.id!)
  }

  return (
    <div className="relative z-0" >
      <PayPalButtons
        createOrder={ createOrder }
        onApprove={ onApprove }
      />
    </div>
  )
}