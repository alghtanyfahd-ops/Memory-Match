exports.handler = async (event) => {
if (event.httpMethod !== "POST") {
return {
statusCode: 405,
body: JSON.stringify({
error: "POST only"
})
};
}

try {
const { level, proof } = JSON.parse(event.body || "{}");

```
if (!proof) {
  throw new Error("بيانات الفوز مفقودة");
}

return {
  statusCode: 200,
  body: JSON.stringify({
    ok: true,
    level,
    message: "تم إيقاف مكافآت Stellar والمحفظة."
  })
};
```

} catch (e) {
return {
statusCode: 400,
body: JSON.stringify({
ok: false,
error: e.message
})
};
}
};
