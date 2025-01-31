import { Webhook } from "svix";
import User from "../models/User.js";

//ApI Controller Function to Mange Clerk User with database
export const clerkWebhooks =async (req,res)=>{
    try {
        //CREATE A SVIX INSTANCE WITH Clerk WITH CLERK WEBHOOK SECRET
        const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        
        //Verifying headers
        await whook.verify(JSON.stringify(req.body),{
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"],
        })

        //Getting Data from request body
        const {data,type}=req.body;

        //switch Cases for different Events
        switch (type) {
            case 'user-created':{
                const userData={
                    _id:data.id,
                    email:data.email_address[0].email_address,
                    name:data.first_name+" "+data.last_name,
                    image:data.image_url,
                    resume:"",
                }

                await User.create(userData);
                res.JSON({});
                break;
            }
            case 'user-updated':{
                const userData={
                   
                    email:data.email_address[0].email_address,
                    name:data.first_name+" "+data.last_name,
                    image:data.image_url
                   
                }

                await User.findByIdAndUpdate(data._id,userData);
                res.json({});
                break;
                
            }
            case 'user-deleted':{
               await findByIdAndDelete(data._id);
               res.json({});
               break;
               
                
            }  
            default:
                break;
        }

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:"web hook error"})
    }
}