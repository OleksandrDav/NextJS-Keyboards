import { prisma } from "@/prisma/prisma-client";
import { ProfilePage } from "@/shared/components/shared/profile-page/profile-page";
import { getUserSession } from "@/shared/lib/get-user-session";
import { redirect } from "next/navigation";
import { serializePrismaData } from "@/shared/lib/serialize";

export default async function Profile() {
    const session = await getUserSession();
    if (!session) {
        return redirect("/not-auth");
    }

    const user = await prisma.user.findFirst({
        where: {
            id: Number(session.id),
        },
        include: {
            orders: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });

    if (!user) {
        return redirect("/not-auth");
    }

    const serializedUser = serializePrismaData(user);

    return <ProfilePage user={serializedUser} />;
}