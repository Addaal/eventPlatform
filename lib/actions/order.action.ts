"use server"

import { CheckoutOrderParams } from "@/types"
import { handleError } from "../utils"
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation'


export const checkoutOrder = async (order: CheckoutOrderParams) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const price = order.isFree ? 0 : Number(order.price) * 100;
    let success = false;
    try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: order.eventTitle,
                        },
                        unit_amount: price,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                eventId: order.eventId,
                buyerId: order.buyerId,
            },
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
        });
        
         (session.url!);

    } catch (error) {
        handleError(error)
    }
  
    
}
   