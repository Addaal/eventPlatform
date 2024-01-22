import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { Email, WebhookEvent } from '@clerk/nextjs/server'
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.action'
import { clerkClient } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
<<<<<<< Updated upstream:app/api/webhooks/clerk/route.ts
 
export async function POST(req: Request) {
 
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
 
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }
=======

// export async function POST(req: Request) {
 
//   // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
//   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
//   // const WEBHOOK_SECRET = "";

//   if (!WEBHOOK_SECRET) {
//     throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
//   }
>>>>>>> Stashed changes:app/api/webhook/clerk/route.ts
 
//   // Get the headers
//   const headerPayload = headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");
 
//   // If there are no headers, error out
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response('Error occured -- no svix headers', {
//       status: 400
//     })
//   }
 
//   // Get the body
//   const payload = await req.json()
//   const body = JSON.stringify(payload);
 
//   // Create a new Svix instance with your secret.
//   const wh = new Webhook(WEBHOOK_SECRET);
 
//   let evt: WebhookEvent
 
//   // Verify the payload with the headers
//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     }) as WebhookEvent
//   } catch (err) {
//     console.error('Error verifying webhook:', err);
//     return new Response('Error occured', {
//       status: 400
//     })
//   }
 
<<<<<<< Updated upstream:app/api/webhooks/clerk/route.ts
  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;
 
if(eventType ==='user.created'){
    const {id, email_addresses, image_url, first_name, last_name, username} = evt.data;
    
    const user = {
        clerkId:id,
        email: email_addresses[0].email_address,
        username: username!,  //! means that user can be null, put it so it stop complaining 
        firstName: first_name,
        lastName: last_name,
        photo: image_url,
    }
=======
//   // Get the ID and type
//   const { id } = evt.data;
//   const eventType = evt.type;

//   console.log(eventType);
 

//   if(eventType === 'user.created') {
//     console.log("webhook")
//     const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

//     const user = {
//       clerkId: id,
//       email: email_addresses[0].email_address,
//       username: username!,
//       firstName: first_name,
//       lastName: last_name,
//       photo: image_url,
//     }
>>>>>>> Stashed changes:app/api/webhook/clerk/route.ts

//     const newUser = await createUser(user);

<<<<<<< Updated upstream:app/api/webhooks/clerk/route.ts
    if(newUser) {
        await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: {
                userId: newUser._id
            }
        })
    }

    return NextResponse.json({message: 'OK', user:newUser});
}
 

if (eventType === 'user.updated') {
    const {id, image_url, first_name, last_name, username } = evt.data
=======
//     if(newUser) {
//       await clerkClient.users.updateUserMetadata(id, {
//         publicMetadata: {
//           userId: newUser._id
//         }
//       })
//     }

//     return NextResponse.json({ message: 'OK', user: newUser })
//   }

//   if (eventType === 'user.updated') {

//     console.log("webhook")
//     const {id, image_url, first_name, last_name, username } = evt.data
>>>>>>> Stashed changes:app/api/webhook/clerk/route.ts

//     const user = {
//       firstName: first_name,
//       lastName: last_name,
//       username: username!,
//       photo: image_url,
//     }

//     const updatedUser = await updateUser(id, user)

//     return NextResponse.json({ message: 'OK', user: updatedUser })
//   }

//   if (eventType === 'user.deleted') {
//     const { id } = evt.data

//     const deletedUser = await deleteUser(id!)

//     return NextResponse.json({ message: 'OK', user: deletedUser })
//   }
 
<<<<<<< Updated upstream:app/api/webhooks/clerk/route.ts
  return new Response('', { status: 200 })
}
 
=======
//   return new Response('', { status: 200 })
// }




export async function POST(request: Request) {
  const payload: WebhookEvent = await request.json();
  console.log(payload);
}

export async function GET() {
  return Response.json({ message: "Hello World!" });
}
>>>>>>> Stashed changes:app/api/webhook/clerk/route.ts
