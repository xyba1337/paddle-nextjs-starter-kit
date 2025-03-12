import { CheckoutPriceAmount } from '@/components/checkout/checkout-price-amount';
import { CheckoutEventsData } from '@paddle/paddle-js/types/checkout/events';
import { formatMoney } from '@/utils/paddle/parse-money';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  checkoutData: CheckoutEventsData | null;
}

export function CheckoutPriceContainer({ checkoutData }: Props) {
  const recurringTotal = checkoutData?.recurring_totals?.total;
  const billingCycle = checkoutData?.items[0]?.billing_cycle?.interval;

  const billingCycleText = billingCycle === 'month' ? 'monthly' : billingCycle === 'year' ? 'yearly' : billingCycle;

  return (
    <>
      <div className={'text-base leading-[20px] font-semibold'}>Order summary</div>
      <CheckoutPriceAmount checkoutData={checkoutData} />
      {recurringTotal !== undefined ? (
        <div className={'pt-4 text-base leading-[20px] font-medium text-muted-foreground'}>
          then {formatMoney(recurringTotal, checkoutData?.currency_code)} {billingCycleText}
        </div>
      ) : (
        <Skeleton className="mt-4 h-[20px] w-full bg-border" />
      )}
    </>
  );
}
