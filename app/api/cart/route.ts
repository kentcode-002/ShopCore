// app/api/cart/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/auth";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const { userId, productId, productName, size, quantity, price, image } =
      await req.json();
    const cartCollection = db.collection("cart");

    // Check if the item already exists for the same user and size
    const existing = await cartCollection.findOne({ userId, productId });

    if (existing) {
      // Increment quantity if item already exists
      await cartCollection.updateOne(
        { _id: existing._id },
        { $inc: { quantity } }
      );
    } else {
      // Insert new cart item
      await cartCollection.insertOne({
        userId,
        productId,
        productName,
        size,
        quantity,
        price,
        image
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  const cartCollection = db.collection("cart");
  const count = await cartCollection.countDocuments({ userId });
  return NextResponse.json({ count });
}

export async function PATCH(req: NextRequest) {
  try {
    const { productId, quantity } = await req.json();
    const cartCollection = db.collection("cart");

    if (quantity <= 0) {
      await cartCollection.deleteOne({ _id: new ObjectId(productId) });
      return NextResponse.json({ success: true, deleted: true });
    }

    await cartCollection.updateOne(
      { _id: new ObjectId(productId) },
      { $set: { quantity } }
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await db.collection("cart").deleteOne({
      _id: new ObjectId(req.nextUrl.searchParams.get("productId")!)
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
