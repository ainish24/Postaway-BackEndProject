import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const tranporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.Nodemailer_Email,
        pass:process.env.Nodemailer_Password
    }
})
export const mailerFunction=(recveiverEmail,data)=>{
    const mailOptions={
        from:process.env.Nodemailer_Email,
        to:recveiverEmail,
        subject:"OTP verification for updating password",
        text:`The OTP to verify the ownership of your Postaway account is ${data}. It is valid for 5 mins.`
    }
    tranporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log("Error sending email:" ,error)
        }else{
            console.log("Email sent successfully:", info.response)
        }
    })
}