"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
    const user = useCurrentUser();

    const onClick = () => {
        logout();
    };

    return (
        <div>
                <Button
                onClick={onClick}
                type="submit"
                className="font-extrabold uppercase"
                variant="yellow"
                size="sr"
                >
                    Sair
                </Button>
        </div>
     );
}

export default SettingsPage;