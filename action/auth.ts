"use server";
import { signIn, signOut } from "@/lib/auth";
import connectDB from "@/lib/database";
import { User } from "@/models/User";

import { compare, hash } from "bcryptjs";

const sendOtp = async ({ phoneNumber }: { phoneNumber: string }) => {
  let isPassworded = false;
  if (!/^09([0-9]{2})-?[0-9]{3}-?[0-9]{4}$/.test(phoneNumber)) {
    return {
      sucsses: false,
      isPassworded,
      message: "فرمت شماره sssssموبایل اشتباه است",
    };
  }
  try {
    await connectDB();
    const user = await User.findOne({ phoneNumber });
    if (user && user.password) {
      isPassworded = true;
    }

    console.log("otp sended!");
    return {
      sucsses: true,
      isPassworded,
    };
  } catch (error) {
    console.log(error);
    return {
      sucsses: false,
      message: "در هنگام ورود مشکلی پیش آمده است.",
    };
  }
};

const login = async ({
  phoneNumber,
  otp,
  password,
  mode,
}: {
  phoneNumber: string;
  otp: string;
  password: string;
  mode: boolean;
}) => {
  try {
    await connectDB();
    let user = await User.findOne({ phoneNumber });
    if (mode) {
      if (user && !user.password)
        return {
          success: false,
          message: "شما برای حساب خود کلمه عبور تنظیم نکرده اید",
        };
      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        return {
          success: false,
          message: "کلمه عبور شما اشتباه است",
        };
      }
    } else {
      if (otp !== "12345") {
        return {
          success: false,
          message: "کد تایید وارد شده اشتباه است",
        };
      }
    }

    let isNewUser = false;
    if (!user) {
      const hashedPassword = await hash("1234", 5);

      user = await User.create({ phoneNumber, password: hashedPassword });
      if (user) isNewUser = true;
    }
    console.log("first");
    await signIn("credentials", { phoneNumber, redirect: false });

    return {
      isNewUser,
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      sucsses: false,
      message: "در هنگام ورود مشکلی پیش آمده است.",
    };
  }
};
const logOut = async () => {
  await signOut({ redirectTo: "/" });
  return true;
};
export { sendOtp, login, logOut };
