import { auth } from "@/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LoginButton } from "@/components/LoginButton";
import { LogoutButton } from "@/components/LogoutButton";
import PostForm from "@/components/PostForm";
import TipTapEditor from "@/components/TipTapEditor";

export default async function Home() {
  const session = await auth();

  async function savePost(formData) {
    "use server";
    const content = formData.get("content");
    // const content = tipTapContent;
    const title = formData.get("title");
    const userId = session?.user?.id;
    if (!userId) {
      throw new Error("You need to login");
    }

    await db.query(
      "INSERT INTO posts (title, body, user_id) VALUES ($1, $2, $3)",
      [title, content, userId]
    );

    revalidatePath("/");
    redirect("/");
  }

  if (!session) {
    return (
      <div className="max-w-screen-lg mx-auto p-4 mt-10">
        You need to login to create a post <LoginButton />
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4 bg-zinc-800 mt-10 rounded-xl">
      <h2 className="text-3xl mb-4 text-zinc-50">Add a new post</h2>
      <PostForm savePost={savePost}/>
    </div>
  );
}
