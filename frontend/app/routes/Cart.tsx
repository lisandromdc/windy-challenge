import { useNavigate } from 'react-router-dom';
// i18n
import { defineI18n } from '~/i18n/i18n';
// components
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
// lib
import { formatNumber } from '~/lib/utils';
import { api } from '~/lib/api';
// context
import { useCart } from '~/context/CartContext';
// constants
import { ROUTES } from "~/constants/constants";

export default function PedidoActual() {
  const i18n = defineI18n('cart');
  const navigate = useNavigate();
  const { menuItemsAndQuantities, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();

  const confirmarOrder = async () => {
    const payload = {
      menuItemIdsAndQuantities: menuItemsAndQuantities.map((cartItem) => ({
        menuItemId: cartItem.menuItem.id,
        quantity: cartItem.quantity,
      })),
    };
    const res = await api.post('orders', payload);
    clearCart();
    navigate(ROUTES.MY_LAST_ORDER);
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[var(--primary)]">
        {i18n('currentOrder')}
      </h1>
      {!menuItemsAndQuantities.length ? 
        <Card className="p-8">
          <CardTitle className="text-lg sm:text-xl">
            {i18n('cartIsEmptyTitle')}
          </CardTitle>
          <CardContent className="p-4">
            {i18n('cartIsEmptyDescription')}
          </CardContent>
        </Card>
      :
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">
              {i18n('orderSummaryTitle')}
            </CardTitle>
          </CardHeader>
            <CardContent>
              {menuItemsAndQuantities.map(({ menuItem, quantity }) => (
                <div key={menuItem.id} className="flex justify-between items-center mb-2 text-sm sm:text-base">
                  <div className="flex items-center gap-4">
                    <img
                      src={menuItem.image || "/placeholder.svg"}
                      alt={menuItem.name}
                      width={70}
                      height={70}
                      className="rounded-md mb-2"
                    />
                    <div className="flex flex-col items-start">
                      <span>{menuItem.name}</span>
                      <Button variant="link" size="sm" onClick={() => removeFromCart(menuItem.id)}>
                        {i18n('delete')}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{i18n('quantity')}</span>
                    <Input
                      type="number"
                      value={quantity}
                      min="1"
                      onChange={(e) => {
                        const newQuantity = Number(e.target.value);
                        if (newQuantity > 0) {
                          updateQuantity(menuItem.id, newQuantity);
                        }
                      }}
                      style={{ width: "70px", textAlign: "center" }}
                    />
                    <span style={{ width: "160px", textAlign: "right" }}>
                      {i18n('subtotal')} ${formatNumber(menuItem.price * quantity)}
                    </span>
                  </div>
                </div>
              ))}
              <div className="border-t pt-2 sm:pt-4 mt-2 sm:mt-4">
                <div className="flex justify-between items-center font-bold text-base sm:text-lg">
                  <span>{i18n('total')}:</span>
                  <span>${formatNumber(cartTotal)}</span>
                </div>
              </div>
            </CardContent>
          <CardFooter>
            <Button onClick={confirmarOrder} className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-sm sm:text-base">
              {i18n('confirmOrder')}
            </Button>
          </CardFooter>
        </Card>
      }
    </div>
  )
}

