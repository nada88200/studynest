import HomePage from "@/components/HomePage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role == "tutor") {
      redirect("/tutorDashboard");
    }
      if (!session || session.user.role == "admin") {
          redirect("/adminDashboard");
      }
    return <HomePage />;
}