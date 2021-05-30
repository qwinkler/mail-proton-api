import { ProtonmailClient } from "../index";
import { AddressResponse, KeySaltsResponse } from "./schemas";
import { expectToValidate } from "../schemas";

test("addresses route works", async () => {
    const client = new ProtonmailClient();
    await client.login(require("../../../credentials.json"));

    const addrResponse = await client.keys.address();

    const v = AddressResponse.decode(addrResponse);
    expectToValidate(v);
}, 120000);

test("keys/salts route works", async () => {
    const client = new ProtonmailClient();
    await client.login(require("../../../credentials.json"));

    const keysResponse = await client.keys.keySalts();

    const v = KeySaltsResponse.decode(keysResponse);
    expectToValidate(v);
}, 120000);
