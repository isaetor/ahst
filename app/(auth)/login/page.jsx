"use client";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";

export default function Component() {
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("handleSubmit");
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-xs flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center justify-center pb-6">
          <svg fill="none" height="60" viewBox="0 0 32 32" width="60">
            <path
              clipRule="evenodd"
              d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
              fill="currentColor"
              fillRule="evenodd"
            ></path>
          </svg>
          <p className="text-xl font-medium mb-1">ورود یا ثبت نام</p>
          <p className="text-small text-default-500">
            برای ادامه وارد حساب کاربری خود شوید
          </p>
        </div>
        <Form
          className="flex flex-col gap-3"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <Input 
            dir="ltr"
            endContent={
              <div
                className="pointer-events-none flex items-center mr-2 border-r-2 pr-2"
                dir="ltr"
              >
                <span className="text-default-400">+۹۸</span>
              </div>
            }
            size="lg"
            label="شماره موبایل"
            labelPlacement="outside"
            type="text"
            description="شماره موبایل خود را بدون عدد 0 وارد کنید ( 912 000 0000 )"

          />
          <Button className="w-full" color="primary" type="submit">
            دریافت کد
          </Button>
        </Form>
      </div>
    </div>
  );
}
