import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      return NextResponse.json({ message: "Revalidation not configured" }, { status: 501 });
    }

    const { isValidSignature, body } = await parseBody(req, secret);
    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    revalidatePath("/");
    revalidatePath("/projects/[slug]", "page");
    revalidateTag("sanity");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: body?._type,
    });
  } catch (err) {
    console.error("[revalidate]", err);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
