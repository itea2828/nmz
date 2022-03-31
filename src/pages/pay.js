import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

export default function Pay() {


    // const dispatch = useDispatch()

    useEffect(() => {
        const script = document.createElement('script');
      
        script.src = "https://widget.cloudpayments.ru/bundles/cloudpayments.js";
        // script.async = true;
      
        document.head.appendChild(script);
      
        return () => {
          document.head.removeChild(script);
        }
    }, []);


    const pay = function () {
        var widget = new cp?.CloudPayments();
        widget.pay('auth', // или 'charge'
            { //options
                publicId: 'pk_3b7a700947364f89e392b8977fdd9', //id из личного кабинета
                description: 'Оплата в N-Market', //назначение
                amount: 100, //сумма
                currency: 'KZT', //валюта
                accountId: '', //идентификатор плательщика (необязательно)
                invoiceId: '1234567', //номер заказа  (необязательно)
                email: '', //email плательщика (необязательно)
                skin: "mini", //дизайн виджета (необязательно)
                data: {
                    myProp: 'myProp value'
                }
            },
            {
                onSuccess: function (options) { // success
                    //действие при успешной оплате
                },
                onFail: function (reason, options) { // fail
                    //действие при неуспешной оплате
                },
                onComplete: function (paymentResult, options) { //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
                    //например вызов вашей аналитики Facebook Pixel
                }
            }
        )
    };

    
    return (
        <div>
            <button  onClick={() => pay()}>Подтверлить & Оплатить</button>
        </div>
    )
}
