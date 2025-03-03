
import { logOut } from "@/action/auth";
import { Button } from "@heroui/button";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/modal";

const SignOutModal = ({children, isOpen, onOpenChange} : any) => {

    return (
        <>
            {children}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">از حساب کاربری خارج می‌شوید؟"</ModalHeader>
                            <ModalBody>
                                <p>
                                با خروج از حساب کاربری، به سبد خرید فعلی‌تان دسترسی نخواهید داشت. هروقت بخواهید می‌توانید مجددا وارد شوید و خریدتان را ادامه دهید
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button  variant="light" onPress={onClose}>
                                    انصراف
                                </Button>
                                <form
                                    action={async () => {
                                        await logOut()
                                    }}
                                >
                                    <Button color="danger" type="submit">
                                        خروج از حساب
                                    </Button>
                                </form>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default SignOutModal