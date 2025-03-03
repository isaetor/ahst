"use client";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { InputOtp } from "@heroui/input-otp";
import { Link } from "@heroui/link";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { sendOtp, login } from "@/action/auth";
import { redirect } from "next/navigation";
import confetti from 'canvas-confetti';

export default function Component() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isPassworded, setIsPassworded] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [timeKeyUp, setTimeKeyUp] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const sendOtpCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await sendOtp({ phoneNumber });
    console.log(res)
    if (res.sucsses) {
      setIsPassworded(res.isPassworded);
      setStep(2);
      setMinutes(2);
      setSeconds(59);
    } else {
      setInvalid(true);
      if (res.message) {
        setErrorMessage(res.message);
      }
    }
    setIsLoading(false);
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await login({ phoneNumber, otp, password, mode: (showPassword && isPassworded) });
    if (res.success) {
      if (res.isNewUser) {
        confetti();
      }
      setTimeout(() => {
        redirect("/")
      }, 1000);
    } else {
      setInvalid(true);
      if (res.message) {
        setErrorMessage(res.message);
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      {step === 2 && (
        <div className="max-w-sm sm:max-w-72 mx-auto">
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
              {step === 1
                ? "ورود یا ثبت نام"
                : showPassword && isPassworded
                  ? "کلمه عبور را وارد کنید"
                  : "کد تایید را وارد کنید"}
            </p>
            <p className="text-small text-default-500">
              {step === 1
                ? "برای ادامه وارد حساب کاربری خود شوید"
                : showPassword && isPassworded
                  ? "جهت ورود به حساب کلمه عبور خود را وارد کنید"
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
                onKeyDown={(e) => {
                  if (
                    !(
                      (e.key >= 0 && e.key <= 9) ||
                      e.key == "Delete" ||
                      e.key == "ArrowLeft" ||
                      e.key == "ArrowRight" ||
                      e.key == "Backspace" ||
                      e.key == "Enter" ||
                      e.key == "Tab"
                    )
                  ) {
                    e.preventDefault();
                  }
                }}
                onKeyUp={() => {
                  clearTimeout(timeKeyUp);
                  setInvalid(false);

                  if (/^09([0-9]{2})-?[0-9]{3}-?[0-9]{4}$/.test(phoneNumber)) {
                    setInvalid(false);
                  } else {
                    if (phoneNumber.length === 11) setInvalid(true);
                    else
                      setTimeKeyUp(
                        setTimeout(() => {
                          if (phoneNumber.length > 0) {
                            setInvalid(true);
                          }
                        }, 1000)
                      );
                  }
                }}
                errorMessage={errorMessage || "فرمت شماره موبایل اشتباه است"}
                isInvalid={invalid}
                value={phoneNumber}
                onValueChange={setPhoneNumber}
              />
              <Button
                isDisabled={invalid || phoneNumber.length < 11}
                isLoading={isLoading}
                className="w-full"
                color="primary"
                type="submit"
              >
                دریافت کد
              </Button>
            </Form>
          )}

          {step === 2 && (
            <Form
              className="flex flex-col gap-3"
              validationBehavior="native"
              onSubmit={submitLogin}
            >
              {!showPassword && (
                <>
                  <InputOtp
                    errorMessage={errorMessage || "کد تایید شما اشتباه است"}
                    className="mx-auto"
                    dir="ltr"
                    length={5}
                    size="lg"
                    onKeyDown={() => {
                      setInvalid(false);
                    }}
                    isInvalid={invalid}
                    value={otp}
                    onValueChange={setOtp}
                  />
                  <div className="flex items-center justify-between gap-2 w-full text-sm text-default-500">
                    {seconds > 0 || minutes > 0 ? (
                      <p>
                        زمان باقیمانده :{" "}
                        {minutes < 10 ? `0${minutes}` : minutes}:
                        {seconds < 10 ? `0${seconds}` : seconds}
                      </p>
                    ) : (
                      <p>کد دریافت نکردید؟</p>
                    )}

                    <Link
                      isDisabled={seconds > 0 || minutes > 0}
                      className="cursor-pointer"
                      size="sm"
                      color={
                        seconds > 0 || minutes > 0 ? "foreground" : "primary"
                      }
                      onPress={() => {
                        setMinutes(2);
                        setSeconds(59);
                      }}
                    >
                      ارسال مجدد
                    </Link>
                  </div>
                </>
              )}

              {(showPassword && isPassworded) && (
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
                  size="lg"
                  label="کلمه عبور"
                  labelPlacement="outside"
                  isInvalid={invalid}
                  value={password}
                  onValueChange={setPassword}
                  type={isVisible ? "text" : "password"}
                />
              )}

              <Button
                className="w-full"
                color="primary"
                type="submit"
                isLoading={isLoading}
              >
                تایید و ادامه
              </Button>
              {isPassworded && (
                <Link
                  className="mx-auto mt-4 cursor-pointer"
                  size="sm"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword
                    ? "ورود با رمز یک بار مصرف"
                    : "ورود با کلمه عبور"}
                </Link>
              )}
            </Form>
          )}
        </div>
      </div>
    </>
  );
}
