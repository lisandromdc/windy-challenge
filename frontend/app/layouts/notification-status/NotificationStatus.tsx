import { NavLink } from 'react-router';
// components
import { Button } from '~/components/ui/button';
// constants
import { ORDER_STATUS_IDS, ROUTES } from '~/constants/constants';
// hooks
import useOrderUpdates from '~/hooks/use-order-updates';
// i18n
import { defineI18n } from '~/i18n/i18n';

export default function RootLayout() {
const i18n = defineI18n('notificationStatus');
  const currentOrder = useOrderUpdates();

  return (
    <>
      {currentOrder &&
      <div className="bg-black fixed rounded-md right-4 bottom-4 py-6 px-8">
        <h2 className="font-bold text-xl pb-2">
          {i18n('title')}
        </h2>
        {currentOrder?.orderStatusId === ORDER_STATUS_IDS.PENDING && <span>
          {i18n('msgStatusPending')}
        </span>}
        {currentOrder?.orderStatusId === ORDER_STATUS_IDS.IN_PROGRESS && <span>
          {i18n('msgStatusInProgress')}
        </span>}
        {currentOrder?.orderStatusId === ORDER_STATUS_IDS.DELIVERED && <span>
          {i18n('msgStatusDelivered')}
        </span>}
        {location.pathname !== ROUTES.MY_LAST_ORDER && <div className="flex justify-end mt-4">
          <NavLink to={ROUTES.MY_LAST_ORDER}>
            <Button size="sm">
              {i18n('goToCart')}
            </Button>
          </NavLink>
        </div>}
      </div>}
    </>
  )
}
