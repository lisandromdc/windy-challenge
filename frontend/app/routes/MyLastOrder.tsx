// i18n
import { defineI18n } from '~/i18n/i18n'
// components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
// lib
import { formatDate } from '~/lib/utils';
// constants
import { ORDER_STATUS_IDS } from '~/constants/constants';
import useOrderUpdates from '~/hooks/use-order-updates';

const i18n = defineI18n('myLastOrder');
const i18nRoutes = defineI18n('routes');

export default function MyLastOrder() {
  const currentOrder = useOrderUpdates();

  return (
    <div>
      <h1 className="text-2xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[var(--primary)]">
        {i18nRoutes('myLastOrder')}
      </h1>
      {currentOrder && <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">
            {i18n('order')} #{currentOrder.id}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            {i18n('orderDate')}: {formatDate(currentOrder.createdAt)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl sm:text-2xl font-bold mb-4">
            {i18n('status')}: {currentOrder.status.name}
          </p>
          <div className="flex items-center">
            <div
              className={`w-1/3 h-1 sm:h-2 ${currentOrder.orderStatusId === ORDER_STATUS_IDS.PENDING ? "bg-[var(--primary)]" : "bg-gray-300"} rounded-l-full`}
            ></div>
            <div className={`w-1/3 h-1 sm:h-2 ${currentOrder.orderStatusId === ORDER_STATUS_IDS.IN_PROGRESS ? "bg-[var(--primary)]" : "bg-gray-300"}`}></div>
            <div
              className={`w-1/3 h-1 sm:h-2 ${currentOrder.orderStatusId === ORDER_STATUS_IDS.DELIVERED ? "bg-[var(--primary)]" : "bg-gray-300"} rounded-r-full`}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs sm:text-sm">
            <span>{i18n('statusPending')}</span>
            <span>{i18n('statusInProgress')}</span>
            <span>{i18n('statusDelivered')}</span>
          </div>
        </CardContent>
      </Card>}
    </div>
  )
}

