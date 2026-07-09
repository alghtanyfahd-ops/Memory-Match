const PI_VALIDATION_KEY =
"ce0c45ed75eee0b02640c20964969d7394bc1c22bf7a06bdf625fb3afd137ef3ce7b85202c75379a8f8d11a700af7e6ca1f882e02d44c784297a46ff633b4988";

export default {
async fetch(request) {
const url = new URL(request.url);

```
// Pi Domain Validation
if (request.method === "GET" && url.pathname === "/validation-key.txt") {
  return new Response(PI_VALIDATION_KEY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}

if (request.method !== "POST") {
  return new Response(
    JSON.stringify({ ok: false, error: "POST only" }),
    {
      status: 405,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }
  );
}

try {
  const { level, proof } = await request.json();

  if (!proof) {
    throw new Error("بيانات الفوز مفقودة");
  }

  return new Response(
    JSON.stringify({
      ok: true,
      level,
      message: "تم تسجيل الفوز. مكافآت Stellar والمحفظة معطلتان."
    }),
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }
  );
} catch (error) {
  return new Response(
    JSON.stringify({
      ok: false,
      error: error.message || "حدث خطأ غير متوقع"
    }),
    {
      status: 400,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }
  );
}
```

}
};
