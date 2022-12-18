export function isTokenExpired(token) {
    const payload = getPayload(token);

    const clockTimestamp = Math.floor(Date.now() / 1000);

    return{
        expired:clockTimestamp > payload.exp,
        data:{
            id: payload?.id,
            name: payload?.name,
            email: payload?.email

        }

    }

    return clockTimestamp > payload.exp;
}

export function getPayload(token) {
    return JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString("utf8")
    );
}