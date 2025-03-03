"use server";
import connectDB from "@/lib/database";
import { User } from "@/models/User";

const sendOtp = async ({ phoneNumber }: { phoneNumber: string }) => {
  if (/^09([0-9]{2})-?[0-9]{3}-?[0-9]{4}$/.test(phoneNumber)) {
    return {
      sucsses: false,
      message: "فرمت شماره موبایل اشتباه است",
    };
  }
  try {
    await connectDB();
    const user = User.findOne({ phoneNumber });

    console.log(user);
  } catch (error) {
    console.log(error);
    return {
      sucsses: false,
      message: "در هنگام ورود مشکلی پیش آدمده است.",
    };
  }
};

export { sendOtp };
