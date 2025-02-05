"use client";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { InputOtp } from "@heroui/input-otp";
import { Link } from "@heroui/link";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Component() {
  const [step, setStep] = useState(1);
  const [passMethodLogin, setPassMethodLogin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isInvalidPhoneNumber, setIsInvalidPhoneNumber] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const changePhoneNumer = (e) => {
    console.log("Dsadsa");
    console.log(e);
  };

  const sendOtpCode = (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));

    setPhoneNumber(data.phoneNumber);
    setStep(2);
  };

  const verifyOtpCode = (event) => {
    event.preventDefault();

    console.log("verify Otp Code");
  };

  return (
    <>
      {step === 2 && (
        <div className="max-w-72 mx-auto">
          <Button
            isIconOnly
            className="text-default-700"
            type="button"
            variant="light"
            onPress={() => setStep(1)}
          >
            <ArrowRight className="text-default-700 pointer-events-none flex-shrink-0" />
          </Button>
        </div>
      )}
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-full max-w-72 flex-col gap-4 rounded-large">
          <div className="flex flex-col items-center justify-center pb-6">
            <svg fill="none" height="60" viewBox="0 0 32 32" width="60">
              <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
            <p className="text-xl font-medium mb-1">
              {step === 1 ? "ورود یا ثبت نام" : "کد تایید را وارد کنید"}
            </p>
            <p className="text-small text-default-500">
              {step === 1
                ? "برای ادامه وارد حساب کاربری خود شوید"
                : `کد 4 رقمی به شماره ${phoneNumber} ارسال شد.`}
            </p>
          </div>
          {step === 1 && (
            <Form
              className="flex flex-col gap-3"
              validationBehavior="native"
              onSubmit={sendOtpCode}
            >
              <Input
                autoComplete="off"
                description="ورود شما  به معنی پذیرش قوانین و مقررات این سرویس است."
                dir="ltr"
                label="شماره موبایل"
                labelPlacement="outside"
                maxLength="11"
                name="phoneNumber"
                size="lg"
                type="tel"
                value={phoneNumber}
                onKeyDown={(e) => {
                  setPhoneNumber(e.key);
                  if (
                    e.key === 'Undefined' &&
                    e.key !== "Backspace" &&
                    e.key !== "Delete" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight" &&
                    e.key !== "Enter" &&
                    e.key !== "Tab" &&
                    !/^[0-9]*$/.test(e.key)
                  ) {
                    e.preventDefault();
                  }
                }}
                onValueChange={setPhoneNumber}
              />
              <Button className="w-full" color="primary" type="submit">
                دریافت کد
              </Button>
            </Form>
          )}

          {step === 2 && (
            <Form
              className="flex flex-col gap-3"
              validationBehavior="native"
              onSubmit={verifyOtpCode}
            >
              {!passMethodLogin && (
                <InputOtp
                  className="mx-auto"
                  dir="ltr"
                  length={4}
                  size="lg"
                  value={otp}
                  onValueChange={setOtp}
                />
              )}

              {passMethodLogin && (
                <Input
                  className="max-w-xs"
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <Eye className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  label="کلمه عبور"
                  labelPlacement="outside"
                  placeholder="لطفا کلمه عبور را وارد کنید"
                  type={isVisible ? "text" : "password"}
                />
              )}

              <Button className="w-full" color="primary" type="submit">
                تایید و ادامه
              </Button>
              <Link
                className="mx-auto mt-4 cursor-pointer"
                size="sm"
                onPress={() => setPassMethodLogin(!passMethodLogin)}
              >
                {passMethodLogin
                  ? "ورود با رمز یک بار مصرف"
                  : "ورود با کلمه عبور"}
              </Link>
            </Form>
          )}
        </div>
      </div>
    </>
  );
}
